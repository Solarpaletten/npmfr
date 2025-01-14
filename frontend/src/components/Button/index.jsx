import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import styles from "./index.module.css";

function Button({ 
  children, 
  className, 
  variant,  // 'save' | 'print' | 'default' | 'primary' | 'danger' | 'link'
  icon, 
  type, 
  onClick, 
  disabled 
}) {
  return (
    <button
      className={`${className || ''} ${styles.button} ${styles[variant] || styles.default}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} style={{ fontSize: "14px", margin: "0 5px" }} />}
      {children}
    </button>
  );
}

export default Button;