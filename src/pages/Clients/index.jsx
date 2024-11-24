import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../components/Page";
import Toolbar from "../../components/Toolbar";
import SearchField from "../../components/SearchField";
import { Table, Row, Cell } from "../../components/Table";
import Button from "../../components/Button";
import ClientCopyForm from "./ClientCopyForm";
import ClientDeleteForm from "./ClientDeleteForm";
import { useClients } from "../../contexts/ClientContext";
import columns from "./columns";
import {
  faTrashCan,
  faCopy,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Clients = () => {
  const {
    clients,
    refetch,
    loading: clientsLoading,
    error: clientsError,
  } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "", order: "ASC" });

  const [showCopyForm, setShowCopyForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  const selectedClients = clients?.filter((client) =>
    selected.includes(client.id)
  );
  const selectedClientsQty = selectedClients?.length;

  const navigate = useNavigate();

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

  return (
    <Page loading={clientsLoading} error={clientsError}>
      <h1>Clients</h1>

      <Toolbar>
        <div>
          <Button
            icon={faPlus}
            onClick={() => navigate("/clients/create")}
            disabled={clientsLoading}
          >
            Add new client
          </Button>
          <Button
            icon={faCopy}
            onClick={() => {
              setShowCopyForm(true);
            }}
            disabled={!selectedClientsQty || clientsLoading}
          >
            Copy
            {selectedClientsQty ? ` ${selectedClientsQty} item(s)` : ""}
          </Button>
          <Button
            variant="danger"
            icon={faTrashCan}
            onClick={() => {
              setShowDeleteForm(true);
            }}
            disabled={!selectedClientsQty || clientsLoading}
          >
            Delete
            {selectedClientsQty ? ` ${selectedClientsQty} item(s)` : ""}
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
        loading={clientsLoading}
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
            </Cell>
          </Row>
        ))}
      </Table>

      {showCopyForm &&
        createPortal(
          <ClientCopyForm
            selected={selectedClients}
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
          <ClientDeleteForm
            selected={selectedClients}
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

export default Clients;
