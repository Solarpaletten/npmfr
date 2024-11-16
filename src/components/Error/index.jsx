import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

function Error({ error }) {
  return (
    <div className={styles.container_error}>
      <div className={styles.error}>
        <FontAwesomeIcon icon={faBug} />
        <h3>Something wrong happened!</h3>
        <p>{error}</p>
      </div>
    </div>
  );
}

export default Error;
