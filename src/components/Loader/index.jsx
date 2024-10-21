import React from 'react';

import styles from './index.module.css';

function Loader() {
  return <div className={styles.container_loader}><span className={styles.loader}></span></div>
}

export default Loader