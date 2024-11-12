import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import SearchField from '../../components/SearchField';
import { Table, Row, Cell } from '../../components/Table';
import { Cards, Card } from '../../components/Cards';
import Button from '../../components/Button';
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

  useEffect(() => {
    fetchUsers({ searchTerm, ...sort });
  }, [searchTerm, sort]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
        <Button variant='primary' icon={faPlus}>
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
              <Button icon={faPenToSquare}>Edit</Button>
              <Button icon={faCopy}>Copy</Button>
              <Button variant='red' icon={faTrashCan}>
                Delete
              </Button>
            </Cell>
          </Row>
        ))}
      </Table>
    </Page>
  );
}

export default Dashboard;
