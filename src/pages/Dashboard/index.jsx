import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Page from "../../components/Page";
import Toolbar from "../../components/Toolbar";
import SearchField from "../../components/SearchField";
import { Table, Row, Cell } from "../../components/Table";
import { Cards, Card } from "../../components/Cards";
import Button from "../../components/Button";
import UserAddForm from "./UserAddForm";
import UserDeleteForm from "./UserDeleteForm";
import UserEditForm from "./UserEditForm";
import { useAuthenticatedApi } from "../../utils/api";
import columns from "./columns";
import {
  faTrashCan,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard({ onLogout }) {
  const api = useAuthenticatedApi();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total_users: "0",
    admin_users: "0",
    standard_users: "0",
  });
  const [usersLoading, setUsersLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState({ sort: "username", order: "ASC" });

  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    fetchUsers({ searchTerm, ...sort });
  }, [searchTerm, sort]);

  useEffect(() => {
    fetchDashboardData();
  }, [users]);

  const fetchUsers = async ({ searchTerm, sort, order }) => {
    setUsersLoading(true);
    setError(null);

    try {
      const data = await api.get("/users", {
        search: searchTerm,
        sort,
        order,
      });

      setUsers(data);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    setStatsLoading(true);
    setError(null);

    try {
      const data = await api.get("/dashboard");

      setStats(data);
    } catch (error) {
      setError("Failed to fetch dashboard data");
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    if (allSelected) {
      setSelected(users.map((user) => user.id));
    } else {
      setSelected([]);
    }
  }, [allSelected, users]);

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

  const handleDeleteSelected = () => {
    // TODO Logic to delete selected products
    console.log("Delete selected products", selected);
  };

  const handleCopySelected = () => {
    // TODO Logic to copy selected products
    console.log("Copy selected products", selected);
  };

  return (
    <Page
      loading={statsLoading && usersLoading}
      error={error}
      onLogout={onLogout}
    >
      <h1>Dashboard</h1>

      <Cards columns={3}>
        <Card title={"Total Users"} value={stats.total_users}></Card>
        <Card title={"Admin Users"} value={stats.admin_users}></Card>
        <Card title={"Standard Users"} value={stats.standard_users}></Card>
      </Cards>

      <Toolbar>
        <Button icon={faPlus} onClick={() => setShowAddForm(true)}>
          Add new user
        </Button>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </Toolbar>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={setSort}
        loading={usersLoading}
        allSelected={allSelected}
        toggleSelectAll={handleSelectAll}
      >
        {users.map((user) => (
          <Row
            key={user.id}
            onSelect={() => handleSelect(user.id)}
            isSelected={selected.includes(user.id)}
          >
            <Cell>{new Date(user.created_at).toLocaleDateString()}</Cell>
            <Cell>{user.username || "-"}</Cell>
            <Cell>{user.email || "-"}</Cell>
            <Cell>{user.role || "-"}</Cell>
            <Cell align="right">
              <Button
                icon={faPenToSquare}
                onClick={() => {
                  setShowEditForm(true);
                  setSelectedUser(user);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                icon={faTrashCan}
                onClick={() => {
                  setShowDeleteForm(true);
                  setSelectedUser(user);
                }}
              >
                Delete
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>

      {showAddForm &&
        createPortal(
          <UserAddForm
            onShowForm={setShowAddForm}
            requery={() => fetchUsers({ searchTerm, ...sort })}
          />,
          document.body
        )}
      {showDeleteForm &&
        createPortal(
          <UserDeleteForm
            selectedUser={selectedUser}
            onShowForm={setShowDeleteForm}
            requery={() => fetchUsers({ searchTerm, ...sort })}
          />,
          document.body
        )}
      {showEditForm &&
        createPortal(
          <UserEditForm
            selectedUser={selectedUser}
            onShowForm={setShowEditForm}
            requery={() => fetchUsers({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
}

export default Dashboard;
