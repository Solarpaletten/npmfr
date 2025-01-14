// src/pages/Bank/SepaPayments/components/SepaPaymentImportForm/index.jsx
import React, { useState } from 'react';
import { Form } from "../../../../../components/Modal";
import { useAuthenticatedApi } from "../../../../../utils/api";
import Papa from 'papaparse';

const SepaPaymentImportForm = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAuthenticatedApi();

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
      const requiredFields = ['date', 'reference', 'amount', 'beneficiary', 'iban', 'bic'];
      const isValid = data.every(row => {
        const hasRequiredFields = requiredFields.every(field => 
          row[field] !== undefined && row[field] !== ''
        );
        
        const validAmount = row.amount > 0;
        const validDate = !isNaN(new Date(row.date).getTime());

        return hasRequiredFields && validAmount && validDate;
      });

      if (!isValid) {
        throw new Error('CSV file contains invalid data');
      }

      const formattedData = data.map(row => ({
        ...row,
        date: new Date(row.date).toISOString().split('T')[0],
        amount: Number(row.amount).toFixed(2)
      }));

      await api.post('/bank/sepa-payments/import', formattedData);
      
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Import error:', error);
      setError(error.message || 'Failed to import payments');
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
      <h2>Import SEPA payments</h2>
      <p>Select a CSV file with payment data</p>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
      />
      <div className="mt-4 text-sm text-gray-600">
        <p>Required columns:</p>
        <ul className="list-disc ml-4">
          <li>date - Payment date (YYYY-MM-DD)</li>
          <li>reference - Payment reference</li>
          <li>amount - Payment amount (positive number)</li>
          <li>beneficiary - Beneficiary name</li>
          <li>iban - Beneficiary IBAN</li>
          <li>bic - Beneficiary BIC/SWIFT code</li>
        </ul>
        <p className="mt-2">Optional columns:</p>
        <ul className="list-disc ml-4">
          <li>description - Payment description</li>
        </ul>
      </div>
    </Form>
  );
};

export default SepaPaymentImportForm;