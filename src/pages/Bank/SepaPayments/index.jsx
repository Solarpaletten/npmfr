// src/pages/Bank/SepaPayments/index.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import SearchField from "../../../components/SearchField";
import { Plus, Pencil, FileText } from 'lucide-react';
import { useAuthenticatedApi } from "../../../utils/api";

const SepaPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "date", order: "DESC" });

  const navigate = useNavigate();
  const api = useAuthenticatedApi();

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/bank/sepa-payments', {
        params: {
          search: searchTerm,
          ...sort
        }
      });
      setPayments(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch SEPA payments');
    } finally {
      setLoading(false);
    }
  }, [api, searchTerm, sort]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleSort = useCallback((newSort) => {
    setSort(newSort);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const columns = [
    { key: 'date', title: 'Date', sort: true },
    { key: 'reference', title: 'Reference', sort: true },
    { key: 'amount', title: 'Amount', sort: true, align: 'right' },
    { key: 'beneficiary', title: 'Beneficiary', sort: true },
    { key: 'iban', title: 'IBAN' },
    { key: 'status', title: 'Status', sort: true },
    { key: 'actions', title: '', align: 'right' }
  ];

  return (
    <Page loading={loading} error={error}>
      <h1>SEPA Payments</h1>

      <Toolbar>
        <div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => navigate("/bank/sepa-payments/create")}
            disabled={loading}
          >
            New SEPA payment
          </Button>
          <Button
            icon={<FileText className="w-4 h-4" />}
            onClick={() => navigate("/bank/sepa-payments/import")}
            disabled={loading}
          >
            Import payments
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
        {payments.map((payment) => (
          <Row key={payment.id}>
            <Cell>{new Date(payment.date).toLocaleDateString()}</Cell>
            <Cell>{payment.reference}</Cell>
            <Cell align="right">{payment.amount.toFixed(2)} €</Cell>
            <Cell>{payment.beneficiary}</Cell>
            <Cell>{payment.iban}</Cell>
            <Cell>
              <span 
                className={`px-2 py-1 rounded text-sm ${
                  payment.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : payment.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {payment.status}
              </span>
            </Cell>
            <Cell align="right">
              <Button
                size="small"
                icon={<Pencil className="w-4 h-4" />}
                onClick={() => navigate(`/bank/sepa-payments/edit/${payment.id}`)}
                disabled={payment.status === 'completed'}
              >
                Edit
              </Button>
            </Cell>
          </Row>
        ))}
        {payments.length === 0 && !loading && (
          <Row>
            <Cell colSpan={columns.length} className="text-center py-8 text-gray-500">
              No SEPA payments found
            </Cell>
          </Row>
        )}
      </Table>
    </Page>
  );
};

export default SepaPayments;