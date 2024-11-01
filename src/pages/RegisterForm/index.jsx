import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ValidationError from "../../components/ValidationError";

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
        const response = await fetch("https://npmbk.onrender.com/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("Registration failed, please try again");
        }

        setUsername("");
        setEmail("");
        setPassword("");
        setSuccess(true); // Устанавливаем success в true при успешной регистрации
        onRegister();
      } catch (error) {
        setError(error.message);
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
          <Button primary type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          <Button onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
