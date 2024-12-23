// src/pages/Bank/BankLink/components/BankLinkForm/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../../../components/Modal";
import Field from "../../../../../components/Field";
import { useAuthenticatedApi } from "../../../../../utils/api";

const BankLinkForm = ({ initialData = null }) => {
  const [formData, setFormData] = useState({
    bank: initialData?.bank || "",
    account: initialData?.account || "",
    client_id: initialData?.client_id || "",
    api_key: initialData?.api_key || "",
    api_secret: initialData?.api_secret || "",
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
      if (initialData) {
        await api.put(`/bank/bank-link/${initialData.id}`, formData);
      } else {
        await api.post("/bank/bank-link", formData);
      }
      navigate("/bank/bank-link");
    } catch (err) {
      setError(err.message || "Failed to save bank link");
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={() => navigate("/bank/bank-link")}
      loading={loading}
      error={error}
      buttonPositiveName={initialData ? "Save changes" : "Create bank link"}
      buttonNegativeName="Cancel"
    >
      <h2>{initialData ? "Edit bank link" : "Create bank link"}</h2>
      
      <Field
        label="Bank"
        type="select"
        name="bank"
        value={formData.bank}
        onChange={handleChange}
        disabled={loading}
        required
        options={[
          { value: "swedbank", label: "Swedbank" },
          { value: "seb", label: "SEB" },
          { value: "luminor", label: "Luminor" }
        ]}
      />

      <Field
        label="Account"
        type="text"
        name="account"
        value={formData.account}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="Client ID"
        type="text"
        name="client_id"
        value={formData.client_id}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="API Key"
        type="text"
        name="api_key"
        value={formData.api_key}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="API Secret"
        type="password"
        name="api_secret"
        value={formData.api_secret}
        onChange={handleChange}
        disabled={loading}
        required
      />
    </Form>
  );
};

export default BankLinkForm;