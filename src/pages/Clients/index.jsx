import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Table from "../../components/Table";

function Clients({ onLogout }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://npmbk.onrender.com/api/clients", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClients(data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
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
              {/* TODO date format */}
              <td>{client.created_at || "-"}</td> 
              <td>{client.name || "-"}</td>
              <td>{client.code || "-"}</td>
              <td>{client.vat_code || "-"}</td>
              <td>{client.phone || "-"}</td>
              <td>{client.email || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}

export default Clients;
