import React, { useState } from "react";
import { Modal, Form } from "../../../../components/Modal";
import { useAuthenticatedApi } from "../../../../utils/api";

const DeleteForm = ({ onShowForm, requery, selected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAuthenticatedApi();

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.delete(`/payroll/${selected.id}`);

      requery();

      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to delete payroll");
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
        <h2>Delete Payroll</h2>
        <p>
          Are you sure you want to delete <b>{selected.employee_name}'s</b> payroll?
        </p>
      </Form>
    </Modal>
  );
};

export default DeleteForm;
