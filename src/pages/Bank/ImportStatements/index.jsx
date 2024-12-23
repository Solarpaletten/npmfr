// src/pages/Bank/ImportStatements/index.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import BankOperationImportForm from "./components/BankOperationImportForm";

const ImportStatements = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/bank/operations");
  };

  return (
    <Page>
      <BankOperationImportForm 
        onClose={() => navigate("/bank/operations")}
        onSuccess={handleSuccess}
      />
    </Page>
  );
};

export default ImportStatements;