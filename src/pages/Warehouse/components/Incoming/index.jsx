import React, { useState } from 'react';
import Button from "../../../../components/Button";
import styles from "./index.module.css";

function Incoming({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    quantity: '',
    price_per_unit: '',
    supplier: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantity: Number(formData.quantity),
      price_per_unit: Number(formData.price_per_unit)
    });
  };

  return (
    <div className={styles.incoming}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Add Stock</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>
              Quantity<span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              className={styles.input}
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Price per unit<span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              className={styles.input}
              value={formData.price_per_unit}
              onChange={(e) => setFormData({...formData, price_per_unit: e.target.value})}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Supplier</label>
            <input
              type="text"
              className={styles.input}
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Incoming;