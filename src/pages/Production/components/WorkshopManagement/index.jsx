import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

function WorkshopManagement() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch workshops data
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Workshop Management</h2>
      </div>

      <div className={styles.workshopsGrid}>
        {workshops.map(workshop => (
          <div key={workshop.id} className={styles.workshopCard}>
            <h3>{workshop.name}</h3>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <label>Active Orders</label>
                <span>{workshop.activeOrders}</span>
              </div>
              <div className={styles.stat}>
                <label>Workers</label>
                <span>{workshop.workers}</span>
              </div>
              <div className={styles.stat}>
                <label>Efficiency</label>
                <span>{workshop.efficiency}%</span>
              </div>
            </div>
            <div className={styles.timeline}>
              {/* Timeline implementation */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkshopManagement;
