import React from 'react';

import styles from './index.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboard_container}>
      <h1>Welcome to the Dashboard</h1>
      <p>This is the main content area where relevant information will be displayed based on your selections in the sidebar.</p>
    </div>
  );
}

export default Dashboard;
