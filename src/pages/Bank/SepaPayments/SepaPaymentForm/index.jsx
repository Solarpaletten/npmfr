// src/pages/Bank/SepaPayments/components/SepaPaymentForm/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../../../components/Modal";
import Field from "../../../../../components/Field";
import { useAuthenticatedApi } from "../../../../../utils/api";

const SepaPaymentForm = ({ id = null }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    reference: "",
    amount: "",
    beneficiary: "",
    iban: "",
    bic: "",
    description: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const api = useAuthenticatedApi();

  useEffect(() => {
    if (id) {
      const fetchPayment = async () => {
        try {
          const response = await api.get(`/bank/sepa-payments/${id}`);
          setFormData(response.data);
        } catch (err) {
          setError(err.message || "Failed to fetch payment");
        }
      };
      fetchPayment();
    }
  }, [id, api]);

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
      if (id) {
        await api.put(`/bank/sepa-payments/${id}`, formData);
      } else {
        await api.post("/bank/sepa-payments", formData);
      }
      navigate("/bank/sepa-payments");
    } catch (err) {
      setError(err.message || "Failed to save payment");
      setLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      onClose={() => navigate("/bank/sepa-payments")}
      loading={loading}
      error={error}
      buttonPositiveName={id ? "Save changes" : "Create payment"}
      buttonNegativeName="Cancel"
    >
      <h2>{id ? "Edit SEPA payment" : "Create SEPA payment"}</h2>
      
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
        label="Reference"
        type="text"
        name="reference"
        value={formData.reference}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="Amount"
        type="number"
        step="0.01"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="Beneficiary"
        type="text"
        name="beneficiary"
        value={formData.beneficiary}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="IBAN"
        type="text"
        name="iban"
        value={formData.iban}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="BIC/SWIFT"
        type="text"
        name="bic"
        value={formData.bic}
        onChange={handleChange}
        disabled={loading}
        required
      />

      <Field
        label="Description"
        type="textarea"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
      />
    </Form>
  );
};

export default SepaPaymentForm;

