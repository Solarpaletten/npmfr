import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import Toolbar from "../../components/Toolbar";
import SearchField from "../../components/SearchField";
import { Table, Row, Cell } from "../../components/Table";
import Button from "../../components/Button";
import SaleCopyForm from "./SaleCopyForm";
import SaleDeleteForm from "./SaleDeleteForm";
import { useAuthenticatedApi } from "../../utils/api";
import columns from "./columns";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Sales = () => {
  const api = useAuthenticatedApi();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });

  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const selectedSales = sales?.filter((sale) => selected.includes(sale.id));
  const selectedSalesQty = selectedSales?.length;

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get("/sales");

      setSales(data);
    } catch (error) {
      setError("Failed to fetch sales");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (allSelected) {
      setSelected(sales.map((sale) => sale.id));
    } else {
      setSelected([]);
    }
  }, [allSelected, sales]);

  const handleSelectAll = () => {
    setAllSelected((prev) => !prev);
  };

  const handleSelect = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item_id) => item_id !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Page error={error}>
      <h1>Sales</h1>

      <Toolbar>
        <div>
          <Button
            icon={faPlus}
            onClick={() => navigate("/sales/create")}
            disabled={loading}
          >
            Create invoice
          </Button>
          <Button
            icon={faCopy}
            onClick={() => {
              setShowCopyForm(true);
            }}
            disabled={!selectedSalesQty || loading}
          >
            Copy
            {selectedSalesQty ? ` ${selectedSalesQty} item(s)` : ""}
          </Button>
          <Button
            variant="danger"
            icon={faTrashCan}
            onClick={() => {
              setShowDeleteForm(true);
            }}
            disabled={!selectedSalesQty || loading}
          >
            Delete
            {selectedSalesQty ? ` ${selectedSalesQty} item(s)` : ""}
          </Button>
        </div>

        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          disabled
        />
      </Toolbar>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={setSort}
        loading={loading}
        allSelected={allSelected}
        toggleSelectAll={handleSelectAll}
      >
        {sales.map((sale) => (
          <Row
            key={sale.id}
            onSelect={() => handleSelect(sale.id)}
            isSelected={selected.includes(sale.id)}
          >
            <Cell>{new Date(sale.sale_date).toLocaleDateString()}</Cell>
            <Cell>{sale.client || "-"}</Cell>
            <Cell>{sale.warehouse || "-"}</Cell>
            <Cell>{sale.buyer || "-"}</Cell>
            <Cell>{sale.invoice_number || "-"}</Cell>
            <Cell>{sale.invoice_type || "-"}</Cell>
            <Cell>{sale.vat_rate || "-"}</Cell>
            <Cell>{sale.vat_amount || "-"}</Cell>
            <Cell>{sale.total_amount || "-"}</Cell>
            <Cell>{sale.currency || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => navigate(`/sales/edit/${sale.id}`)}
              >
                Edit
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showCopyForm &&
        createPortal(
          <SaleCopyForm
            selected={selectedSales}
            setSelected={() => {
              setSelected([]);
              setAllSelected(false);
            }}
            onShowForm={setShowCopyForm}
            requery={() => fetchData({ searchTerm, ...sort })}
          />,
          document.body
        )}
      {showDeleteForm &&
        createPortal(
          <SaleDeleteForm
            selected={selectedSales}
            setSelected={() => {
              setSelected([]);
              setAllSelected(false);
            }}
            onShowForm={setShowDeleteForm}
            requery={() => fetchData({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
};

export default Sales;
