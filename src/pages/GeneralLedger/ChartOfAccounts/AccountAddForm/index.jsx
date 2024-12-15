import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import Form from "../../../../components/Form";
import Field from "../../../../components/Field";
import { useAccounts } from "../../../../contexts/AccountContext";
import { useAuthenticatedApi } from "../../../../utils/api";

const AccountAddForm = () => {
  const { refetch } = useAccounts();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    parent_code: "",
    is_reserve: false,
    is_advance: false,
    cost_center: "",
    is_active: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const api = useAuthenticatedApi();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/chart-of-accounts", formData);
      refetch();
      navigate("/general-ledger/chart-of-accounts");
    } catch (err) {
      setError("Failed to create account");
      setLoading(false);
    }
  };

  return (
    <Page>
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/general-ledger/chart-of-accounts")}
        loading={loading}
        error={error}
        buttonPositiveName="Create account"
        buttonNegativeName="Cancel"
      >
        <h2>Create account</h2>
        <Field
          type="text"
          placeholder="Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          disabled={loading}
          required
        />
        <Field
          type="text"
          name="parent_code"
          value={formData.parent_code}
          onChange={handleChange}
          placeholder="Parent code"
          disabled={loading}
        />
        <Field
          type="text"
          name="cost_center"
          value={formData.cost_center}
          onChange={handleChange}
          placeholder="Cost center"
          disabled={loading}
        />
        <div className="checkbox-group">
          <label>
            <Field
              type="checkbox"
              name="is_reserve"
              checked={formData.is_reserve}
              onChange={handleChange}
              disabled={loading}
            />
            Reserve
          </label>
          <label>
            <Field
              type="checkbox"
              name="is_advance"
              checked={formData.is_advance}
              onChange={handleChange}
              disabled={loading}
            />
            Advance
          </label>
          <label>
            <Field
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              disabled={loading}
            />
            Active
          </label>
        </div>
      </Form>
    </Page>
  );
};

export default AccountAddForm;