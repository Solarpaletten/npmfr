import React, { useState } from 'react';
import Button from '../../../components/Button';
import api from '../../../utils/api';

import styles from './index.module.css';

const UserAddForm = ({ visible, onClose, requery }) => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'standard',
  });
  const [error, setError] = useState(null); // TODO

  if (!visible) return null;

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users', newUser);

      requery();

      onClose(false);
      setNewUser({ username: '', email: '', role: 'standard' });
    } catch (error) {
      setError('Failed to add user');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <form onSubmit={handleAdd} className={styles.form}>
        <h2>Add New Client</h2>
        <input
          type='text'
          placeholder='Name'
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />

        <label for='role'>Role:</label>

        <select
          name='role'
          id='role'
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value='standard'>Standard</option>
          <option value='admin'>Admin</option>
        </select>

        <div className={styles.formButtons}>
          <Button type='submit'>Save</Button>
          <Button type='button' onClick={() => onClose(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAddForm;
