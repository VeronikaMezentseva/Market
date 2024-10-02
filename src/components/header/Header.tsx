import { FC } from "react";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

export const Header: FC = () => (
  <div className={styles.header}>
    <p>
      <NavLink to={"/"}>GO HOME</NavLink>
    </p>
    <p>
      <NavLink to={"/products"}>GO PRODUCTS</NavLink>
    </p>
    <p>
      <NavLink to={"/create-product"}>CREATE PRODUCT</NavLink>
    </p>
  </div>
);
