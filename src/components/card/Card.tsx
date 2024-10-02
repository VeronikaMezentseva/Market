import { FC } from "react";
import styles from "./card.module.css";
import { TProduct } from "../../slices/products-slice";
import SVGLike from "../like/Like";
import { SVGBasket } from "../basket/Basket";
import { useNavigate } from "react-router-dom";

export const Card: FC<{
  product: TProduct;
  onDelete: (evt: any, product: TProduct) => void;
}> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const openCard = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    navigate(`${product.id}`);
  };
  return (
    <div onClick={openCard} className={styles.card}>
      <div className={styles["labels-container"]}>
        <span className={styles.label}>{product.category}</span>
        <span className={styles.like}>
          <SVGLike isLiked={product.isLiked} id={product.id}></SVGLike>
        </span>
        <span className={styles.basket}>
          <SVGBasket product={product} onDelete={onDelete}></SVGBasket>
        </span>
      </div>
      <div>
        <img className={styles.image} src={product.image} alt="" />
      </div>
      <div className={styles["product-info"]}>
        <h2>{product.name}</h2>
        <p className={styles.description}>{product.description}</p>
      </div>
    </div>
  );
};
