import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/clients">Clients</Link>
      {/* Добавляйте другие ссылки по необходимости */}
    </div>
  );
}

export default Sidebar;
