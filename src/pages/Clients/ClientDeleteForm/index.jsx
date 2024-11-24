import React, { useState } from "react";
import { Modal, Form } from "../../../components/Modal";
import { useAuthenticatedApi } from "../../../utils/api";

const ClientDeleteForm = ({ onShowForm, requery, selected, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAuthenticatedApi();

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Promise.all(
        selected.map((s) => api.delete(`/clients/${s.id}`))
      );

      requery();
      setSelected();
      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to delete client(s)");
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
        <h2>Delete client(s)</h2>
        <p>
          Are you sure you want to delete <b>{selected.length}</b> client(s)?
        </p>
      </Form>
    </Modal>
  );
};

export default ClientDeleteForm;
