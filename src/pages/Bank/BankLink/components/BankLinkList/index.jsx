// src/pages/Bank/BankLink/components/BankLinkList/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "../../../../../components/Toolbar";
import SearchField from "../../../../../components/SearchField";
import { Table, Row, Cell } from "../../../../../components/Table";
import Button from "../../../../../components/Button";
import { Plus, Pencil } from 'lucide-react';

const columns = [
  { key: 'bank', title: 'Bank', sort: true },
  { key: 'account', title: 'Account', sort: true },
  { key: 'client_id', title: 'Client ID' },
  { key: 'status', title: 'Status', sort: true },
  { key: 'last_sync', title: 'Last Sync', sort: true },
  { key: 'actions', title: '', align: 'right' }
];

const BankLinkList = ({ 
  bankLinks = [], 
  loading = false, 
  onSort, 
  onSearch,
  onRefresh 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "bank", order: "ASC" });
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleSort = (newSort) => {
    setSort(newSort);
    onSort?.(newSort);
  };

  return (
    <div>
      <Toolbar>
        <div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate("/bank/bank-link/create")}
            disabled={loading}
          >
            Add new bank link
          </Button>
        </div>

        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={handleSearch}
          disabled={loading}
        />
      </Toolbar>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={handleSort}
        loading={loading}
      >
        {bankLinks.map((link) => (
          <Row key={link.id}>
            <Cell>{link.bank}</Cell>
            <Cell>{link.account}</Cell>
            <Cell>{link.client_id}</Cell>
            <Cell>
              <span 
                className={`px-2 py-1 rounded text-sm ${
                  link.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {link.status}
              </span>
            </Cell>
            <Cell>{new Date(link.last_sync).toLocaleDateString()}</Cell>
            <Cell align="right">
              <div className="flex items-center justify-end space-x-2">
                <Button
                  size="small"
                  variant="secondary"
                  onClick={onRefresh}
                  disabled={loading}
                >
                  Sync
                </Button>
                <Button
                  size="small"
                  icon={<Pencil className="w-4 h-4" />}
                  onClick={() => navigate(`/bank/bank-link/edit/${link.id}`)}
                  disabled={loading}
                >
                  Edit
                </Button>
              </div>
            </Cell>
          </Row>
        ))}
        {bankLinks.length === 0 && !loading && (
          <Row>
            <Cell colSpan={columns.length} className="text-center py-8 text-gray-500">
              No bank links found. Click "Add new bank link" to create one.
            </Cell>
          </Row>
        )}
      </Table>
    </div>
  );
};

export default BankLinkList;