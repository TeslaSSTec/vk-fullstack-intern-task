import CatCard from "../components/CatCard.tsx";
import styles from "./CatCardsLayout.module.css"
import {ILayoutCatImage} from "../store/types.ts";
import {createLikeDto} from "../store/dto.ts";

interface IProps {
    images: ILayoutCatImage[],
    createLikeCallback: (a: createLikeDto) => void,
    removeLikeCallback: (a: string) => void
}

const CatsPage = ({...props}: IProps) => {
    return (
        <div className={styles.cardsHolder}>
            {props.images.map(image => <CatCard image={image}
                                                createLikeCallback={props.createLikeCallback}
                                                removeLikeCallback={props.removeLikeCallback}
                                                key={image.id}/>)}
        </div>
    );
};

export default CatsPage;