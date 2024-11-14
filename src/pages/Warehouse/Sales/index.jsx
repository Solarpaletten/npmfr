import React, { useState } from "react";
import Button from "../../../components/Button";

import styles from "./index.module.css";

const Sales = ({ onSubmit, onClose, clients }) => {
  const [formData, setFormData] = useState({
    quantity: "",
    price_per_unit: "",
    client_id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      quantity: Number(formData.quantity),
      price_per_unit: Number(formData.price_per_unit),
      client_id: Number(formData.client_id),
    });
  };

  const total =
    formData.quantity && formData.price_per_unit
      ? formData.quantity * formData.price_per_unit
      : 0;

  return (
    <div className={styles.sales}>
      <div className={styles.form}>
        <div className={styles.header}>
          <h2>Create Sale</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>
              Client<span className={styles.required}>*</span>
            </label>
            <select
              className={styles.select}
              value={formData.client_id}
              onChange={(e) =>
                setFormData({ ...formData, client_id: e.target.value })
              }
              required
            >
              <option value="">Select client</option>
              {clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Quantity<span className={styles.required}>*</span>
            </label>
            <input
              type="number"
              className={styles.input}
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, price_per_unit: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Total Amount:</span>
              <span className={styles.summaryValue}>{total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Sale</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sales;
