import { FC } from "react";
import styles from "./error.module.css";

export const Error: FC<{text: string}> = ({text}) => (
  <p className={styles.error}>
    {text}
  </p>
);
