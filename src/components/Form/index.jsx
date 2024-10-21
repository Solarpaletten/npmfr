import React from 'react';

import styles from './index.module.css';

function Form({ children }) {
  return <div className={styles.container_form}><div className={styles.form}>{children}</div></div>
}

export default Form;
