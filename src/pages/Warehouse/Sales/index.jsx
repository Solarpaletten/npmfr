import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import SaleDeleteForm from "./SaleDeleteForm";
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

  const [selectedSale, setSelectedSale] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const navigate = useNavigate();

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
        <Button
          icon={faPlus}
          onClick={() => navigate("/warehouse/sales/create")}
        >
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
            <Cell>{new Date(sale.sale_date).toLocaleDateString()} {sale.id}</Cell>
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
                onClick={() => navigate(`/warehouse/sales/edit/${sale.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={faTrashCan}
                onClick={() => {
                  setShowDeleteForm(true);
                  setSelectedSale(sale);
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
          <SaleDeleteForm
            selectedSale={selectedSale}
            onShowForm={setShowDeleteForm}
            requery={() => fetchData({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
};

export default Sales;
