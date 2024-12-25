import React from "react";
import { useNavigate } from "react-router-dom"
import Page from "../../../components/Page";
import Button from "../../../components/Button";
import { Filter, RefreshCw, Settings, BarChart2, Printer } from 'lucide-react';
import styles from './index.module.css';




const BankOperations = () => {
  const navigate = useNavigate();

  const handleOperationClick = (type) => {
    navigate("/bank/operations/create", { state: { type } });
  };

  const LeftButtons = () => (
    <div className={styles.buttonGroup}>
      <Button
        className={styles.debitButton}
        onClick={() => handleOperationClick('debit')}
      >
        + D
      </Button>
      <Button
        className={styles.creditButton}
        onClick={() => handleOperationClick('credit')}
      >
        - C
      </Button>
      <Button className={styles.utilityButton}>
        <Printer size={16} />
      </Button>
    </div>
  );

  const RightButtons = () => (
    <div className={styles.buttonGroup}>
      <Button className={styles.utilityButton}>
        <Filter size={16} />
      </Button>
      <Button className={styles.utilityButton}>
        <RefreshCw size={16} />
      </Button>
      <Button className={styles.utilityButton}>
        <Settings size={16} />
      </Button>
      <Button className={styles.utilityButton}>
        <BarChart2 size={16} />
      </Button>
    </div>
  );

  return (
    <Page>
      <h1>Bank Operations</h1>
      <div className={styles.buttonsContainer}>
        <LeftButtons />
        <RightButtons />
      </div>
    </Page>
  );
};

export default BankOperations;