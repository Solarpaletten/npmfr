import React, { useState } from "react";
import Page from "../../../components/Page";
import styles from "./index.module.css";

const BankOperations = () => {
  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState("");

  const handleNewOperation = (type) => {
    setOperationType(type);
    setShowForm(true);
  };

  return (
    <Page loading={false} error={""}>
      <div className={styles.container}>
        <h1>Bank Operations</h1>
        
        <div className={styles.buttons}>
          <button onClick={() => handleNewOperation("D")}>Д</button>
          <button onClick={() => handleNewOperation("K")}>К</button>
        </div>

        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Client</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-12-07</td>
                  <td>K</td>
                  <td>305.00</td>
                  <td>Leanid Kanoplich</td>
                  <td>
                    <button className={styles.editButton}>Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {showForm && (
            <div className={styles.form}>
              <div className={styles.formContent}>
                <input disabled value="271" />
                <input disabled value={operationType} />
                <input type="date" />
                <input type="number" step="0.01" placeholder="Amount" />
                <input placeholder="Client" />
                <input placeholder="Description" />
              </div>
              <div className={styles.formButtons}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button className={styles.saveButton}>Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default BankOperations;