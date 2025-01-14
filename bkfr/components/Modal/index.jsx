import React from "react";
import Button from "../Button";
import ValidationError from "../ValidationError";

import styles from "./index.module.css";

export const Modal = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export const Form = ({
  children,
  onSubmit,
  onClose,
  loading,
  error,
  buttonPositiveName,
  buttonNegativeName,
  fullscreen = false,
}) => {
  return (
    <form
      className={fullscreen ? styles.form_fullscreen : styles.form}
      onSubmit={onSubmit}
    >
      {children}

      <ValidationError error={error} />

      <div className={styles.buttons}>
        <Button type="button" onClick={onClose} disabled={loading}>
          {buttonNegativeName}
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {buttonPositiveName}
        </Button>
      </div>
    </form>
  );
};
