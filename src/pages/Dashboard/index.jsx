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
      setStats(data || {
        clients: { total: 0, newThisMonth: 0, active: 0 },
        transactions: { total: 0, thisMonth: 0, amount: 0 },
        topClients: []
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Безопасное форматирование чисел
  const formatNumber = (num) => {
    return typeof num === 'number' ? num.toLocaleString() : '0';
  };

  // Безопасное форматирование дат
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return '-';
    }
  };

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <div className={styles.container}>
        <h1>Dashboard</h1>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Clients</h3>
            <div className={styles.statValue}>{formatNumber(stats.clients?.total)}</div>
            <div className={styles.statSubtext}>
              <span className={styles.highlight}>+{formatNumber(stats.clients?.newThisMonth)}</span> new this month
            </div>
          </div>

          <div className={styles.statsSection}>
            <h2>Client Types</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Customers</h3>
                <div className={styles.statValue}>{stats.summary.clients.customers}</div>
              </div>
              <div className={styles.statCard}>
                <h3>Suppliers</h3>
                <div className={styles.statValue}>{stats.summary.clients.suppliers}</div>
              </div>
              <div className={styles.statCard}>
                <h3>Both</h3>
                <div className={styles.statValue}>{stats.summary.clients.both}</div>
              </div>
            </div>
          </div>

          {/* <div className={styles.tablesGrid}>
            <div className={styles.tableSection}>
              <h2>Top Customers</h2>
              <Table data={stats.topCustomers} />
            </div>
            <div className={styles.tableSection}>
              <h2>Top Suppliers</h2>
              <Table data={stats.topSuppliers} />
            </div>
          </div> */}

          <div className={styles.statCard}>
            <h3>Transactions</h3>
            <div className={styles.statValue}>{formatNumber(stats.transactions?.total)}</div>
            <div className={styles.statSubtext}>
              <span className={styles.highlight}>{formatNumber(stats.transactions?.thisMonth)}</span> this month
            </div>
          </div>

          <div className={styles.statCard}>
            <h3>Total Amount</h3>
            <div className={styles.statValue}>
              ${formatNumber(stats.transactions?.amount)}
            </div>
            <div className={styles.statSubtext}>all time</div>
          </div>
        </div>

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
                {(stats.topClients || []).map(client => (
                  <tr key={client.id}>
                    <td>{client.name || '-'}</td>
                    <td>{formatNumber(client.transactions)}</td>
                    <td>${formatNumber(client.total_amount)}</td>
                    <td>{formatDate(client.last_activity)}</td>
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
