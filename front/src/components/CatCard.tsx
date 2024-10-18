import styles from "./CatCard.module.css"
import {ILayoutCatImage} from "../store/types.ts";
import {createLikeDto} from "../store/dto.ts";
import favorite from "./../assets/favorite.svg"
import favorite_border from "./../assets/favorite_border.svg"

interface IProps {
    image: ILayoutCatImage,
    createLikeCallback: (a: createLikeDto) => void,
    removeLikeCallback: (a: string) => void
}

const CatCard = ({...props}: IProps) => {

    const togleLike = () => {
        if (props.image.isLiked) {
            props.removeLikeCallback(props.image.id)
        } else {
            props.createLikeCallback({cat_id: props.image.id, url: props.image.url})
        }
    }

    return (
        <div className={styles.catCard} onClick={togleLike}>
            <img className={styles.catImage} src={props.image.url}/>
            <img
                className={[styles.heart, styles.borderedHeart].join(" ")}
                src={props.image.isLiked?favorite:favorite_border}
            />
            <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"
                 className={[styles.heart, styles.filledHeart].join(" ")}>
                <g clip-path="url(#clip0_1_2180)">
                    <path
                        d="M24 42.7L21.1 40.06C10.8 30.72 4 24.56 4 17C4 10.84 8.84 6 15 6C18.48 6 21.82 7.62 24 10.18C26.18 7.62 29.52 6 33 6C39.16 6 44 10.84 44 17C44 24.56 37.2 30.72 26.9 40.08L24 42.7Z"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_2180">
                        <rect width="48" height="48" fill="white"/>
                    </clipPath>
                </defs>
            </svg>

        </div>
    );
};

export default CatCard;