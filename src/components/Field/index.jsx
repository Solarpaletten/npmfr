import React from 'react';

import styles from './index.module.css';

function Field({ type, placeholder, value, onChange }) {
  return (
    <div className={styles.input}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Field;
