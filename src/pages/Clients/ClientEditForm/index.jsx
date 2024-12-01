import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../../components/Page";
import { Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import { useClients } from "../../../contexts/ClientContext";
import { useAuthenticatedApi } from "../../../utils/api";

const ClientEditForm = () => {
  const { refetch } = useClients();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    vat_code: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = useAuthenticatedApi();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get(`/clients/${id}`);

      setFormData(data);
    } catch (error) {
      setError("Failed to fetch client");
    } finally {
      setLoading(false);
    }
  }, [id, api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
      await api.put(`/clients/${id}`, formData);

      refetch();
      navigate("/clients");
    } catch (err) {
      setError("Failed to update client");
      setLoading(false);
    }
  };

  return (
    <Page>
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/clients")}
        loading={loading}
        error={error}
        buttonPositiveName="Save changes"
        buttonNegativeName="Cancel"
      >
        <h2>Edit client</h2>
        <Field
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          disabled={loading}
          required
        />
        <Field
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          disabled={loading}
          required
        />
        <Field
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Code"
          disabled={loading}
          required
        />
        <Field
          type="text"
          name="vat_code"
          value={formData.vat_code}
          onChange={handleChange}
          placeholder="VAT code"
          disabled={loading}
          required
        />
      </Form>
    </Page>
  );
};

export default ClientEditForm;
