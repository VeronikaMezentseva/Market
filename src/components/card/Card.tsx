import { FC, useEffect } from "react";
import styles from "./card.module.css";
import { useSelector } from "react-redux";
import {
  TProduct,
  getProduct,
  getProducts,
  selectProducts,
} from "../../slices/products-slice";
import { useDispatch } from "../../app/store";
import SVGLike from "../like/Like";
import { SVGBasket } from "../basket/Basket";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "../../app/store";

export const Card: FC<{
  product: TProduct;
  onDelete: (evt: any, product: TProduct) => void;
}> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  // useEffect(() => {
  //   console.log(test?.name);
  // }, [products]);

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
            <SVGBasket
              product={product}
              onDelete={onDelete}
            ></SVGBasket>
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
