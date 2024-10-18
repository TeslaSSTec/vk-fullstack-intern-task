import {useCreateLikeMutation, useDeleteLikeMutation, useGetLikesQuery} from "../store/api.ts";
import CatCardsLayout from "../components/CatCardsLayout.tsx";

const CatsFavoritesPage = () => {
    const {isSuccess, data} = useGetLikesQuery()
    const [like] = useCreateLikeMutation()
    const [unlike] = useDeleteLikeMutation()


    return (
        <>
            {isSuccess &&
                <CatCardsLayout images={data.data.map(like => ({id: like.catId, url: like.url, isLiked: true}))}
                                createLikeCallback={like}
                                removeLikeCallback={unlike}/>
            }
        </>);
}

    export default CatsFavoritesPage;