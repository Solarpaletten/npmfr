// pages/Warehouse/components/Incoming/index.jsx
import React, { useState } from 'react';
import Button from '../../../../components/Button';
import styles from './index.module.css';

const Incoming = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    document_date: new Date().toISOString().split('T')[0],
    operation_type: 'Покупка',
    series: 'VP',
    number: '',
    warehouse: 'Товары',
    supplier: '',
    supplier_code: '',
    currency: 'EUR',
    payment_date: '',
    vat_rate: '0',
    positions: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <Button onClick={handleSubmit}>Сохранить</Button>
        <Button onClick={onClose}>Закрыть</Button>
        <Button>Распечатать</Button>
        <Button variant="danger">Удалить</Button>
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
                onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Поставщик *</label>
              <input
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Дата документа *</label>
              <input
                type="date"
                value={formData.document_date}
                onChange={(e) => setFormData({ ...formData, document_date: e.target.value })}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Серия</label>
              <input
                value={formData.series}
                onChange={(e) => setFormData({ ...formData, series: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, vat_rate: e.target.value })}
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
  );
};

export default Incoming;
