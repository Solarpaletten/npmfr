import React, { useState, useEffect } from "react";
import Page from "../../components/Page";

import styles from "./index.module.css";

function Dashboard({ onLogout }) {
  const [stats, setStats] = useState({
    summary: {
      customers: { total: 0, revenue: 0 },
      suppliers: { total: 0, spending: 0 },
    },
    topCustomers: [],
    topSuppliers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/dashboard/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <div className={styles.container}>
        <h1>Dashboard</h1>

        <div className={styles.summaryGrid}>
          <div className={styles.summarySection}>
            <h2>Customers</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Total Customers</h3>
                <div className={styles.statValue}>
                  {stats.summary.customers.total}
                </div>
              </div>
              <div className={styles.statCard}>
                <h3>Total Revenue</h3>
                <div className={styles.statValue}>
                  {formatCurrency(stats.summary.customers.revenue)}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.summarySection}>
            <h2>Suppliers</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3>Total Suppliers</h3>
                <div className={styles.statValue}>
                  {stats.summary.suppliers.total}
                </div>
              </div>
              <div className={styles.statCard}>
                <h3>Total Spending</h3>
                <div className={styles.statValue}>
                  {formatCurrency(stats.summary.suppliers.spending)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.topLists}>
          <div className={styles.topSection}>
            <h2>Top 3 Customers</h2>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>VAT Code</th>
                    <th>Transactions</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.code || "-"}</td>
                      <td>{customer.vatCode || "-"}</td>
                      <td>{customer.transactions}</td>
                      <td>{formatCurrency(customer.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.topSection}>
            <h2>Top 3 Suppliers</h2>
            <div className={styles.table}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>VAT Code</th>
                    <th>Transactions</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topSuppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.name}</td>
                      <td>{supplier.code || "-"}</td>
                      <td>{supplier.vatCode || "-"}</td>
                      <td>{supplier.transactions}</td>
                      <td>{formatCurrency(supplier.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default Dashboard;
