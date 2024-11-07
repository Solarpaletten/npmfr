import React, { useState, useEffect } from 'react';
import Table from '../../../../components/Table';
import Button from '../../../../components/Button';
import styles from './index.module.css';

function ProductionOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch orders
    setLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Production Orders</h2>
        <Button>New Order</Button>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Order №</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.number}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.startDate}</td>
              <td>{order.dueDate}</td>
              <td>{order.status}</td>
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

export default ProductionOrders;
