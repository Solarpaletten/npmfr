import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import { Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import { useBankOperations } from "../../../contexts/BankOperationsContext";
import { useAuthenticatedApi } from "../../../utils/api";

const BankOperationAddForm = () => {
  const { refetch } = useBankOperations();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "D", // D или K
    amount: "",
    client: "",
    description: "",
    account: "271",
    corresponding_account: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = useAuthenticatedApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/bank/operations", formData);
      refetch();
      navigate("/bank/operations");
    } catch (err) {
      setError("Failed to create operation");
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
        <Field
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
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
          type="number"
          step="0.01"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          disabled={loading}
          required
        />
        <Field
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="Client"
          disabled={loading}
          required
        />
        <Field
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          disabled={loading}
        />
        <Field
          type="text"
          name="account"
          value={formData.account}
          onChange={handleChange}
          placeholder="Account"
          disabled={loading}
          defaultValue="271"
        />
        <Field
          type="text"
          name="corresponding_account"
          value={formData.corresponding_account}
          onChange={handleChange}
          placeholder="Corresponding Account"
          disabled={loading}
          required
        />
      </Form>
    </Page>
  );
};

export default BankOperationAddForm;