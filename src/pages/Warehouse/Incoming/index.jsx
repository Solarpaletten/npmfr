import React, { useState } from "react";
import { Modal, Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import Select from "../../../components/Select";
import ValidationError from "../../../components/ValidationError";
import { useAuthenticatedApi } from "../../../utils/api";

import styles from "./index.module.css";

const Incoming = ({ onClose }) => {
  const api = useAuthenticatedApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      await api.post("/warehouse/incoming", formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Form
        onSubmit={handleSubmit}
        onClose={onClose}
        loading={loading}
        error={error}
        buttonPositiveName="Создать поступление"
        buttonNegativeName="Отмена"
      >
        <div className={styles.formGrid}>
          <div className={styles.section}>
            <h3>Основная информация</h3>
            <Field
              type="date"
              name="document_date"
              value={formData.document_date}
              onChange={handleChange}
              label="Дата документа"
              required
            />

            <Field
              type="text"
              name="invoice_number"
              value={formData.invoice_number}
              onChange={handleChange}
              label="Номер накладной"
              required
            />

            <Select
              name="operation_type"
              value={formData.operation_type}
              onChange={handleChange}
              label="Тип операции"
              options={[{ value: "purchase", label: "Покупка" }]}
              required
            />
          </div>

          <div className={styles.section}>
            <h3>Информация о поставщике</h3>
            <Field
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              label="Поставщик"
              required
            />

            <Select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              label="Валюта"
              options={[{ value: "EUR", label: "EUR" }]}
              required
            />
          </div>

          {/* Информация о товаре */}
          <div className={styles.section}>
            <h3>Информация о товаре</h3>
            <Field
              type="text"
              name="product_code"
              value={formData.product_code}
              onChange={handleChange}
              label="Код товара"
              required
            />

            <Field
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              label="Название товара"
              required
            />

            <Field
              type="number"
              step="0.001"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              label="Количество"
              required
            />

            <Field
              type="number"
              step="0.0001"
              name="price_per_unit"
              value={formData.price_per_unit}
              onChange={handleChange}
              label="Цена за единицу"
              required
            />
          </div>

          {/* Информация о НДС */}
          <div className={styles.section}>
            <h3>Информация о НДС</h3>
            <Field
              type="number"
              name="vat_rate"
              value={formData.vat_rate}
              onChange={handleChange}
              label="Ставка НДС %"
            />

            {/* Отображение расчетных полей */}
            <div className={styles.calculations}>
              <div>Сумма без НДС: {formData.total_amount}</div>
              <div>НДС: {formData.vat_amount}</div>
              <div className={styles.total}>
                Итого:{" "}
                {(
                  parseFloat(formData.total_amount) +
                  parseFloat(formData.vat_amount)
                ).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <ValidationError error={error} />
      </Form>
    </Modal>
  );
};

export default Incoming;
