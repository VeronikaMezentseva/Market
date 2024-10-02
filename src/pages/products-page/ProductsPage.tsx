import { FC, useEffect, useMemo, useState } from "react";
import styles from "./products-page.module.css";
import { Card } from "../../components/card/Card";
import { useSelector } from "react-redux";
import {
  TProduct,
  deleteProductById,
  getProducts,
  selectOnlyLikedProducts,
  selectProducts,
} from "../../../src/slices/products-slice";
import { useDispatch } from "../../app/store";

export const ProductsPage: FC = () => {
  const products = useSelector(selectProducts);
  const likedProducts = useSelector(selectOnlyLikedProducts);

  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const displayLikedCards = () => {
    setIsLiked(true);
  };

  const displayAllCards = () => {
    setIsLiked(false);
  };

  const handleDelete = (evt: any, product: TProduct) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(deleteProductById(product.id));
  };

  function buildProducts() {
    const cards = isLiked ? likedProducts : products;
    return cards.map((product) => {
      return (
        <li key={product.id}>
          <Card product={product} onDelete={handleDelete}></Card>
        </li>
      );
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles["filter-container"]}>
        <input
          type="radio"
          id="all"
          name="filter"
          value="all"
          onChange={displayAllCards}
        />
        <label htmlFor="all">Все продукты</label>

        <input
          type="radio"
          id="likedOnly"
          name="filter"
          value="likedOnly"
          onChange={displayLikedCards}
        />
        <label htmlFor="likedOnly">Продукты в избранном</label>
      </div>
      <ul className={styles["card-container"]}>{buildProducts()}</ul>
    </main>
  );
};
