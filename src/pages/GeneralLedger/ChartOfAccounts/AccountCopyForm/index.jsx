import React, { useState } from "react";
import { Modal, Form } from "../../../components/Modal";
import { useAuthenticatedApi } from "../../../utils/api";

const AccountCopyForm = ({ onShowForm, requery, selected, setSelected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api = useAuthenticatedApi();

  const handleCopy = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Promise.all(
        selected.map(async (s) => {
          return api.post(`/chart-of-accounts/${s.id}/copy`);
        })
      );

      requery();
      setSelected();
      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to copy account(s)");
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Form
        onSubmit={handleCopy}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName="Copy"
        buttonNegativeName="Cancel"
      >
        <h2>Copy account(s)</h2>
        <p>
          Are you sure you want to copy <b>{selected.length}</b> account(s)?
        </p>
      </Form>
    </Modal>
  );
};

export default AccountCopyForm;