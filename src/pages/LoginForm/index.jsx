import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ValidationError from "../../components/ValidationError";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    const loginUser = async (email, password) => {
      setLoading(true);
      setError(null);

      try {
        const { token } = await api.post("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", token);

        setEmail("");
        setPassword("");
        setError("");

        onLogin("/dashboard");
      } catch (error) {
        setError("Login failed, please check your credentials");
      } finally {
        setLoading(false);
      }
    };

    loginUser(email, password);
  };

  return (
    <Form>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Logining..." : "Login"}
          </Button>
          <Button icon={faArrowLeft} onClick={() => navigate("/")}>
            Back to Home page
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
