import React, { useState } from "react";
import Form from "../../../../components/Form";
import { Modal } from "../../../../components/Modal";  // Используем именованный импорт
import { useAuthenticatedApi } from "../../../../utils/api";

const AccountDeleteForm = ({ onShowForm, requery, selected, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAuthenticatedApi();

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Promise.all(
        selected.map((account) => api.delete(`/chart-of-accounts/${account.id}`))
      );

      requery();
      setSelected();
      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to delete account(s)");
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
        <h2>Delete account(s)</h2>
        <p>
          Are you sure you want to delete <b>{selected.length}</b> account(s)?
        </p>
      </Form>
    </Modal>
  );
};

export default AccountDeleteForm;