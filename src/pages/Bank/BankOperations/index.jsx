import React, { useState } from "react";
import Page from "../../../components/Page";
import styles from "./index.module.css";

const pesaroBankData = [
  {
    date: "27.08.2021",
    doc: "",
    client: "UAB A JUSTICE",
    amount: "1050,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA-",
    user: "sprapsoil@gmail.com",
    description: "Счет № 1069 (26.08.2021)"
  },
  {
    date: "08.07.2021",
    doc: "",
    client: "UAB A JUSTICE",
    amount: "1188,00",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA-",
    user: "sprapsoil@gmail.com",
    description: "Предоплата"
  },
  // ... добавьте остальные операции здесь
  {
    date: "28.10.2020",
    doc: "43",
    client: "UAB A JUSTICE",
    amount: "-1395,24",
    currency: "EUR",
    transactionType: "Транзакции с клиентами",
    type: "PA-62",
    user: "sprapsoil@gmail.com",
    description: "UAB A JUSTICE (refund of the invoice)",
    isDebit: true
  }
];

const alphaBankData = [
  // ... ваши предыдущие данные по Альфа-банку
];

const BankOperations = () => {
  const [showForm, setShowForm] = useState(false);
  const [operationType, setOperationType] = useState("");
  const [selectedBank, setSelectedBank] = useState("alpha"); // для выбора банка в форме

  const calculateTotals = (operations) => {
    return operations.reduce((acc, op) => {
      const amount = parseFloat(op.amount.replace(/\s/g, '').replace(',', '.'));
      if (op.isDebit || amount < 0) {
        acc.debit += Math.abs(amount);
      } else {
        acc.credit += amount;
      }
      return acc;
    }, { credit: 0, debit: 0 });
  };

  const renderBankSection = (data, bankName, accountNumber) => (
    <div className={styles.bankSection}>
      <h2>{bankName} (Счет: {accountNumber})</h2>
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
          {data.map((operation, index) => (
            <tr key={index}>
              <td>{operation.date}</td>
              <td>{operation.doc}</td>
              <td>{operation.client}</td>
              <td className={operation.isDebit || parseFloat(operation.amount.replace(/\s/g, '').replace(',', '.')) < 0 
                ? styles.debitAmount 
                : styles.creditAmount}
              >
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
            <td colSpan="3">Итого по счету {accountNumber}:</td>
            <td>
              <div>Поступления: {new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(calculateTotals(data).credit)} EUR</div>
              <div>Списания: {new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(calculateTotals(data).debit)} EUR</div>
              <div>Баланс: {new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(calculateTotals(data).credit - calculateTotals(data).debit)} EUR</div>
            </td>
            <td colSpan="6"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <Page loading={false} error={""}>
      <div className={styles.container}>
        <h1>Bank Operations</h1>
        
        <div className={styles.buttons}>
          <button onClick={() => handleNewOperation("D")}>Д</button>
          <button onClick={() => handleNewOperation("K")}>К</button>
          <select 
            value={selectedBank} 
            onChange={(e) => setSelectedBank(e.target.value)}
            className={styles.bankSelect}
          >
            <option value="alpha">Альфа Банк</option>
            <option value="pesaro">Pesaro Bank</option>
          </select>
        </div>

        {/* Секция Альфа-банка */}
        {renderBankSection(alphaBankData, "Альфа Банк", "271")}

        {/* Секция Pesaro банка */}
        {renderBankSection(pesaroBankData, "Pesaro Bank", "272")}

        {/* Форма добавления операции */}
        {showForm && (
          <div className={styles.form}>
            {/* ... остальной код формы ... */}
          </div>
        )}
      </div>
    </Page>
  );
};

export default BankOperations;