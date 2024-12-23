// src/pages/Bank/BankOperations/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";                     
import Toolbar from "../../../components/Toolbar";           
import SearchField from "../../../components/SearchField";     
import { Table, Row, Cell } from "../../../components/Table";  
import Button from "../../../components/Button";               
import Field from "../../../components/Field";                 
import BankOperationCopyForm from "./components/BankOperationCopyForm";
import BankOperationDeleteForm from "./components/BankOperationDeleteForm";
import { useBankOperations } from "../../../contexts/BankOperationsContext"; 
import {
  Plus,
  Minus,
  Printer,
  Settings,
  RefreshCw,
  Filter,
  Pencil,
  Trash2,
} from 'lucide-react';

const BankOperations = () => {
  const {
    operations,
    refetch,
    loading: operationsLoading,
    error: operationsError,
  } = useBankOperations();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "code", order: "ASC" });
  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [entries, setEntries] = useState([]);

  const navigate = useNavigate();

  const selectedOperations = operations?.filter((operation) =>
    selected.includes(operation.id)
  );
  const selectedOperationsQty = selectedOperations?.length;

  useEffect(() => {
    if (allSelected && operations) {
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
      }
      return [...prev, id];
    });
  };

  const handleAddEntry = (newEntry) => {
    setEntries(prev => [...prev, newEntry]);
  };

  // Верхний тулбар операции
  const TopToolbar = () => (
    <div className="flex items-center space-x-1 p-1 bg-gray-100 border-b">
      <Button size="small" variant="success" icon={<Plus className="w-4 h-4" />}>D</Button>
      <Button size="small" variant="info" icon={<Minus className="w-4 h-4" />}>K</Button>
      <Button size="small" icon={<Printer className="w-4 h-4" />}>Print</Button>
      <span className="ml-2">1 / 1</span>
      <div className="ml-auto flex space-x-1">
        <Button size="small" icon={<Filter className="w-4 h-4" />} />
        <Button size="small" icon={<RefreshCw className="w-4 h-4" />} onClick={refetch} />
        <Button size="small" icon={<Settings className="w-4 h-4" />} />
      </div>
    </div>
  );

  const TransactionForm = () => (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Field
        label="Accounting bank"
        type="text"
        value="AG"
        disabled
        required
      />
      
      <Field
        label="Cor. account"
        type="text"
        value="271"
        disabled={operationsLoading}
        required
      />

      <Field
        label="C/D"
        type="select"
        value="D"
        disabled={operationsLoading}
        required
        options={[
          { value: "D", label: "Debit" },
          { value: "K", label: "Credit" }
        ]}
      />

      <Field
        label="Date"
        type="date"
        value={new Date().toISOString().split('T')[0]}
        disabled={operationsLoading}
        required
      />

      <Field
        label="Transfer no."
        type="text"
        disabled={operationsLoading}
        required
      />

      <Field
        label="Total"
        type="number"
        step="0.01"
        disabled={operationsLoading}
        required
      />

      <Field
        label="Initial client"
        type="text"
        disabled={operationsLoading}
        required
      />

      <Field
        label="Client's code"
        type="text"
        disabled={operationsLoading}
      />
    </div>
  );

  // Таблица проводок
  const EntriesTable = () => (
    <div className="overflow-x-auto">
      <Table
        columns={[
          { key: 'select', title: '', width: '30px' },
          { key: 'account', title: 'Cor. account', sort: true },
          { key: 'title', title: 'Title' },
          { key: 'total', title: 'Total', align: 'right' },
          { key: 'docNumber', title: 'Doc nr.' },
          { key: 'exchangeRate', title: 'Exchange rate', align: 'right' },
          { key: 'notes', title: 'Notes' },
          { key: 'costCenter', title: 'Cost center' }
        ]}
        initialOrder={sort}
        sort={(newSort) => {
          setSort(newSort);
          refetch({ searchTerm, ...newSort });
        }}
        allSelected={allSelected}
        toggleSelectAll={handleSelectAll}
      >
        {entries.map((entry, index) => (
          <Row
            key={index}
            onSelect={() => handleSelect(entry.id)}
            isSelected={selected.includes(entry.id)}
          >
            <Cell>{entry.account}</Cell>
            <Cell>{entry.title}</Cell>
            <Cell align="right">{entry.total}</Cell>
            <Cell>{entry.docNumber}</Cell>
            <Cell align="right">{entry.exchangeRate}</Cell>
            <Cell>{entry.notes}</Cell>
            <Cell>{entry.costCenter}</Cell>
          </Row>
        ))}
      </Table>
    </div>
  );

  // Нижний тулбар для проводок
  const BottomToolbar = () => (
    <div className="flex items-center space-x-1 p-1 bg-gray-100 border-t">
      <Button 
        size="small" 
        variant="success" 
        icon={<Plus className="w-4 h-4" />}
        onClick={() => handleAddEntry({
          account: "",
          title: "",
          total: 0,
          docNumber: "",
          exchangeRate: "",
          notes: "",
          costCenter: ""
        })}
      />
      <Button size="small" variant="info" icon={<Pencil className="w-4 h-4" />} />
      <Button 
        size="small" 
        variant="danger" 
        icon={<Trash2 className="w-4 h-4" />}
        disabled={!selected.length} 
      />
      <div className="ml-auto flex space-x-1">
        <Button size="small" icon={<Filter className="w-4 h-4" />} />
        <Button size="small" icon={<Settings className="w-4 h-4" />} />
      </div>
    </div>
  );

  return (
    <Page loading={operationsLoading} error={operationsError}>
      <h1>Bank Operations</h1>

      <Toolbar>
        <div>
          <Button
            icon={Plus}
            onClick={() => navigate("/bank/operations/create")}
            disabled={operationsLoading}
          >
            Add new operation
          </Button>
          <Button
            icon={Pencil}
            onClick={() => {
              setShowCopyForm(true);
            }}
            disabled={!selectedOperationsQty || operationsLoading}
          >
            Copy{selectedOperationsQty ? ` ${selectedOperationsQty} item(s)` : ""}
          </Button>
          <Button
            variant="danger"
            icon={Trash2}
            onClick={() => {
              setShowDeleteForm(true);
            }}
            disabled={!selectedOperationsQty || operationsLoading}
          >
            Delete{selectedOperationsQty ? ` ${selectedOperationsQty} item(s)` : ""}
          </Button>
        </div>

        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          disabled={operationsLoading}
        />
      </Toolbar>

      <div className="flex flex-col border rounded mt-4">
        <TopToolbar />
        <TransactionForm />
        <div className="flex-grow overflow-auto">
          <EntriesTable />
        </div>
        <BottomToolbar />
      </div>

      {showCopyForm && createPortal(
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

      {showDeleteForm && createPortal(
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