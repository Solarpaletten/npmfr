//src/pages/Clients/index.jsx
import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Table from "../../components/Table";
import Button from "../../components/Button";
import styles from "./index.module.css";  // Создадим стили

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
    vat_code: ""
  });

  // Получение клиентов
  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://npmbk.onrender.com/api/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch clients");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Удаление клиента
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://npmbk.onrender.com/api/clients/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to delete client");
        fetchClients(); // Обновляем список
      } catch (error) {
        setError(error.toString());
      }
    }
  };

  // Добавление клиента
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://npmbk.onrender.com/api/clients", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      if (!response.ok) throw new Error("Failed to add client");
      fetchClients();
      setShowAddForm(false);
      setNewClient({ name: "", email: "", phone: "", code: "", vat_code: "" });
    } catch (error) {
      setError(error.toString());
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
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={newClient.phone}
              onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Code"
              value={newClient.code}
              onChange={(e) => setNewClient({...newClient, code: e.target.value})}
            />
            <input
              type="text"
              placeholder="VAT Code"
              value={newClient.vat_code}
              onChange={(e) => setNewClient({...newClient, vat_code: e.target.value})}
            />
            <div className={styles.formButtons}>
              <Button type="submit">Save</Button>
              <Button type="button" onClick={() => setShowAddForm(false)}>Cancel</Button>
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
                  <Button onClick={() => handleDelete(client.id)}>Delete</Button>
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