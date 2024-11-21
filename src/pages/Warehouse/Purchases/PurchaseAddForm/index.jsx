import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import { useClients } from "../../../../contexts/ClientContext";
import { useWarehouse } from "../../../../contexts/WarehouseContext";

import { useAuthenticatedApi } from "../../../../utils/api";

import styles from "./index.module.css";
// operation_type: "purchase", // Тип операции (Покупка)

const PurchaseAddForm = () => {
  const { clients } = useClients(); // Access clients data
  const { warehouses } = useWarehouse(); // Access clients data

  const [formData, setFormData] = useState({
    total_amount: "", // Общая сумма (5000.00)
    supplier: "", // Поставщик (Leanid Kanoplich)
    currency: "EUR", // Валюта (EUR)
    document_date: new Date().toISOString().split("T")[0], // Дата документа
    invoice_number: "", // Номер накладной

    vat_rate: "0", // Ставка НДС
    vat_amount: "0", // Сумма НДС
  });
  // for table to add products
  // product_id
  // quantity
  // product_name
  // product_code
  // price_per_unit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = useAuthenticatedApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (
        name === "quantity" ||
        name === "price_per_unit" ||
        name === "vat_rate"
      ) {
        const quantity = parseFloat(newData.quantity) || 0;
        const pricePerUnit = parseFloat(newData.price_per_unit) || 0;
        const vatRate = parseFloat(newData.vat_rate) || 0;

        const subtotal = quantity * pricePerUnit;
        const vatAmount = subtotal * (vatRate / 100);

        newData.total_amount = subtotal.toFixed(2);
        newData.vat_amount = vatAmount.toFixed(2);
      }

      return newData;
    });
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
        <div>
          <div className={styles.toolbar}>
            <Button>Распечатать</Button>
          </div>

          <div className={styles.content}>
            <div className={styles.formGrid}>
              <div className={styles.leftColumn}>
                <Select
                  label="Invoice type"
                  name="invoice_type"
                  value={formData.warehouse}
                  onChange={handleChange}
                  options={[
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
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Purchase date"
                  disabled={loading}
                  required
                />

                <Select
                  label="Warehouse"
                  name="warehouse_id"
                  value={formData.warehouse}
                  onChange={handleChange}
                  options={warehouses.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  disabled={loading}
                  required
                />

                <Select
                  label="Supplier/Partner"
                  name="supplier_id"
                  value={formData.supplier}
                  onChange={handleChange}
                  options={clients.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  disabled={loading}
                  required
                />
              </div>

              <div className={styles.rightColumn}>
                <div className={styles.summary}>
                  <div className={styles.field}>
                    <label>НДС %</label>
                    <input
                      type="number"
                      value={formData.vat_rate}
                      onChange={(e) =>
                        setFormData({ ...formData, vat_rate: e.target.value })
                      }
                    />
                  </div>

                  <div className={styles.totals}>
                    <div>Сумма без НДС: 0.00</div>
                    <div>НДС: 0.00</div>
                    <div>Всего с НДС: 0.00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.positions}>
              <h3>Позиции покупки</h3>
              <table className={styles.positionsTable}>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Товар</th>
                    <th>Код</th>
                    <th>Единицы</th>
                    <th>Количество</th>
                    <th>Цена без НДС</th>
                    <th>Сумма без НДС</th>
                    <th>НДС</th>
                  </tr>
                </thead>
                <tbody>{/* Позиции */}</tbody>
              </table>
            </div>
          </div>
        </div>
      </Form>
    </Page>
  );
};

export default PurchaseAddForm;
