import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">Home</Link>
      <Link to="/clients">Clients</Link>
      {/* Добавляйте другие ссылки по необходимости */}
    </div>
  );
}

export default Sidebar;
