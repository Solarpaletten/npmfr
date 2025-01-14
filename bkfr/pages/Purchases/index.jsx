import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import PurchaseCopyForm from "./PurchaseCopyForm";
import PurchaseDeleteForm from "./PurchaseDeleteForm";
import { useAuthenticatedApi } from "../../../utils/api";
import columns from "./columns";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Purchases = () => {
  const api = useAuthenticatedApi();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });

  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const selectedPurchases = purchases?.filter((purchase) =>
    selected.includes(purchase.id)
  );
  const selectedPurchasesQty = selectedPurchases?.length;

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
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
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (allSelected) {
      setSelected(purchases.map((purchase) => purchase.id));
    } else {
      setSelected([]);
    }
  }, [allSelected, purchases]);

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
      <h1>Purchases</h1>

      <Toolbar>
        <div>
          <Button
            icon={faPlus}
            onClick={() => navigate(`/warehouse/purchases/create`)}
            disabled={loading}
          >
            Create purchase
          </Button>
          <Button
            icon={faCopy}
            onClick={() => {
              setShowCopyForm(true);
            }}
            disabled={!selectedPurchasesQty || loading}
          >
            Copy
            {selectedPurchasesQty ? ` ${selectedPurchasesQty} item(s)` : ""}
          </Button>
          <Button
            variant="danger"
            icon={faTrashCan}
            onClick={() => {
              setShowDeleteForm(true);
            }}
            disabled={!selectedPurchasesQty || loading}
          >
            Delete
            {selectedPurchasesQty ? ` ${selectedPurchasesQty} item(s)` : ""}
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
        {purchases.map((purchase) => (
          <Row
            key={purchase.id}
            onSelect={() => handleSelect(purchase.id)}
            isSelected={selected.includes(purchase.id)}
          >
            <Cell>{new Date(purchase.purchase_date).toLocaleDateString()}</Cell>
            <Cell>{purchase.client || "-"}</Cell>
            <Cell>{purchase.warehouse || "-"}</Cell>
            <Cell>{purchase.supplier || "-"}</Cell>
            <Cell>{purchase.invoice_number || "-"}</Cell>
            <Cell>{purchase.invoice_type || "-"}</Cell>
            <Cell>{purchase.vat_rate || "-"}</Cell>
            <Cell>{purchase.vat_amount || "-"}</Cell>
            <Cell>{purchase.total_amount || "-"}</Cell>{" "}
            <Cell>{purchase.currency || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() =>
                  navigate(`/warehouse/purchases/edit/${purchase.id}`)
                }
              >
                Edit
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showCopyForm &&
        createPortal(
          <PurchaseCopyForm
            selected={selectedPurchases}
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
          <PurchaseDeleteForm
            selected={selectedPurchases}
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

export default Purchases;
