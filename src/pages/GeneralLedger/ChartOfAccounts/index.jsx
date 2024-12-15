import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import AccountCopyForm from "./AccountCopyForm";
import AccountDeleteForm from "./AccountDeleteForm";
import { useAccounts } from "../../../contexts/AccountContext";
import columns from "./columns";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const ChartOfAccounts = () => {
  const {
    accounts,
    refetch,
    loading: accountsLoading,
    error: accountsError,
  } = useAccounts();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "code", order: "ASC" });

  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const selectedAccounts = accounts?.filter((account) =>
    selected.includes(account.id)
  );
  const selectedAccountsQty = selectedAccounts?.length;

  const navigate = useNavigate();

  useEffect(() => {
    if (allSelected) {
      setSelected(accounts.map((account) => account.id));
    } else {
      setSelected([]);
    }
  }, [allSelected, accounts]);

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
    <Page loading={accountsLoading} error={accountsError}>
      <h1>Chart of Accounts</h1>

      <Toolbar>
        <div>
          <Button
            icon={faPlus}
            onClick={() => navigate("/general-ledger/chart-of-accounts/create")}
            disabled={accountsLoading}
          >
            Add new account
          </Button>
          <Button
            icon={faCopy}
            onClick={() => {
              setShowCopyForm(true);
            }}
            disabled={!selectedAccountsQty || accountsLoading}
          >
            Copy
            {selectedAccountsQty ? ` ${selectedAccountsQty} item(s)` : ""}
          </Button>
          <Button
            variant="danger"
            icon={faTrashCan}
            onClick={() => {
              setShowDeleteForm(true);
            }}
            disabled={!selectedAccountsQty || accountsLoading}
          >
            Delete
            {selectedAccountsQty ? ` ${selectedAccountsQty} item(s)` : ""}
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
        loading={accountsLoading}
        allSelected={allSelected}
        toggleSelectAll={handleSelectAll}
      >
        {accounts.map((account) => (
          <Row
            key={account.id}
            onSelect={() => handleSelect(account.id)}
            isSelected={selected.includes(account.id)}
          >
            <Cell>{account.code}</Cell>
            <Cell>{account.name}</Cell>
            <Cell>{account.parent_code || "-"}</Cell>
            <Cell>{account.cost_center || "-"}</Cell>
            <Cell>{account.is_reserve ? "Yes" : "No"}</Cell>
            <Cell>{account.is_advance ? "Yes" : "No"}</Cell>
            <Cell>{account.is_active ? "Yes" : "No"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => navigate(`/general-ledger/chart-of-accounts/edit/${account.id}`)}
              >
                Edit
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showCopyForm &&
        createPortal(
          <AccountCopyForm
            selected={selectedAccounts}
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
          <AccountDeleteForm
            selected={selectedAccounts}
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

export default ChartOfAccounts;