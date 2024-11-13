import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Page from '../../components/Page';
import SearchField from '../../components/SearchField';
import { Table, Row, Cell } from '../../components/Table';
import { Cards, Card } from '../../components/Cards';
import Button from '../../components/Button';
import UserAddForm from './UserAddForm';
import UserDeleteForm from './UserDeleteForm';
import UserEditForm from './UserEditForm';
import api from '../../utils/api';
import columns from './columns';
import {
  faTrashCan,
  faPenToSquare,
  faCopy,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

function Dashboard({ onLogout }) {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total_users: '0',
    admin_users: '0',
    standard_users: '0',
  });
  const [usersLoading, setUsersLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState({ sort: 'username', order: 'ASC' });

  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

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
      const data = await api.get('/users', {
        search: searchTerm,
        sort,
        order,
      });

      setUsers(data);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    setStatsLoading(true);
    setError(null);

    try {
      const data = await api.get('/dashboard');

      setStats(data);
    } catch (error) {
      setError('Failed to fetch dashboard data');
    } finally {
      setStatsLoading(false);
    }
  };

  return (
    <Page
      loading={statsLoading && usersLoading}
      error={error}
      onLogout={onLogout}
    >
      <h1>Dashboard</h1>

      <Cards columns={3}>
        <Card title={'Total Users'} value={stats.total_users}></Card>
        <Card title={'Admin Users'} value={stats.admin_users}></Card>
        <Card title={'Standard Users'} value={stats.standard_users}></Card>
      </Cards>

      <div className={styles.toolbar}>
        <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button icon={faPlus} onClick={() => setShowAddForm(true)}>
          Add new user
        </Button>
      </div>

      <Table
        columns={columns}
        initialOrder={sort}
        sort={setSort}
        loading={usersLoading}
      >
        {users.map((user) => (
          <Row key={user.id}>
            <Cell>{new Date(user.created_at).toLocaleDateString()}</Cell>
            <Cell>{user.username || '-'}</Cell>
            <Cell>{user.email || '-'}</Cell>
            <Cell>{user.role.toUpperCase() || '-'}</Cell>
            <Cell align='right'>
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
                variant='danger'
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
            user={selectedUser}
            onShowForm={setShowDeleteForm}
            requery={() => fetchUsers({ searchTerm, ...sort })}
          />,
          document.body
        )}
      {showEditForm &&
        createPortal(
          <UserEditForm
            user={selectedUser}
            onShowForm={setShowEditForm}
            requery={() => fetchUsers({ searchTerm, ...sort })}
          />,
          document.body
        )}
    </Page>
  );
}

export default Dashboard;
