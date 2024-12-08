import React, { useState } from "react";
import Page from "../../../components/Page";
import styles from "./index.module.css";

const bankData = [
  {
    date: "16.11.2020",
    doc: "11",
    client: "Bank Commission",
    amount: "0,10",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Банковская комиссия",
    isDebit: true
  },
  {
    date: "16.11.2020",
    doc: "7",
    client: "UAB A JUSTICE",
    amount: "10 125,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "16.09.2020",
    doc: "10",
    client: "UAB A JUSTICE",
    amount: "130,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "24.08.2020",
    doc: "9",
    client: "UAB A JUSTICE",
    amount: "2 435,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "18.08.2020",
    doc: "5",
    client: "UAB A JUSTICE",
    amount: "2 960,25",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "27.07.2020",
    doc: "6",
    client: "UAB A JUSTICE",
    amount: "19 000,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "19.06.2020",
    doc: "1",
    client: "UAB A JUSTICE",
    amount: "11 356,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "11.06.2020",
    doc: "8",
    client: "UAB A JUSTICE",
    amount: "1 019,05",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "25.05.2020",
    doc: "2",
    client: "UAB A JUSTICE",
    amount: "960,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  {
    date: "08.05.2020",
    doc: "3",
    client: "UAB A JUSTICE",
    amount: "774,52",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Счет № 1012 (06.05.2020)"
  },
  {
    date: "05.05.2020",
    doc: "4",
    client: "UAB A JUSTICE",
    amount: "1 577,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  }
];

const BankOperations = () => {
  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState("");

  const calculateTotals = (operations) => {
    return operations.reduce((acc, op) => {
      const amount = parseFloat(op.amount.replace(/\s/g, '').replace(',', '.'));
      if (op.isDebit) {
        acc.debit += amount;
      } else {
        acc.credit += amount;
      }
      return acc;
    }, { credit: 0, debit: 0 });
  };

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
                <th>T.</th>
                <th>Пользователь</th>
                <th>Описание</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bankData.map((operation) => (
                <tr key={operation.doc}>
                  <td>{operation.date}</td>
                  <td>{operation.doc}</td>
                  <td>{operation.client}</td>
                  <td className={operation.isDebit ? styles.debitAmount : styles.creditAmount}>
                    {operation.amount}
                  </td>
                  <td>{operation.currency}</td>
                  <td>{operation.transactionType}</td>
                  <td>{operation.type}</td>
                  <td>{operation.user}</td>
                  <td>{operation.description}</td>
                  <td>
                    <button className={styles.editButton}>Edit</button>
                  </td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td colSpan="3">Итого:</td>
                <td>
                  <div>Поступления: {new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(calculateTotals(bankData).credit)} EUR</div>
                  <div>Списания: {new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(calculateTotals(bankData).debit)} EUR</div>
                  <div>Баланс: {new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(calculateTotals(bankData).credit - calculateTotals(bankData).debit)} EUR</div>
                </td>
                <td colSpan="6"></td>
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