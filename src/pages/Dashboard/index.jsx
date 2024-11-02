import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import styles from './index.module.css';

function Dashboard({ onLogout }) {
  const [stats, setStats] = useState({
    clients: {
      total: 0,
      newThisMonth: 0,
      active: 0
    },
    transactions: {
      total: 0,
      thisMonth: 0,
      amount: 0
    },
    topClients: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://npmbk.onrender.com/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <div className={styles.container}>
        <h1>Dashboard</h1>

        <div className={styles.statsGrid}>
          {/* Клиенты */}
          <div className={styles.statCard}>
            <h3>Clients</h3>
            <div className={styles.statValue}>{stats.clients.total}</div>
            <div className={styles.statSubtext}>
              <span className={styles.highlight}>+{stats.clients.newThisMonth}</span> new this month
            </div>
          </div>

          {/* Транзакции */}
          <div className={styles.statCard}>
            <h3>Transactions</h3>
            <div className={styles.statValue}>{stats.transactions.total}</div>
            <div className={styles.statSubtext}>
              <span className={styles.highlight}>{stats.transactions.thisMonth}</span> this month
            </div>
          </div>

          {/* Сумма транзакций */}
          <div className={styles.statCard}>
            <h3>Total Amount</h3>
            <div className={styles.statValue}>
              ${stats.transactions.amount.toLocaleString()}
            </div>
            <div className={styles.statSubtext}>all time</div>
          </div>
        </div>

        {/* Топ клиентов */}
        <div className={styles.topClients}>
          <h2>Top Clients</h2>
          <div className={styles.clientsTable}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Transactions</th>
                  <th>Total Amount</th>
                  <th>Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {stats.topClients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.transactions}</td>
                    <td>${client.totalAmount.toLocaleString()}</td>
                    <td>{new Date(client.lastActivity).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Dashboard;
