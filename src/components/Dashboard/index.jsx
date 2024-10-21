import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="path-to-logo" alt="Solar Logo" />
          <p>Solar</p>
        </div>
        <nav>
          <ul>
            <li><Link to="/clients">Clients</Link></li>
            <li>Warehouse -
              <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
              </ul>
            </li>
            <li><a href="#">General ledger</a></li>
            <li><a href="#">Cashier +</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Personnel</a></li>
            <li><a href="#">Production</a></li>
            <li><a href="#">Assets</a></li>
            <li><a href="#">Documents</a></li>
            <li><a href="#">Salary</a></li>
            <li><a href="#">Declaration</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-right">
            <span>Invite users</span>
            <span>Minimal</span>
            <span>Balance 0,00 €</span>
            <span>Partnership points 0,00 €</span>
            <span>Leandid Kanoplich UG SWAPOIL</span>
            <div className="user-icon"></div>
          </div>
        </header>

        <section className="content">
          <h1>Welcome to the Dashboard</h1>
          <p>This is the main content area where relevant information will be displayed based on your selections in the sidebar.</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
