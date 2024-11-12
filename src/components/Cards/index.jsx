import React from 'react';
import styles from './index.module.css';

export const Cards = ({ children, columns }) => {
  return (
    <div
      className={styles.statsGrid}
      style={{ gridTemplateColumns: `${'1fr '.repeat(columns + 1).trim()}` }}
    >
      {children}
    </div>
  );
};

export const Card = ({ title, value }) => {
  return (
    <div className={styles.statCard}>
      <h3>{title}</h3>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
};
