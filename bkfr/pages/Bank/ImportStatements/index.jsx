// src/pages/Bank/ImportStatements/index.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import BankOperationImportForm from "./components/BankOperationImportForm";

const ImportStatements = () => {
  const navigate = useNavigate();
  const handleReturn = () => navigate("/bank/operations");

  return (
    <Page>
      <h1>Import Bank Statements</h1>
      <BankOperationImportForm 
        onClose={handleReturn}
        onSuccess={handleReturn}
      />
    </Page>
  );
};

export default ImportStatements;