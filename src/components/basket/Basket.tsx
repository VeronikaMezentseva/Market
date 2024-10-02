import { FC, MouseEventHandler, useState } from "react";
import styles from "./basket.module.css";
import { Modal } from "../modal/Modal";
import { useDispatch } from "../../app/store";
import {
  TProduct,
  deleteProductById,
} from "../../slices/products-slice";
import { useNavigate } from "react-router-dom";

export const SVGBasket: FC<{
  product: TProduct;
  onDelete: (evt: any, product: TProduct) => void;
}> = ({ product, onDelete }) => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const openModal = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsOpenModal(true);
    console.log("open modal");
  };

  const handleClose = (evt: any) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsOpenModal(false);
  };

  return (
    <svg
      onClick={(evt) => openModal(evt)}
      className={styles.basket}
      fill="none"
      width="30px"
      height="30px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path>
      </g>
      {isOpenModal && (
        <Modal
          onClose={handleClose}
          title={`Вы уверены, что хотите удалить ${product.name}?`}
        >
          <button className={styles.button} onClick={handleClose}>
            Отмена
          </button>
          <button
            className={styles.button}
            onClick={(evt) => {
              onDelete(evt, product);
              handleClose(evt);
            }}
          >
            Удалить товар
          </button>
        </Modal>
      )}
    </svg>
  );
};
