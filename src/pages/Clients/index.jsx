import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Table from "../../components/Table";
import Button from "../../components/Button";
import api from "../../utils/api";

import styles from "./index.module.css";

function Clients({ onLogout }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    vat_code: "",
  });

  const fetchClients = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get("/clients");

      setClients(data);
    } catch (error) {
      setError("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await api.delete(`/clients/${id}`);

        fetchClients();
      } catch (error) {
        setError("Failed to delete client");
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", newClient);

      fetchClients();
      setShowAddForm(false);
      setNewClient({ name: "", email: "", phone: "", code: "", vat_code: "" });
    } catch (error) {
      setError("Failed to add client");
    }
  };

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <div className={styles.header}>
        <h1>Clients</h1>
        <Button onClick={() => setShowAddForm(true)}>Add Client</Button>
      </div>

      {showAddForm && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleAdd} className={styles.form}>
            <h2>Add New Client</h2>
            <input
              type="text"
              placeholder="Name"
              value={newClient.name}
              onChange={(e) =>
                setNewClient({ ...newClient, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) =>
                setNewClient({ ...newClient, email: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) =>
                setNewClient({ ...newClient, phone: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Code"
              value={newClient.code}
              onChange={(e) =>
                setNewClient({ ...newClient, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="VAT Code"
              value={newClient.vat_code}
              onChange={(e) =>
                setNewClient({ ...newClient, vat_code: e.target.value })
              }
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

      <Table>
        <thead>
          <tr>
            <th>Registration date</th>
            <th>Name</th>
            <th>Code</th>
            <th>VAT code</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{new Date(client.created_at).toLocaleDateString()}</td>
              <td>{client.name || "-"}</td>
              <td>{client.code || "-"}</td>
              <td>{client.vat_code || "-"}</td>
              <td>{client.phone || "-"}</td>
              <td>{client.email || "-"}</td>
              <td>
                <div className={styles.actions}>
                  <Button onClick={() => handleDelete(client.id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}

export default Clients;
