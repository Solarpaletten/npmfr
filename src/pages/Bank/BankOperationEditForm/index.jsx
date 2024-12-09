import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../../components/Page";
import { Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import { useBankOperations } from "../../../contexts/BankOperationsContext";
import { useAuthenticatedApi } from "../../../utils/api";

const BankOperationEditForm = () => {
  const { id } = useParams();
  const { refetch } = useBankOperations();
  const [formData, setFormData] = useState({
    date: "",
    type: "",
    amount: "",
    client: "",
    description: "",
    account: "",
    corresponding_account: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = useAuthenticatedApi();

  useEffect(() => {
    const fetchOperation = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/bank/operations/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch operation");
      } finally {
        setLoading(false);
      }
    };

    fetchOperation();
  }, [id, api]);

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
      await api.put(`/bank/operations/${id}`, formData);
      refetch();
      navigate("/bank/operations");
    } catch (err) {
      setError("Failed to update operation");
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
        buttonPositiveName="Save changes"
        buttonNegativeName="Cancel"
      >
        <h2>Edit bank operation</h2>
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

export default BankOperationEditForm;