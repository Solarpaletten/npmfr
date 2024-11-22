import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import ProductCalculatorTable from "../ProductCalculatorTable";
import { useClients } from "../../../../contexts/ClientContext";
import { useWarehouse } from "../../../../contexts/WarehouseContext";
import { useAuthenticatedApi } from "../../../../utils/api";

const PurchaseAddForm = () => {
  const { clients, loading: clientsLoading } = useClients();
  const { warehouses, loading: warehousesLoading } = useWarehouse();
  const mainCompany = clients?.find((client) => client.is_main);

  const [formData, setFormData] = useState({
    invoice_type: "purchase",
    invoice_number: "",
    purchase_date: new Date().toISOString().split("T")[0],
    warehouse_id: "",
    supplier_id: "",
    client_id: mainCompany?.id.toString(),
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
      await api.post("/warehouse/purchases", formData);

      navigate("/warehouse/purchases");
    } catch (err) {
      setError("Failed to create purchase");
      setLoading(false);
    }
  };

  return (
    <Page>
      <Form
        onSubmit={handleSubmit}
        onClose={() => navigate("/warehouse/purchases")}
        loading={loading}
        error={error}
        buttonPositiveName="Create purchase"
        buttonNegativeName="Cancel"
      >
        <h2>Create purchase</h2>

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
              value: "purchase",
              label: "Purchase",
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
          name="purchase_date"
          value={formData.purchase_date}
          onChange={handleChange}
          placeholder="Purchase date"
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
          label="Supplier/Partner"
          name="supplier_id"
          value={formData.supplier_id}
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
          <b>Buyer/Payer: </b>
          <b>{clientsLoading ? "-" : mainCompany?.name}</b>
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

        <ProductCalculatorTable
          data={formData}
          setData={setFormData}
          loading={loading}
        />
      </Form>
    </Page>
  );
};

export default PurchaseAddForm;
