import React, { useState } from "react";
import { Modal, Form } from "../../../components/Modal";
import { useAuthenticatedApi } from "../../../utils/api";

const UserDeleteForm = ({ onShowForm, requery, selectedUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAuthenticatedApi();

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.delete(`/users/${selectedUser.id}`);

      requery();

      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to delete user");
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
        buttonPositiveName={"Delete"}
        buttonNegativeName={"Cancel"}
      >
        <h2>Delete User</h2>
        <p>
          Are you sure you want to delete <b>{selectedUser.username}</b> user?
        </p>
      </Form>
    </Modal>
  );
};

export default UserDeleteForm;
