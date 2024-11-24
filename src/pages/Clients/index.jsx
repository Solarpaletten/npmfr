import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import Page from "../../components/Page";
import Toolbar from "../../components/Toolbar";
import SearchField from "../../components/SearchField";
import { Table, Row, Cell } from "../../components/Table";
import Button from "../../components/Button";
import { useAuthenticatedApi } from "../../utils/api";
import { useClients } from "../../contexts/ClientContext";
import columns from "./columns";
import {
  faTrashCan,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

const Clients = () => {
  const {
    clients,
    refetch,
    loading: clientsLoading,
    error: clientsError,
  } = useClients();
  const api = useAuthenticatedApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedClients, setSelectedClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    code: "",
    vat_code: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });
  const [selectedSale, setSelectedSale] = useState(null);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", newClient);
      refetch();
      setShowAddForm(false);
      setNewClient({ name: "", email: "", phone: "", code: "", vat_code: "" });
    } catch (error) {
      setError("Failed to add client");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${selectedClient.id}`, newClient);
      refetch();
      setShowEditForm(false);
      setSelectedClient(null);
      setNewClient({ name: "", email: "", phone: "", code: "", vat_code: "" });
    } catch (error) {
      setError("Failed to edit client");
    }
  };

  useEffect(() => {
    if (allSelected) {
      setSelected(clients.map((client) => client.id));
    } else {
      setSelected([]);
    }
  }, [allSelected, clients]);

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

  const handleDeleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selected.length} clients?`
      )
    ) {
      try {
        await Promise.all(selected.map((s) => api.delete(`/clients/${s.id}`)));
        setSelectedClients([]);
        refetch();
      } catch (error) {
        setError("Failed to delete clients");
      }
    }
  };

  const handleCopySelected = (client) => {
    setNewClient({ ...client, name: `${client.name} (Copy)` });
    setShowEditForm(true);
  };

  return (
    <Page loading={loading || clientsLoading} error={error || clientsError}>
      <h1>Clients</h1>
      <Toolbar>
        <Button icon={faPlus} onClick={() => navigate("/clients/create")}>
          Create new client
        </Button>
        <button onClick={handleDeleteSelected}>Delete Selected</button>
        <button onClick={handleCopySelected}>Copy Selected</button>
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
        {clients.map((client) => (
          <Row
            key={client.id}
            onSelect={() => handleSelect(client.id)}
            isSelected={selected.includes(client.id)}
          >
            <Cell>{new Date(client.created_at).toLocaleDateString()}</Cell>
            <Cell>{client.name || "-"}</Cell>
            <Cell>{client.code || "-"}</Cell>
            <Cell>{client.vat_code || "-"}</Cell>
            <Cell>{client.phone || "-"}</Cell>
            <Cell>{client.email || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => navigate(`/clients/edit/${client.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={faTrashCan}
                onClick={() => {
                  setShowDeleteForm(true);
                  setSelectedClient(client);
                }}
              >
                Delete
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

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

      {showEditForm && (
        <div className={styles.formOverlay}>
          <form onSubmit={handleEdit} className={styles.form}>
            <h2>Edit Client</h2>
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
              <Button
                type="button"
                onClick={() => {
                  setShowEditForm(false);
                  setSelectedClient(null);
                  setNewClient({
                    name: "",
                    email: "",
                    phone: "",
                    code: "",
                    vat_code: "",
                  });
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
};

export default Clients;
