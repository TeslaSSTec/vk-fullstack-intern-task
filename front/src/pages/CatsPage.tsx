import {useCreateLikeMutation, useDeleteLikeMutation, useGetCatsMutation, useGetLikesQuery} from "../store/api.ts";
import {useEffect, useRef, useState} from "react";
import CatCardsLayout from "../components/CatCardsLayout.tsx";
import {addCats, updateLikes, useAppDispatch, useAppSelector} from "../store/store.ts";

const CatsPage = () => {
    const [getCats, getCatsStatus] = useGetCatsMutation()
    const {isSuccess, data} = useGetLikesQuery()
    const [like] = useCreateLikeMutation()
    const [unlike] = useDeleteLikeMutation()

    const images = useAppSelector((state) => state.cats.cats);
    const dispatch = useAppDispatch();

    const [dynamicRoll, setDynamicRoll] = useState({isVisible:false,isProcessed:true});
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setDynamicRoll({...dynamicRoll,isVisible: true});
                }
                else
                {
                    setDynamicRoll({...dynamicRoll,isVisible: false});
                }
            },
            {
                root: null,
                threshold: 0.05,
            }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if(getCatsStatus.isSuccess && !dynamicRoll.isProcessed)
        {
            dispatch(addCats(getCatsStatus.data))
            setDynamicRoll({...dynamicRoll,isProcessed: true})
        }
    },[getCatsStatus.isSuccess])

    useEffect(() => {
        if(isSuccess)
        {
            dispatch(updateLikes(data.data))
        }
    },[isSuccess,data])

    if (dynamicRoll.isVisible && dynamicRoll.isProcessed)
    {
        setDynamicRoll({...dynamicRoll,isProcessed: false})
        getCats()
    }

    return (
        <>
        <CatCardsLayout images={images} createLikeCallback={like} removeLikeCallback={unlike}/>
            <div ref={targetRef}>
                {"... загружаем еще котиков ..."}
            </div>
        </>
    );
};

export default CatsPage;