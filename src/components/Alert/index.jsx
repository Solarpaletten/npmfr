import React from 'react';

import styles from './index.module.css';

const Alert = ({ children, variant }) => {
  return <div className={`${styles.alert} ${styles[variant]}`}>{children}</div>;
};

export default Alert;
