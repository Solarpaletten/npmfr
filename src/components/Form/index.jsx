import React from 'react';

import styles from './index.module.css';

function Form({ children }) {
  return <div className={styles.form}>{children}</div>
}

export default Form;