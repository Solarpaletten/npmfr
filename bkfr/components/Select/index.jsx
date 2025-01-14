import React from "react";

import styles from "./index.module.css";

function Select({
  value,
  onChange,
  label,
  options,
  required,
  disabled,
  name,
  id,
}) {
  return (
    <div className={styles.select}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.input}>
        <select
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
