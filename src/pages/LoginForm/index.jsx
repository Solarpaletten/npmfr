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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    console.log("User logged in:", { email, password });

    setEmail("");
    setPassword("");
    setError("");

    if (onLogin) {
      onLogin();
    } else {
      navigate("/clients");
    }
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
          <Button primary type="submit">
            Login
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
