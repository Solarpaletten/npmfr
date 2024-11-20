// pages/Warehouse/components/Sales/index.jsx
import React, { useState } from 'react';
import { Modal, Form } from '../../../components/Modal';
import Field from '../../../components/Field';
import Select from '../../../components/Select';
import ValidationError from '../../../components/ValidationError';
import { useAuthenticatedApi } from '../../../utils/api';

import styles from "./index.module.css";

const Sales = () => {
  const api = useAuthenticatedApi();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get("/warehouse/sales");

      setSales(data);
    } catch (error) {
      setError("Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page error={error}>
      <h1>Sales</h1>

      <div className={styles.toolbar}>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button icon={faPlus} onClick={() => setShowAddForm(true)}>
          Create invoice
        </Button>
      </div>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={setSort}
        loading={loading}
      >
        {sales.map((purchase) => (
          <Row key={purchase.id}>
            <Cell>{purchase.product_code || "-"}</Cell>
            <Cell>{purchase.quantity || "-"}</Cell>
            <Cell>{purchase.price_per_unit || "-"}</Cell>
            <Cell>{purchase.client || "-"}</Cell>
            <Cell>{new Date(purchase.document_date).toLocaleDateString()}</Cell>
            <Cell>{purchase.invoice_number || "-"}</Cell>
            <Cell>{purchase.payment_type || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => {
                  setShowEditForm(true);
                  setSelectedPurchase(purchase);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={faTrashCan}
                onClick={() => {
                  setShowDeleteForm(true);
                  setSelectedPurchase(purchase);
                }}
              >
                Delete
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showAddForm &&
        createPortal(
          <SaleAddForm
            onShowForm={setShowAddForm}
            requery={() => fetchData({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
};

export default Sales;
