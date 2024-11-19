import React, { useState } from "react";
import { Modal, Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import { useAuthenticatedApi } from "../../../../utils/api";

const PurchaseAddForm = ({ onShowForm, requery }) => {
  const [formData, setFormData] = useState({
    product_code: "", // Код товара (VP 00100)
    product_name: "", // Название товара
    quantity: "", // Количество (10.000)
    price_per_unit: "", // Цена за единицу (500.0000)
    total_amount: "", // Общая сумма (5000.00)
    supplier: "", // Поставщик (Leanid Kanoplich)
    currency: "EUR", // Валюта (EUR)
    document_date: new Date().toISOString().split("T")[0], // Дата документа
    invoice_number: "", // Номер накладной
    operation_type: "purchase", // Тип операции (Покупка)
    vat_rate: "0", // Ставка НДС
    vat_amount: "0", // Сумма НДС
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      
      requery();
      // setFormData({ username: "", email: "", role: "standard" });
      onShowForm(false);
    } catch (err) {
      setError("Failed to create purchase");
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Form
        onSubmit={handleSubmit}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName="Create purchase"
        buttonNegativeName="Cancel"
      >
        <div>
          <h3>Основная информация</h3>
          <Field
            type="date"
            name="document_date"
            value={formData.document_date}
            onChange={handleChange}
            placeholder="Дата документа"
            disabled={loading}
            required
          />

          <Field
            type="text"
            name="invoice_number"
            value={formData.invoice_number}
            onChange={handleChange}
            placeholder="Номер накладной"
            disabled={loading}
            required
          />

          <Select
            name="operation_type"
            value={formData.operation_type}
            onChange={handleChange}
            label="Тип операции"
            options={[{ value: "purchase", label: "Покупка" }]}
            disabled={loading}
            required
          />
        </div>

        <div>
          <h3>Информация о поставщике</h3>
          <Field
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            placeholder="Поставщик"
            disabled={loading}
            required
          />

          <Select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            label="Валюта"
            options={[{ value: "EUR", label: "EUR" }]}
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
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="Название товара"
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
            placeholder="Цена за единицу"
            disabled={loading}
            required
          />
        </div>

        <div>
          <h3>Информация о НДС</h3>
          <Field
            type="number"
            name="vat_rate"
            value={formData.vat_rate}
            onChange={handleChange}
            placeholder="Ставка НДС %"
            disabled={loading}
          />

          <div>
            <div>Сумма без НДС: {formData.total_amount}</div>
            <div>НДС: {formData.vat_amount}</div>
            <div>
              Итого:{" "}
              {(
                parseFloat(formData.total_amount) +
                parseFloat(formData.vat_amount)
              ).toFixed(2)}
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default PurchaseAddForm;
