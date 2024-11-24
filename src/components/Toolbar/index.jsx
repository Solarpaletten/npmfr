import React from 'react';

import styles from './index.module.css';

const Toolbar = ({ children }) => {
  return <div className={styles.toolbar}>{children}</div>;
};

export default Toolbar;
