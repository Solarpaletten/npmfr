import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import ProductCalculatorTable from "../../ProductCalculatorTable";
import { useClients } from "../../../../contexts/ClientContext";
import { useWarehouse } from "../../../../contexts/WarehouseContext";
import { useAuthenticatedApi } from "../../../../utils/api";
import { formatDate } from "../../../../utils";

const SaleEditForm = () => {
  const api = useAuthenticatedApi();
  const { clients, loading: clientsLoading } = useClients();
  const { warehouses, loading: warehousesLoading } = useWarehouse();

  const [mainCompany, setMainCompany] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invoice_type: "sale",
    invoice_number: "",
    sale_date: new Date().toISOString().split("T")[0],
    warehouse_id: "",
    buyer_id: "",
    client_id: "",
    currency: "EUR",
    total_amount: "0.00",
    vat_amount: "0.00",
    vat_rate: "0.00",
    products: null,
  });

  useEffect(() => {
    if (clients?.length) {
      const main = clients.find((client) => client.is_main);

      setMainCompany(main);
      setFormData((prevData) => ({
        ...prevData,
        client_id: main?.id?.toString() || "",
      }));
    }
  }, [clients]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.get(`/warehouse/sales/${id}`);

        setFormData(data);
      } catch (error) {
        setError("Failed to fetch invoice data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      await api.put(`/warehouse/sales/${id}`, form);
      navigate("/warehouse/sales");
    } catch (err) {
      setError("Failed to update invoice");
    } finally {
      setLoading(false);
    }
  };

  const setDataCallback = (data) => {
    setForm(data);
  };

  return (
    <Page>
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/warehouse/sales")}
        loading={loading}
        error={error}
        buttonPositiveName="Save changes"
        buttonNegativeName="Cancel"
      >
        <h2>Edit Invoice</h2>

        <Button>Print</Button>

        <Select
          label="Invoice type"
          name="invoice_type"
          value={formData.invoice_type}
          onChange={handleChange}
          options={[
            { value: "", label: "-- select option --" },
            { value: "sale", label: "Sale" },
          ]}
          disabled={loading}
          required
        />
        <Field
          type="text"
          placeholder="Series/number"
          name="invoice_number"
          value={formData.invoice_number}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="date"
          name="sale_date"
          value={formatDate(formData.sale_date)}
          onChange={handleChange}
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
            ...warehouses.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          ]}
          disabled={loading || warehousesLoading}
          required
        />

        <Select
          label="Buyer/Payer"
          name="buyer_id"
          value={formData.buyer_id}
          onChange={handleChange}
          options={[
            { value: "", label: "-- select option --" },
            ...clients.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          ]}
          disabled={loading || clientsLoading}
          required
        />

        <div>
          <b>Seller/Sender: </b>
          <b>{clientsLoading ? "-" : mainCompany?.name}</b>
        </div>

        <Select
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          options={[
            { value: "USD", label: "USD" },
            { value: "EUR", label: "EUR" },
          ]}
          disabled={loading}
          required
        />

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
