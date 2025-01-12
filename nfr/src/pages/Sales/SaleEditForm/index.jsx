import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../../components/Page";
import { Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import ProductCalculatorTable from "../../../pages/Warehouse/ProductCalculatorTable";
import { useClients } from "../../../contexts/ClientContext";
import { useSales } from "../../../contexts/SaleContext"; 
import { useAuthenticatedApi } from "../../../utils/api";

const SaleEditForm = () => {
  const { id } = useParams();
  const api = useAuthenticatedApi();
  const { clients, loading: clientsLoading } = useClients();
  const { sales, loading: salesLoading } = useSales();
  
  // eslint-disable-next-line no-unused-vars
  const [mainCompany, setMainCompany] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invoice_type: "sale",
    invoice_number: "",
    sale_date: "",
    warehouse_id: "",
    buyer_id: "",
    client_id: "",
    currency: "EUR",
    total_amount: (0).toFixed(2),
    vat_amount: (0).toFixed(2), 
    vat_rate: (0).toFixed(2),
    products: null
  });

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await api.get(`/sales/${id}`);
        setFormData(response.data);
      } catch (error) {
        setError("Failed to fetch sale");
      }
    };

    if (id) {
      fetchSale();
    }
  }, [id, api]);

  useEffect(() => {
    if (clients?.length) {
      const main = clients.find((client) => client.is_main);
      
      setMainCompany(main);
      if (!formData.client_id) {
        setFormData(prevData => ({
          ...prevData,
          client_id: main?.id?.toString() || ""
        }));
      }
    }
  }, [clients, formData.client_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put(`/sales/${id}`, form);
      navigate("/sales");
    } catch (err) {
      setError("Failed to update sale");
      setLoading(false);
    }
  };

  const setDataCallback = (data) => {
    setForm(data);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Page>
      <h2>Edit Sale</h2>
      <Button disabled>Print</Button>
      
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/sales")}
        loading={loading}
        error={error}
        buttonPositiveName="Update Sale"
        buttonNegativeName="Cancel"
        fullscreen
      >
        <div>
          <Select
            label="Invoice Type"
            name="invoice_type"
            value={formData.invoice_type}
            onChange={handleChange}
            options={[
              { value: "", label: "-- select option --" },
              { value: "sale", label: "Sale" }
            ]}
            disabled={loading}
            required
          />

          <Field
            type="text"
            label="Series/Number" 
            placeholder="Series/number"
            name="invoice_number"
            value={formData.invoice_number}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Field
            type="date"
            label="Sale Date"
            name="sale_date" 
            value={formData.sale_date}
            onChange={handleChange}
            placeholder="Sale date"
            disabled={loading}
            required
          />
        </div>

        <div>
          <Select
            label="Seller/Partner"
            name="client_id"
            value={formData.client_id}
            onChange={handleChange}
            options={[
              { value: "", label: "-- select option --" },
              ...clients.map(({ id, name }) => ({
                value: id,
                label: name
              }))
            ]}
            disabled={loading || clientsLoading}
            required
          />

          <Select
            label="Buyer"
            name="buyer_id"
            value={formData.buyer_id}
            onChange={handleChange}
            options={[
              { value: "", label: "-- select option --" },
              ...clients.map(({ id, name }) => ({
                value: id,
                label: name
              }))
            ]}
            disabled={loading || clientsLoading}
            required
          />
        </div>

        <div>
          <Select
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange} 
            options={[
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" }
            ]}
            disabled={loading}
            required
          />

          <Select
            label="Warehouse"
            name="warehouse_id"
            value={formData.warehouse_id}
            onChange={handleChange}
            options={[
              { value: "", label: "-- select option --" },
              ...sales.map(({ id, name }) => ({
                value: id,
                label: name  
              }))
            ]}
            disabled={loading || salesLoading}
            required
          />
        </div>

        <ProductCalculatorTable
          setData={setDataCallback}
          loading={loading}
          data={formData}
        />

      </Form>
    </Page>
  );
};

export default SaleEditForm;