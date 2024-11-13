import React, { useState } from 'react';
import { Modal, Form } from '../../../components/Modal';
import Field from '../../../components/Field';
import api from '../../../utils/api';

const UserEditForm = ({ onShowForm, requery, user }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // TODO
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(user);
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/users/${user.id}`, currentUser);

      requery();

      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError('Failed to edit user');
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Form
        onSubmit={handleEdit}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName={'Save'}
        buttonNegativeName={'Cancel'}
      >
        <h2>Edit User</h2>
        <Field
          type='text'
          placeholder='User name'
          value={currentUser.username}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, username: e.target.value })
          }
          disabled={loading}
          required
        />
        <Field
          type='email'
          placeholder='Email'
          value={currentUser.email}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, email: e.target.value })
          }
          disabled={loading}
          required
        />

        <label htmlFor='role'>Role:</label>

        <select
          disabled={role === 'admin' && user.id === +userId}
          name='role'
          id='role'
          onChange={(e) =>
            setCurrentUser({ ...currentUser, role: e.target.value })
          }
        >
          <option value='standard' selected={user.role === 'standard'}>
            Standard
          </option>
          <option value='admin' selected={user.role === 'admin'}>
            Admin
          </option>
        </select>
      </Form>
    </Modal>
  );
};

export default UserEditForm;
