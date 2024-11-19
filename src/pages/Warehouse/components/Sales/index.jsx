// pages/Warehouse/components/Sales/index.jsx
import React, { useState } from 'react';
import { Modal, Form } from '../../../../components/Modal';
import Field from '../../../../components/Field';
import Select from '../../../../components/Select';
import ValidationError from '../../../../components/ValidationError';
import { useAuthenticatedApi } from '../../../../utils/api';

import styles from './index.module.css';

function Sales({ onClose }) {
  const api = useAuthenticatedApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    product_code: '', // Код товара
    quantity: '', // Количество
    price_per_unit: '', // Цена продажи
    client: '', // Клиент
    document_date: new Date().toISOString().split('T')[0], // Дата документа
    invoice_number: '', // Номер накладной
    currency: 'EUR', // Валюта
    vat_rate: '0', // Ставка НДС
    vat_amount: '0', // Сумма НДС
    payment_type: 'cash', // Тип оплаты
    warehouse: 'main', // Склад
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Автоматический расчет НДС и общей суммы
      if (name === 'quantity' || name === 'price_per_unit' || name === 'vat_rate') {
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
      await api.post('/warehouse/sales', formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Расчет итоговых сумм
  const subtotal =
    (parseFloat(formData.quantity) || 0) * (parseFloat(formData.price_per_unit) || 0);
  const vatAmount = parseFloat(formData.vat_amount) || 0;
  const total = subtotal + vatAmount;

  return (
    <Modal>
      <Form
        onSubmit={handleSubmit}
        onClose={onClose}
        loading={loading}
        error={error}
        buttonPositiveName="Создать продажу"
        buttonNegativeName="Отмена"
      >
        <div className={styles.formGrid}>
          {/* Основная информация */}
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
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              label="Склад"
              options={[{ value: 'main', label: 'Основной склад' }]}
              required
            />
          </div>

          {/* Информация о клиенте */}
          <div className={styles.section}>
            <h3>Информация о клиенте</h3>
            <Field
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              label="Клиент"
              required
            />

            <Select
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
              label="Тип оплаты"
              options={[
                { value: 'cash', label: 'Наличные' },
                { value: 'card', label: 'Карта' },
                { value: 'transfer', label: 'Перевод' },
              ]}
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
              label="Цена продажи"
              required
            />
          </div>

          {/* Информация о НДС */}
          <div className={styles.section}>
            <h3>Дополнительная информация</h3>
            <Select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              label="Валюта"
              options={[{ value: 'EUR', label: 'EUR' }]}
              required
            />

            <Field
              type="number"
              name="vat_rate"
              value={formData.vat_rate}
              onChange={handleChange}
              label="Ставка НДС %"
            />

            {/* Отображение расчетных полей */}
            <div className={styles.calculations}>
              <div>Сумма без НДС: {subtotal.toFixed(2)}</div>
              <div>НДС: {vatAmount.toFixed(2)}</div>
              <div className={styles.total}>Итого: {total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <ValidationError error={error} />
      </Form>
    </Modal>
  );
}

export default Sales;
