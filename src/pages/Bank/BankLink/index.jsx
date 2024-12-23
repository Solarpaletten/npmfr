import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import SearchField from "../../../components/SearchField";
import { Plus, Pencil } from 'lucide-react';

const BankLink = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bankLinks, setBankLinks] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankLinks = async () => {
      setLoading(true);
      try {
        // Замените URL на ваш API
        const response = await fetch('/api/bank-links');
        const data = await response.json();
        setBankLinks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBankLinks();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBankLinks = bankLinks.filter(link =>
    link.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Page loading={loading} error={error}>
      <h1>Bank Link</h1>

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
          value={searchTerm}
          onChange={handleSearchChange}
          disabled={loading}
        />
      </Toolbar>

      <Table
        columns={[
          { key: 'bank', title: 'Bank', sort: true },
          { key: 'account', title: 'Account', sort: true },
          { key: 'client_id', title: 'Client ID' },
          { key: 'status', title: 'Status', sort: true },
          { key: 'last_sync', title: 'Last Sync', sort: true },
          { key: 'actions', title: '', align: 'right' }
        ]}
      >
        {filteredBankLinks.map((link) => (
          <Row key={link.id}>
            <Cell>{link.bank}</Cell>
            <Cell>{link.account}</Cell>
            <Cell>{link.client_id}</Cell>
            <Cell>{link.status}</Cell>
            <Cell>{new Date(link.last_sync).toLocaleDateString()}</Cell>
            <Cell align="right">
              <Button
                icon={<Pencil className="w-4 h-4" />}
                onClick={() => navigate(`/bank/bank-link/edit/${link.id}`)}
              >
                Edit
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>
    </Page>
  );
};

export default BankLink;