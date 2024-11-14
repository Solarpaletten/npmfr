import React, { useState } from 'react';
import { Modal, Form } from '../../../components/Modal';
import api from '../../../utils/api';

const UserDeleteForm = ({ onShowForm, requery, user }) => {
  console.log(user)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // TODO
  const [error, setError] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.delete(`/users/${user.id}`);

      requery();

      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError('Failed to delete user');
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Form
        onSubmit={handleDelete}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName={'Delete'}
        buttonNegativeName={'Cancel'}
      >
        <h2>Delete User</h2>
        <p>
          Are you sure you want to delete <b>{user.username}</b> user?
        </p>
      </Form>
    </Modal>
  );
};

export default UserDeleteForm;
