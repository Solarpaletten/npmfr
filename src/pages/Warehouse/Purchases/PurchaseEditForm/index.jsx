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

const PurchaseEditForm = () => {
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
    invoice_type: "purchase",
    invoice_number: "",
    purchase_date: new Date().toISOString().split("T")[0],
    warehouse_id: "",
    supplier_id: "",
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
        const data = await api.get(`/warehouse/purchases/${id}`);

        setFormData(data);
      } catch (error) {
        setError("Failed to fetch purchase data");
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
      await api.put(`/warehouse/purchases/${id}`, form);
      navigate("/warehouse/purchases");
    } catch (err) {
      setError("Failed to update purchase");
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
        onClose={() => navigate("/warehouse/purchases")}
        loading={loading}
        error={error}
        buttonPositiveName="Save changes"
        buttonNegativeName="Cancel"
      >
        <h2>Edit Purchase</h2>

        <Button>Print</Button>

        <Select
          label="Invoice type"
          name="invoice_type"
          value={formData.invoice_type}
          onChange={handleChange}
          options={[
            { value: "", label: "-- select option --" },
            { value: "purchase", label: "Purchase" },
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
          value={formatDate(formData.purchase_date)}
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
          label="Supplier/Partner"
          name="supplier_id"
          value={formData.supplier_id}
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
          <b>Buyer/Payer: </b>
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

export default PurchaseEditForm;
