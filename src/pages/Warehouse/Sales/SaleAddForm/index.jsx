import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import SaleCalculatorTable from "../SaleCalculatorTable";
import { useClients } from "../../../../contexts/ClientContext";
import { useWarehouse } from "../../../../contexts/WarehouseContext";
import { useAuthenticatedApi } from "../../../../utils/api";

const SaleAddForm = () => {
  const { clients, loading: clientsLoading } = useClients();
  const { warehouses, loading: warehousesLoading } = useWarehouse();

  const [formData, setFormData] = useState({
    invoice_type: "sale",
    invoice_number: "",
    sale_date: new Date().toISOString().split("T")[0],
    warehouse_id: "",
    buyer_id: "",
    client_id: "", // TODO add info about client with user
    currency: "EUR",
    total_amount: (0).toFixed(2),
    vat_amount: (0).toFixed(2),
    vat_rate: (0).toFixed(2),
    products: [],
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
      await api.post("/warehouse/sales", formData);

      navigate("/warehouse/sales");
    } catch (err) {
      setError("Failed to create invoice");
      setLoading(false);
    }
  };

  return (
    <Page>
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/warehouse/sales")}
        loading={loading}
        error={error}
        buttonPositiveName="Create invoice"
        buttonNegativeName="Cancel"
      >
        <h2>Create invoice</h2>

        <Button>Распечатать</Button>

        <Select
          label="Invoice type"
          name="invoice_type"
          value={formData.invoice_type}
          onChange={handleChange}
          options={[
            {
              value: "",
              label: "-- select option --",
            },
            {
              value: "sale",
              label: "Sale",
            },
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
          value={formData.sale_date}
          onChange={handleChange}
          placeholder="Sale date"
          disabled={loading}
          required
        />

        <Select
          label="Warehouse"
          name="warehouse_id"
          value={formData.warehouse_id}
          onChange={handleChange}
          options={[
            {
              value: "",
              label: "-- select option --",
            },
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
            {
              value: "",
              label: "-- select option --",
            },
            ...clients.map(({ id, name }) => ({
              value: id,
              label: name,
            })),
          ]}
          disabled={loading || clientsLoading}
          required
        />

        <div>
          <b>Seller/Sender: </b>{"TODO Name of the current company"}
        </div>

        <Select
          label="Currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          options={[
            {
              value: "USD",
              label: "USD",
            },
            {
              value: "EUR",
              label: "EUR",
            },
          ]}
          disabled={loading}
          required
        />
        <SaleCalculatorTable
          data={formData}
          setData={setFormData}
          loading={loading}
        />
      </Form>
    </Page>
  );
};

export default SaleAddForm;
