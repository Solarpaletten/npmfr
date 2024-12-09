import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import BankOperationCopyForm from "../BankOperationCopyForm";
import BankOperationDeleteForm from "../BankOperationDeleteForm";




import { useBankOperations } from "../../../contexts/BankOperationsContext";
import columns from "./columns";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const BankOperations = () => {
  const {
    operations,
    refetch,
    loading: operationsLoading,
    error: operationsError,
  } = useBankOperations();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });

  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const selectedOperations = operations?.filter((operation) =>
    selected.includes(operation.id)
  );
  const selectedOperationsQty = selectedOperations?.length;

  const navigate = useNavigate();

  useEffect(() => {
    if (allSelected) {
      setSelected(operations.map((operation) => operation.id));
    } else {
      setSelected([]);
    }
  }, [allSelected, operations]);

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
    <Page loading={operationsLoading} error={operationsError}>
      <h1>Bank Operations</h1>

      <Toolbar>
        <div>
          <Button
            icon={faPlus}
            onClick={() => navigate("/bank/operations/create")}
            disabled={operationsLoading}
          >
            Add new operation
          </Button>
          <Button
            icon={faCopy}
            onClick={() => {
              setShowCopyForm(true);
            }}
            disabled={!selectedOperationsQty || operationsLoading}
          >
            Copy
            {selectedOperationsQty ? ` ${selectedOperationsQty} item(s)` : ""}
          </Button>
          <Button
            variant="danger"
            icon={faTrashCan}
            onClick={() => {
              setShowDeleteForm(true);
            }}
            disabled={!selectedOperationsQty || operationsLoading}
          >
            Delete
            {selectedOperationsQty ? ` ${selectedOperationsQty} item(s)` : ""}
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
        loading={operationsLoading}
        allSelected={allSelected}
        toggleSelectAll={handleSelectAll}
      >
        {operations.map((operation) => (
          <Row
            key={operation.id}
            onSelect={() => handleSelect(operation.id)}
            isSelected={selected.includes(operation.id)}
          >
            <Cell>{new Date(operation.date).toLocaleDateString()}</Cell>
            <Cell>{operation.type || "-"}</Cell>
            <Cell>{operation.amount || "-"}</Cell>
            <Cell>{operation.client || "-"}</Cell>
            <Cell>{operation.description || "-"}</Cell>
            <Cell>{operation.account || "271"}</Cell>
            <Cell>{operation.corresponding_account || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => navigate(`/bank/operations/edit/${operation.id}`)}
              >
                Edit
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showCopyForm &&
        createPortal(
          <BankOperationCopyForm
            selected={selectedOperations}
            setSelected={() => {
              setSelected([]);
              setAllSelected(false);
            }}
            onShowForm={setShowCopyForm}
            requery={() => refetch({ searchTerm, ...sort })}
          />,
          document.body
        )}
      {showDeleteForm &&
        createPortal(
          <BankOperationDeleteForm
            selected={selectedOperations}
            setSelected={() => {
              setSelected([]);
              setAllSelected(false);
            }}
            onShowForm={setShowDeleteForm}
            requery={() => refetch({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
};

export default BankOperations;