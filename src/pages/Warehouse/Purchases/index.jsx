import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import PurchaseDeleteForm from "./PurchaseDeleteForm";
import { useAuthenticatedApi } from "../../../utils/api";
import columns from "./columns";
import {
  faTrashCan,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

const Purchases = () => {
  const api = useAuthenticatedApi();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });

  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get("/warehouse/purchases");

      setPurchases(data);
    } catch (error) {
      setError("Failed to fetch purchases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page error={error}>
      <h1>Purchases</h1>

      <div className={styles.toolbar}>
        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          disabled
        />
        <Button
          icon={faPlus}
          onClick={() => navigate(`/warehouse/purchases/create`)}
        >
          Create purchase
        </Button>
      </div>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={setSort}
        loading={loading}
      >
        {purchases.map((purchase) => (
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
                onClick={() =>
                  navigate(`/warehouse/purchases/edit/${purchase.id}`)
                }
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

      {showDeleteForm &&
        createPortal(
          <PurchaseDeleteForm
            selectedPurchase={selectedPurchase}
            onShowForm={setShowDeleteForm}
            requery={() => fetchData({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
};

export default Purchases;
