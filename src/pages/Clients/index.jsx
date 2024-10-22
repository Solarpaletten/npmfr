import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Table from "../../components/Table";

function Clients({ onLogout }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://npmbk.onrender.com/api/clients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setClients(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  return (
    <Page loading={loading} error={error} onLogout={onLogout}>
      <h1>Clients</h1>
      <Table>
        <thead>
          <tr>
            <th>Registration date</th>
            <th>Name</th>
            <th>Code</th>
            <th>VAT code</th>
            <th>Phone number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.registrationDate || "-"}</td>
              <td>{client.name || "-"}</td>
              <td>{client.code || "-"}</td>
              <td>{client.vatCode || "-"}</td>
              <td>{client.phoneNumber || "-"}</td>
              <td>{client.email || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}

export default Clients;
