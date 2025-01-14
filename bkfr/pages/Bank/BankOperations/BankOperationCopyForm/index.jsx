// src/pages/Bank/BankOperations/components/BankOperationCopyForm/index.jsx
import React, { useState } from "react";
import { Form } from "../../../../components/Modal";
import { useAuthenticatedApi } from "../../../../utils/api";

const BankOperationCopyForm = ({ selected, setSelected, onShowForm, requery }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAuthenticatedApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        selected.map(operation => 
          api.post(`/bank/operations/${operation.id}/copy`)
        )
      );
      await requery();
      setSelected([]);
      onShowForm(false);
    } catch (err) {
      setError(err.message || "Failed to copy operations");
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={() => onShowForm(false)}
      loading={loading}
      error={error}
      buttonPositiveName="Copy"
      buttonNegativeName="Cancel"
    >
      <h2>Copy operations</h2>
      <p>Are you sure you want to copy {selected.length} operation(s)?</p>
      {selected.map(operation => (
        <div key={operation.id} className="text-sm text-gray-600">
          {operation.client} - {operation.amount}
        </div>
      ))}
    </Form>
  );
};

export default BankOperationCopyForm;

