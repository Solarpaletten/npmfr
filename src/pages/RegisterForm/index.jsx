import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Field from "../../components/Field";
import Form from "../../components/Form";
import Button from "../../components/Button";
import ValidationError from "../../components/ValidationError";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Registration failed");
        }

        const data = await response.json();
        console.log("User registered successfully:", data);
        setSuccess(true);
        
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
    
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
        <div>
          <Button primary type="submit">
            {loading ? "Registering..." : "Register"}
          </Button>
          <Button icon={faArrowLeft} onClick={() => navigate("/")}>
            Back to Home page
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RegisterForm;
