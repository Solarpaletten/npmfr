import React from "react";
import Page from "../../components/Page";

function Dashboard({ onLogout }) {
  return (
    <Page onLogout={onLogout}>
      <h1>Welcome to the Dashboard</h1>
      <p>
        This is the main content area where relevant information will be
        displayed based on your selections in the sidebar.
      </p>
    </Page>
  );
}

export default Dashboard;
