import React from "react";

import styles from "./index.module.css";

const SearchField = ({ searchTerm, setSearchTerm, disabled }) => {
  return (
    <div className={styles.input}>
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchField;
