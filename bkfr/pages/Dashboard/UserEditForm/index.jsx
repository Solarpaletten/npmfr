import React, { useState } from "react";
import { Modal, Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import Select from "../../../components/Select";
import { useUser } from "../../../contexts/UserContext";
import { useAuthenticatedApi } from "../../../utils/api";

const UserEditForm = ({ onShowForm, requery, selectedUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(selectedUser);
  const { user } = useUser();

  const api = useAuthenticatedApi();

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/users/${currentUser.id}`, currentUser);

      requery();

      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to edit user");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal>
      <Form
        onSubmit={handleEdit}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName={"Save changes"}
        buttonNegativeName={"Cancel"}
      >
        <h2>Edit User</h2>
        <Field
          type="text"
          name="username"
          label="User name"
          placeholder="User name"
          value={currentUser.username}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          value={currentUser.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Select
          label="Role"
          value={currentUser.role}
          onChange={handleChange}
          options={[
            { value: "standard", label: "Standard" },
            { value: "admin", label: "Admin" },
          ]}
          name="role"
          id="role"
          required
          disabled={
            loading || (user.role === "admin" && currentUser.id === user.userId)
          }
        />
      </Form>
    </Modal>
  );
};

export default UserEditForm;
