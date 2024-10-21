import React from "react";

import styles from './index.module.css';

function ValidationError({ error }) {
  return <div className={styles.error_plug}>{error && <div className={styles.error}>{error}</div>}</div>;
}

export default ValidationError;
