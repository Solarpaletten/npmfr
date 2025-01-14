// src/pages/Bank/BankOperations/components/BankOperationAddForm/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import { useBankOperations } from "../../../../contexts/BankOperationsContext";
import { useAuthenticatedApi } from "../../../../utils/api";

const BankOperationAddForm = () => {
  const { refetch } = useBankOperations();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "D",
    amount: "",
    client: "",
    description: "",
    account: "271",
    corresponding_account: "",
    purpose_of_payment: "",
    reference_number: "",
    initial_client: "",
    initial_customer_code: "",
    transfer_no: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const api = useAuthenticatedApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/bank/operations", formData);
      await refetch();
      navigate("/bank/operations");
    } catch (err) {
      setError(err.message || "Failed to create operation");
      setLoading(false);
    }
  };

  return (
    <Page>
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/bank/operations")}
        loading={loading}
        error={error}
        buttonPositiveName="Create operation"
        buttonNegativeName="Cancel"
      >
        <h2>Create bank operation</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Accounting bank"
            type="text"
            name="accounting_bank"
            value="AG"
            disabled
            required
          />
          
          <Field
            label="Cor. account"
            type="text"
            name="account"
            value={formData.account}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Field
            label="C/D"
            type="select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={loading}
            required
            options={[
              { value: "D", label: "Debit" },
              { value: "K", label: "Credit" }
            ]}
          />

          <Field
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Field
            label="Transfer no."
            type="text"
            name="transfer_no"
            value={formData.transfer_no}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Field
            label="Total"
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            disabled={loading}
            required
          />

          <Field
            label="Initial client"
            type="text"
            name="initial_client"
            value={formData.initial_client}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Field
            label="Initial customer code"
            type="text"
            name="initial_customer_code"
            value={formData.initial_customer_code}
            onChange={handleChange}
            disabled={loading}
          />

          <Field
            label="Client"
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <Field
          label="Purpose of payment"
          type="textarea"
          name="purpose_of_payment"
          value={formData.purpose_of_payment}
          onChange={handleChange}
          disabled={loading}
          className="mt-4"
        />

        <Field
          label="Reference number"
          type="text"
          name="reference_number"
          value={formData.reference_number}
          onChange={handleChange}
          disabled={loading}
          className="mt-4"
        />
      </Form>
    </Page>
  );
};

export default BankOperationAddForm;