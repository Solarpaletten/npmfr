import React, { useState, useEffect } from 'react';
import Table from '../../../../components/Table';
import Button from '../../../../components/Button';
import styles from './index.module.css';

function ProductionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch plans
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Production Plans</h2>
        <Button>Create Plan</Button>
      </div>

      <div className={styles.planningBoard}>
        <div className={styles.weekView}>
          {/* Weekly planning view */}
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Plan №</th>
            <th>Period</th>
            <th>Products</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.number}</td>
              <td>{plan.period}</td>
              <td>{plan.products}</td>
              <td>{plan.status}</td>
              <td>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progress} 
                    style={{width: `${plan.progress}%`}}
                  />
                </div>
              </td>
              <td>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductionPlans;
