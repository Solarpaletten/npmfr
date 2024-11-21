import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import { useAuthenticatedApi } from "../../../../utils/api";

import styles from "./index.module.css";
// operation_type: "purchase", // Тип операции (Покупка)

const PurchaseAddForm = () => {
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
      <div>
        <div className={styles.toolbar}>
          <Button onClick={handleSubmit}>Сохранить</Button>
          <Button onClick={() => navigate("/warehouse/purchases")}>
            Закрыть
          </Button>
          <Button>Распечатать</Button>
        </div>

        <div className={styles.content}>
          <div className={styles.tabs}>
            <div className={styles.tab}>Информация о счете</div>
            <div className={styles.tab}>Накладные расходы</div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.field}>
                <label>Склад *</label>
                <input
                  value={formData.warehouse}
                  onChange={(e) =>
                    setFormData({ ...formData, warehouse: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Поставщик *</label>
                <input
                  value={formData.supplier}
                  onChange={(e) =>
                    setFormData({ ...formData, supplier: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Дата документа *</label>
                <input
                  type="date"
                  value={formData.document_date}
                  onChange={(e) =>
                    setFormData({ ...formData, document_date: e.target.value })
                  }
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Серия</label>
                <input
                  value={formData.series}
                  onChange={(e) =>
                    setFormData({ ...formData, series: e.target.value })
                  }
                />
              </div>
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
    </Page>
    // <Form
    //   onSubmit={handleSubmit}
    //   onClose={() => onShowForm(false)}
    //   loading={loading}
    //   error={error}
    //   buttonPositiveName="Create purchase"
    //   buttonNegativeName="Cancel"
    // >
    //   <div>
    //     <h3>Основная информация</h3>
    //     <Field
    //       type="date"
    //       name="document_date"
    //       value={formData.document_date}
    //       onChange={handleChange}
    //       placeholder="Дата документа"
    //       disabled={loading}
    //       required
    //     />

    //     <Field
    //       type="text"
    //       name="invoice_number"
    //       value={formData.invoice_number}
    //       onChange={handleChange}
    //       placeholder="Номер накладной"
    //       disabled={loading}
    //       required
    //     />

    //     <Select
    //       name="operation_type"
    //       value={formData.operation_type}
    //       onChange={handleChange}
    //       label="Тип операции"
    //       options={[{ value: "purchase", label: "Покупка" }]}
    //       disabled={loading}
    //       required
    //     />
    //   </div>

    //   <div>
    //     <h3>Информация о поставщике</h3>
    //     <Field
    //       type="text"
    //       name="supplier"
    //       value={formData.supplier}
    //       onChange={handleChange}
    //       placeholder="Поставщик"
    //       disabled={loading}
    //       required
    //     />

    //     <Select
    //       name="currency"
    //       value={formData.currency}
    //       onChange={handleChange}
    //       label="Валюта"
    //       options={[{ value: "EUR", label: "EUR" }]}
    //       disabled={loading}
    //       required
    //     />
    //   </div>

    //   <div>
    //     <h3>Информация о товаре</h3>
    //     <Field
    //       type="text"
    //       name="product_code"
    //       value={formData.product_code}
    //       onChange={handleChange}
    //       placeholder="Код товара"
    //       disabled={loading}
    //       required
    //     />

    //     <Field
    //       type="text"
    //       name="product_name"
    //       value={formData.product_name}
    //       onChange={handleChange}
    //       placeholder="Название товара"
    //       disabled={loading}
    //       required
    //     />

    //     <Field
    //       type="number"
    //       step="0.001"
    //       name="quantity"
    //       value={formData.quantity}
    //       onChange={handleChange}
    //       placeholder="Количество"
    //       disabled={loading}
    //       required
    //     />

    //     <Field
    //       type="number"
    //       step="0.0001"
    //       name="price_per_unit"
    //       value={formData.price_per_unit}
    //       onChange={handleChange}
    //       placeholder="Цена за единицу"
    //       disabled={loading}
    //       required
    //     />
    //   </div>

    //   <div>
    //     <h3>Информация о НДС</h3>
    //     <Field
    //       type="number"
    //       name="vat_rate"
    //       value={formData.vat_rate}
    //       onChange={handleChange}
    //       placeholder="Ставка НДС %"
    //       disabled={loading}
    //     />

    //     <div>
    //       <div>Сумма без НДС: {formData.total_amount}</div>
    //       <div>НДС: {formData.vat_amount}</div>
    //       <div>
    //         Итого:{" "}
    //         {(
    //           parseFloat(formData.total_amount) +
    //           parseFloat(formData.vat_amount)
    //         ).toFixed(2)}
    //       </div>
    //     </div>
    //   </div>
    // </Form>
  );
};

export default PurchaseAddForm;
