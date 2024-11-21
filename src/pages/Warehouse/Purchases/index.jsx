import React, { useState } from 'react';
import Button from '../../../components/Button';

import styles from './index.module.css';

const Purchases = ({ onSubmit, onClose }) => {
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

export default Purchases;
// import React, { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import Page from "../../../components/Page";
// import SearchField from "../../../components/SearchField";
// import { Table, Row, Cell } from "../../../components/Table";
// import Button from "../../../components/Button";
// import PurchaseAddForm from "./PurchaseAddForm";
// // import PurchaseDeleteForm from "./PurchaseDeleteForm";
// // import PurchaseEditForm from "./PurchaseEditForm";
// import { useAuthenticatedApi } from "../../../utils/api";
// import columns from "./columns";
// import {
//   faTrashCan,
//   faPenToSquare,
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";

// import styles from "./index.module.css";

// const Purchases = () => {
//   const api = useAuthenticatedApi();
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sort, setSort] = useState({ sort: "", order: "ASC" });

//   const [selectedPurchase, setSelectedPurchase] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showDeleteForm, setShowDeleteForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await api.get("/warehouse/purchases");

//       setPurchases(data);
//     } catch (error) {
//       setError("Failed to fetch purchases");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <Page error={error}>
//       <h1>Purchases</h1>

//       <div className={styles.toolbar}>
//         <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//         <Button icon={faPlus} onClick={() => setShowAddForm(true)}>
//           Create purchase
//         </Button>
//       </div>

//       <Table
//         columns={columns}
//         initialOrder={sort}
//         sort={setSort}
//         loading={loading}
//       >
//         {purchases.map((purchase) => (
//           <Row key={purchase.id}>
//             <Cell>{purchase.product_code || "-"}</Cell>
//             <Cell>{purchase.quantity || "-"}</Cell>
//             <Cell>{purchase.price_per_unit || "-"}</Cell>
//             <Cell>{purchase.client || "-"}</Cell>
//             <Cell>{new Date(purchase.document_date).toLocaleDateString()}</Cell>
//             <Cell>{purchase.invoice_number || "-"}</Cell>
//             <Cell>{purchase.payment_type || "-"}</Cell>
//             <Cell align="right">
//               <Button
//                 icon={faPenToSquare}
//                 onClick={() => {
//                   setShowEditForm(true);
//                   setSelectedPurchase(purchase);
//                 }}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="danger"
//                 icon={faTrashCan}
//                 onClick={() => {
//                   setShowDeleteForm(true);
//                   setSelectedPurchase(purchase);
//                 }}
//               >
//                 Delete
//               </Button>
//             </Cell>
//           </Row>
//         ))}
//       </Table>

//       {showAddForm &&
//         createPortal(
//           <PurchaseAddForm
//             onShowForm={setShowAddForm}
//             requery={() => fetchData({ searchTerm, ...sort })}
//           />,
//           document.body
//         )}
//     </Page>
//   );
// };

// export default Purchases;
