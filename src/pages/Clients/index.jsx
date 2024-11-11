import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import Table from '../../components/Table';
import Button from '../../components/Button';
import api from '../../utils/api';

import styles from './index.module.css';

function Clients({ onLogout }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    code: '',
    vat_code: '',
  });

  const fetchClients = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get('/clients');
      setClients(data);
    } catch (error) {
      setError('Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedClients.length} clients?`)) {
      try {
        await Promise.all(selectedClients.map((client) => api.delete(`/clients/${client.id}`)));
        setSelectedClients([]);
        fetchClients();
      } catch (error) {
        setError('Failed to delete clients');
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', newClient);
      fetchClients();
      setShowAddForm(false);
      setNewClient({ name: '', email: '', phone: '', code: '', vat_code: '' });
    } catch (error) {
      setError('Failed to add client');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${selectedClient.id}`, newClient);
      fetchClients();
      setShowEditForm(false);
      setSelectedClient(null);
      setNewClient({ name: '', email: '', phone: '', code: '', vat_code: '' });
    } catch (error) {
      setError('Failed to edit client');
    }
  };

  const handleCopy = (client) => {
    setNewClient({ ...client, name: `${client.name} (Copy)` });
    setShowEditForm(true);
  };

  const Toolbar = () => (
    <div className={styles.toolGroup}>
      <Button onClick={() => setShowAddForm(true)}>+</Button>
      {selectedClient && (
        <>
          <Button
            onClick={() => {
              setNewClient(selectedClient);
              setShowEditForm(true);
            }}
          >
            ✎
          </Button>
          <Button onClick={() => handleCopy(selectedClient)}>⎘</Button>
        </>
      )}
      {selectedClients.length > 0 && <Button onClick={handleDelete}>🗑</Button>}
    </div>
  );

  const handleSelectClient = (client) => {
    if (selectedClients.includes(client)) {
      setSelectedClients(selectedClients.filter((c) => c.id !== client.id));
    } else {
      setSelectedClients([...selectedClients, client]);
    }
  };

  const handleSelectAllClients = () => {
    if (selectedClients.length === clients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clients);
    }
  };

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <div className={styles.header}>
        <h1>Clients</h1>
        <Toolbar />
      </div>

      <Table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className={styles.headerCheckbox}
                onChange={handleSelectAllClients}
                checked={selectedClients.length === clients.length}
              />
            </th>
            <th>Registration date</th>
            <th>Name</th>
            <th>Code</th>
            <th>VAT code</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className={selectedClients.includes(client) ? styles.selectedRow : ''}
              onClick={() => setSelectedClient(client)}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedClients.includes(client)}
                  onChange={() => handleSelectClient(client)}
                />
              </td>
              <td>{new Date(client.created_at).toLocaleDateString()}</td>
              <td>{client.name || '-'}</td>
              <td>{client.code || '-'}</td>
              <td>{client.vat_code || '-'}</td>
              <td>{client.phone || '-'}</td>
              <td>{client.email || '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showAddForm && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleAdd} className={styles.form}>
            <h2>Add New Client</h2>
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Code"
              value={newClient.code}
              onChange={(e) => setNewClient({ ...newClient, code: e.target.value })}
            />
            <input
              type="text"
              placeholder="VAT Code"
              value={newClient.vat_code}
              onChange={(e) => setNewClient({ ...newClient, vat_code: e.target.value })}
            />
            <div className={styles.formButtons}>
              <Button type="submit">Save</Button>
              <Button type="button" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {showEditForm && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleEdit} className={styles.form}>
            <h2>Edit Client</h2>
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Code"
              value={newClient.code}
              onChange={(e) => setNewClient({ ...newClient, code: e.target.value })}
            />
            <input
              type="text"
              placeholder="VAT Code"
              value={newClient.vat_code}
              onChange={(e) => setNewClient({ ...newClient, vat_code: e.target.value })}
            />
            <div className={styles.formButtons}>
              <Button type="submit">Save</Button>
              <Button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setSelectedClient(null);
                  setNewClient({ name: '', email: '', phone: '', code: '', vat_code: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </Page>
  );
}

export default Clients;
