import React, { useState } from 'react';
import { Form } from "../../../../components/Modal";
import { useAccounts } from "../../../../contexts/AccountContext";
import { useAuthenticatedApi } from "../../../../utils/api";
import Papa from 'papaparse';

const AccountImportForm = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAuthenticatedApi();
  const { refetch } = useAccounts();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }
    setFile(file);
    setError(null);
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
      const requiredFields = ['code', 'name', 'account_type', 'parent_code'];
      const isValid = data.every(row => 
        requiredFields.every(field => row[field] !== undefined)
      );

      if (!isValid) {
        throw new Error('CSV file is missing required columns');
      }

      // Отправляем данные на сервер
      await api.post('/chart-of-accounts/import', data);
      
      await refetch();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Import error:', error);
      setError(error.message || 'Failed to import accounts');
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
      <h2>Import accounts</h2>
      <p>Select a CSV file with accounts data</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
      />
      <div style={{ marginTop: '10px' }}>
        <small>
          Required columns: code, name, account_type, parent_code
        </small>
      </div>
    </Form>
  );
};

export default AccountImportForm;