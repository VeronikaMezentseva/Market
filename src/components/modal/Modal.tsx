import { FC, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";

export const Modal: FC<{
  onClose: any;
  children: ReactNode;
  title: string
}> = ({ onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

 
  const modalRoot = document.getElementById("overlay");

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <div
        className={styles.overlay}
        onClick={onClose}
      />
    </>, modalRoot as HTMLDivElement
  );
};
