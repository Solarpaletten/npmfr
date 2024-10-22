import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

function ValidationError({ error }) {
  return (
    <div className={styles.error_plug}>
      {error && (
        <div className={styles.error}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            style={{ color: "#B43F3F", fontSize: "14px", margin: "0 5px" }}
          />
          {error}
        </div>
      )}
    </div>
  );
}

export default ValidationError;
