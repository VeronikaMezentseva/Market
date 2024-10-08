import { FC } from "react";
import styles from "./product-page.module.css";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../src/slices/products-slice";
import { useNavigate, useParams } from "react-router-dom";

export const ProductPage: FC = () => {
  const { id } = useParams();
  const productData = useSelector(selectProducts).find(
    (product) => product.id === id
  );

  const navigate = useNavigate();
  const navigateToProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles["product-container"]}>
          <h2>{productData?.name}</h2>
          <p className={styles.label}>{productData?.category}</p>
          <p>{productData?.description}</p>
          <img className={styles.image} src={productData?.image} alt="" />
          <button onClick={navigateToProducts} className={styles.button}>
            Вернуться к продуктам
          </button>
        </div>
      </main>
    </>
  );
};
