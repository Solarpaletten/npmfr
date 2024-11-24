import React, { useState } from "react";
import Alert from "../../../components/Alert";
import { Modal, Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import Select from "../../../components/Select";
import { useAuthenticatedApi } from "../../../utils/api";

const UserAddForm = ({ onShowForm, requery }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "standard",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = useAuthenticatedApi();

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/users", newUser);

      requery();

      setLoading(false);
      setNewUser({ username: "", email: "", role: "standard" });
      onShowForm(false);
    } catch (error) {
      setError("Failed to add user");
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Form
        onSubmit={handleAdd}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName={"Create user"}
        buttonNegativeName={"Cancel"}
      >
        <h2>Add New User</h2>
        <Field
          type="text"
          placeholder="User name"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          disabled={loading}
          required
        />
        <Field
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          disabled={loading}
          required
        />
        <Select
          label="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          options={[
            { value: "standard", label: "Standard" },
            { value: "admin", label: "Admin" },
          ]}
          name="role"
          id="role"
          required
        />

        <Alert variant="warning">
          Password will be set to <b>default1234</b>. Please ask the user to
          update it as soon as possible.
        </Alert>
      </Form>
    </Modal>
  );
};

export default UserAddForm;
