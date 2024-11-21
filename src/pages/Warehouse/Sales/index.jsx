import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import SaleAddForm from "./SaleAddForm";
// import SaleDeleteForm from "./SaleDeleteForm";
// import SaleEditForm from "./SaleEditForm";
import { useAuthenticatedApi } from "../../../utils/api";
import columns from "./columns";
import {
  faTrashCan,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

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
        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          disabled
        />
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
        {sales.map((sale) => (
          <Row key={sale.id}>
            <Cell>{new Date(sale.sale_date).toLocaleDateString()}</Cell>
            <Cell>{sale.client || "-"}</Cell>
            <Cell>{sale.warehouse || "-"}</Cell>
            <Cell>{sale.buyer || "-"}</Cell>
            <Cell>{sale.invoice_number || "-"}</Cell>
            <Cell>{sale.operation_type || "-"}</Cell>
            <Cell>{sale.vat_rate || "-"}</Cell>
            <Cell>{sale.total_amount || "-"}</Cell>{" "}
            <Cell>{sale.currency || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => {
                  setShowEditForm(true);
                  setSelectedPurchase(sale);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={faTrashCan}
                onClick={() => {
                  setShowDeleteForm(true);
                  setSelectedPurchase(sale);
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
