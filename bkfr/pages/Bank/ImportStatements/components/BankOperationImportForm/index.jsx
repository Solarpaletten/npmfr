// src/pages/Bank/ImportStatements/components/BankOperationImportForm/index.jsx
import React, { useState } from 'react';
import { Form } from "../../../../../components/Modal";
import { useAccounts } from "../../../../../contexts/AccountContext";
import { useAuthenticatedApi } from "../../../../../utils/api";
import Papa from 'papaparse';

const BankOperationImportForm = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAuthenticatedApi();
  const { accounts } = useAccounts();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }
    setFile(file);
    setError(null);
  };

  const validateAccount = (accountCode) => {
    return accounts?.some(account => account.code === accountCode && account.is_active);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const { data } = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true
      });

      // Валидация данных
      const requiredFields = ['date', 'type', 'amount', 'client', 'corresponding_account'];
      const isValid = data.every(row => {
        // Проверка наличия всех обязательных полей
        const hasRequiredFields = requiredFields.every(field => 
          row[field] !== undefined && row[field] !== ''
        );
        
        // Проверка типа операции
        const validType = row.type === 'D' || row.type === 'K';
        
        // Проверка корреспондирующего счета
        const validCorrespondingAccount = validateAccount(row.corresponding_account);
        
        // Проверка суммы
        const validAmount = row.amount > 0;
        
        // Проверка даты
        const validDate = !isNaN(new Date(row.date).getTime());

        return hasRequiredFields && validType && validCorrespondingAccount && validAmount && validDate;
      });

      if (!isValid) {
        throw new Error(
          'CSV file contains invalid data. Please check that:\n' +
          '- All required fields are present\n' +
          '- Type is either D or K\n' +
          '- Corresponding accounts exist in the chart of accounts\n' +
          '- Amounts are positive numbers\n' +
          '- Dates are in valid format'
        );
      }

      // Форматирование данных перед отправкой
      const formattedData = data.map(row => ({
        ...row,
        date: new Date(row.date).toISOString().split('T')[0],
        amount: Number(row.amount).toFixed(2)
      }));

      // Отправка данных на сервер
      await api.post('/bank/operations/import', formattedData);
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Import error:', error);
      setError(error.message || 'Failed to import bank operations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={onClose}
      loading={loading}
      error={error}
      buttonPositiveName="Import"
      buttonNegativeName="Cancel"
    >
      <h2>Import bank operations</h2>
      <p>Select a CSV file with operations data</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Required columns:</p>
        <ul className="list-disc ml-4">
          <li>date - Operation date (YYYY-MM-DD)</li>
          <li>type - Operation type (D/K)</li>
          <li>amount - Operation amount (positive number)</li>
          <li>client - Client name</li>
          <li>corresponding_account - Account code from chart of accounts</li>
        </ul>
        <p className="mt-2">Optional columns:</p>
        <ul className="list-disc ml-4">
          <li>description - Operation description</li>
          <li>reference_number - Reference number</li>
          <li>initial_client - Initial client</li>
          <li>initial_customer_code - Initial customer code</li>
        </ul>
      </div>
    </Form>
  );
};

export default BankOperationImportForm;