import React from "react";

import styles from "./index.module.css";

function Field({
  type,
  placeholder,
  label,
  name,
  value,
  onChange,
  required,
  disabled,
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.input}>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default Field;
