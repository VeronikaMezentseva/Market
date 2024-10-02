import { FC, ReactNode, useEffect } from "react";
import styles from "./overlay.module.css";
import ReactDOM from "react-dom";
import { Modal } from "../modal/Modal";

export const Overlay: FC<{isOpen: boolean}> = ({isOpen}) => {
  const modalRoot = document.getElementById('overlay');
  console.log(modalRoot);

  return ReactDOM.createPortal(
    <>
      {/* {isOpen && 
        <Modal/>

        } */}
      {/* <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button
            className={styles.button}
            type="button"
          >
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div> */}
    </>, modalRoot as HTMLDivElement
  );
};
