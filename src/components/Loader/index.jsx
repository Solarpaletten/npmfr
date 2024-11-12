import React from 'react';

import styles from './index.module.css';

function Loader({ type }) {
  return (
    <div className={`${styles.loader} ${type ? styles[type] : ''}`}>
      <span></span>
    </div>
  );
}

export default Loader;
