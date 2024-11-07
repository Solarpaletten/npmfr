import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ValidationError from "../../components/ValidationError";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Login failed, please check your credentials");
        }

        const { token } = await response.json();
        localStorage.setItem("token", token);

        setEmail("");
        setPassword("");
        setError("");

        onLogin("/dashboard");
      } catch (error) {
        setError(error.message);
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
          <Button primary type="submit" disabled={loading}>
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
