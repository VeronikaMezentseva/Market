import { FC, useState } from "react";
import styles from "./like.module.css"
import { useDispatch } from "../../app/store";
import { selectIsLiked } from "../../slices/product-slice";
import { likeProduct, unLikeProduct } from "../../slices/products-slice";

const SVGLike: FC<{isLiked: boolean, id: string}> = ({isLiked, id}) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(isLiked);

  const makeLike = (evt: any) => {
    evt.stopPropagation();
    if (like) {
      setLike(false);
      dispatch(unLikeProduct(id));
    } else {
      setLike(true);
      dispatch(likeProduct(id));
    }
  }

  return(
  <svg
    onClick={(evt) => makeLike(evt)}
    width="25"
    height="25"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.like}
  >
    <path className={like ? styles["path-liked"] : styles["path-no-like"]}
      d="M4.03553 1C1.80677 1 0 2.80677 0 5.03553C0 6.10582 0.42517 7.13228 1.18198 7.88909L7.14645 13.8536C7.34171 14.0488 7.65829 14.0488 7.85355 13.8536L13.818 7.88909C14.5748 7.13228 15 6.10582 15 5.03553C15 2.80677 13.1932 1 10.9645 1C9.89418 1 8.86772 1.42517 8.11091 2.18198L7.5 2.79289L6.88909 2.18198C6.13228 1.42517 5.10582 1 4.03553 1Z"
      />
  </svg>
  );
}
export default SVGLike;

