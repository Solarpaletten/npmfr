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

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Док</th>
                <th>Клиент/Поставщик</th>
                <th>Сумма</th>
                <th>Вал.</th>
                <th>Тип транзакции</th>
                <th>Т.</th>
                <th>Пользователь</th>
                <th>Описание</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>16.11.2020</td>
                <td>7</td>
                <td>UAB A JUSTICE</td>
                <td>10 125,00</td>
                <td>EUR</td>
                <td>Транзакции с клиентами</td>
                <td>PA</td>
                <td>sprapsoil@gmail.com</td>
                <td>Предоплата</td>
                <td>
                  <button className={styles.editButton}>Edit</button>
                </td>
              </tr>
              <tr>
                <td>16.09.2020</td>
                <td>10</td>
                <td>UAB A JUSTICE</td>
                <td>130,00</td>
                <td>EUR</td>
                <td>Транзакции с клиентами</td>
                <td>PA</td>
                <td>sprapsoil@gmail.com</td>
                <td>Предоплата</td>
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
              <input type="text" placeholder="Документ" />
              <input placeholder="Клиент/Поставщик" />
              <input type="number" step="0.01" placeholder="Сумма" />
              <input placeholder="Валюта" defaultValue="EUR" />
              <input placeholder="Тип транзакции" defaultValue="Транзакции с клиентами" />
              <input placeholder="Пользователь" />
              <input placeholder="Описание" />
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
    </Page>
  );
};

export default BankOperations;