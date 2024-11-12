import React from 'react';

import styles from './index.module.css';

const SearchField = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.input}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
