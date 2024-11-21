import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import { useAuthenticatedApi } from "../../../../utils/api";

const SaleAddForm = () => {
  const [formData, setFormData] = useState({
    product_code: "",
    quantity: "",
    price_per_unit: "", // Цена продажи
    client: "", // Клиент
    document_date: new Date().toISOString().split("T")[0], // Дата документа
    invoice_number: "", // Номер накладной
    currency: "EUR",
    vat_rate: "0", // Ставка НДС
    vat_amount: "0", // Сумма НДС
    payment_type: "cash", // Тип оплаты
    warehouse: "main", // Склад
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api = useAuthenticatedApi();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Автоматический расчет НДС и общей суммы
      if (
        name === "quantity" ||
        name === "price_per_unit" ||
        name === "vat_rate"
      ) {
        const quantity = parseFloat(newData.quantity) || 0;
        const pricePerUnit = parseFloat(newData.price_per_unit) || 0;
        const vatRate = parseFloat(newData.vat_rate) || 0;

        const subtotal = quantity * pricePerUnit;
        newData.vat_amount = (subtotal * (vatRate / 100)).toFixed(2);
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post("/warehouse/sales", formData);

      navigate("/warehouse/sales")
    } catch (err) {
      setError("Failed to create invoice");
      setLoading(false);
    }
  };

  const subtotal =
    (parseFloat(formData.quantity) || 0) *
    (parseFloat(formData.price_per_unit) || 0);
  const vatAmount = parseFloat(formData.vat_amount) || 0;
  const total = subtotal + vatAmount;

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
        <div>
          <h3>Основная информация</h3>
          <Field
            type="date"
            placeholder="Дата документа"
            name="document_date"
            value={formData.document_date}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Field
            type="text"
            placeholder="Номер накладной"
            name="invoice_number"
            value={formData.invoice_number}
            onChange={handleChange}
            disabled={loading}
            required
          />

          <Select
            name="warehouse"
            value={formData.warehouse}
            onChange={handleChange}
            placeholder="Склад"
            options={[{ value: "main", label: "Основной склад" }]}
            disabled={loading}
            required
          />
        </div>

        <div>
          <h3>Информация о клиенте</h3>
          <Field
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Клиент"
            disabled={loading}
            required
          />

          <Select
            label="Тип оплаты"
            name="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
            options={[
              { value: "cash", label: "Наличные" },
              { value: "card", label: "Карта" },
              { value: "transfer", label: "Перевод" },
            ]}
            disabled={loading}
            required
          />
        </div>

        <div>
          <h3>Информация о товаре</h3>
          <Field
            type="text"
            name="product_code"
            value={formData.product_code}
            onChange={handleChange}
            placeholder="Код товара"
            disabled={loading}
            required
          />

          <Field
            type="number"
            step="0.001"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Количество"
            disabled={loading}
            required
          />

          <Field
            type="number"
            step="0.0001"
            name="price_per_unit"
            value={formData.price_per_unit}
            onChange={handleChange}
            placeholder="Цена продажи"
            disabled={loading}
            required
          />
        </div>

        <div>
          <h3>Дополнительная информация</h3>
          <Select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            label="Валюта"
            options={[{ value: "EUR", label: "EUR" }]}
            disabled={loading}
            required
          />

          <Field
            type="number"
            name="vat_rate"
            value={formData.vat_rate}
            onChange={handleChange}
            placeholder="Ставка НДС %"
            disabled={loading}
          />

          <div>
            <div>Сумма без НДС: {subtotal.toFixed(2)}</div>
            <div>НДС: {vatAmount.toFixed(2)}</div>
            <div>Итого: {total.toFixed(2)}</div>
          </div>
        </div>
      </Form>
    </Page>
  );
};

export default SaleAddForm;
