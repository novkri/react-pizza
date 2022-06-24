import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <h1 className={styles.root}>
      <span> :(</span>
      <br />
      Nothing found
      <p className={styles.description}>Some desscription</p>
    </h1>
  );
};

export default NotFoundBlock;
