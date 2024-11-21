import React from "react";

import styles from "./index.module.css";

function Field({
  type,
  placeholder,
  name,
  value,
  onChange,
  required,
  disabled,
}) {
  return (
    <div className={styles.input}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
}

export default Field;
