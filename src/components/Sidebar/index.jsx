import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '../Divider';

import styles from './index.module.css';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link to="/">Home</Link>
      <Divider />
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/clients">Clients</Link>
      <Link>
        Warehouse -
        <Link to="#">Item 1</Link>
        <Link to="#">Item 2</Link>
      </Link>
      <Link to="#">General ledger</Link>
      <Link to="#">Cashier +</Link>
      <Link to="#">Reports</Link>
      <Link to="#">Personnel</Link>
      <Link to="#">Production</Link>
      <Link to="#">Assets</Link>
      <Link to="#">Documents</Link>
      <Link to="#">Salary</Link>
      <Link to="#">Declaration</Link>
      <Divider />
      <Link to="#">Settings</Link>
    </aside>

  );
}

export default Sidebar;
