import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./index.module.css";

function Button({ children, primary, icon, type, onClick }) {
  return (
    <button
      className={`${styles.button} ${
        primary ? styles.primary : styles.default
      }`}
      type={type}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: "14px", margin: "0 5px" }}
        />
      )}
      {children}
    </button>
  );
}

export default Button;
