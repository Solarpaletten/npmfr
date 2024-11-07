import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ValidationError from "../../components/ValidationError";
import api from "../../utils/api";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }

    const registerUser = async (username, email, password) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const data = await api.post("auth/register", {
          username,
          email,
          password,
        });

        console.log("User registered successfully:", data);
        setSuccess(true);

        setUsername("");
        setEmail("");
        setPassword("");
        setError("");

        onRegister();
      } catch (error) {
        setError("Registration failed, please try again");
      } finally {
        setLoading(false);
      }
    };

    registerUser(username, email, password);
  };

  return (
    <Form>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Field
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Field
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ValidationError error={error} />
        {success && <p className="success-message">Registration successful!</p>}
        <div>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
