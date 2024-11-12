import React from 'react';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

export const Table = ({ children, columns, initialOrder, sort, loading }) => {
  const handleSort = (key, isSortable) => {
    if (isSortable) {
      sort((prevSort) => ({
        sort: key,
        order:
          prevSort.sort === key && prevSort.order === 'ASC' ? 'DESC' : 'ASC',
      }));
    }
  };

  return (
    <div className={styles.table_container}>
      <div
        className={styles.table}
        style={{
          gridTemplateColumns: `${'1fr '.repeat(columns.length).trim()}`,
        }}
      >
        <div className={styles.header_row}>
          {columns.map((column) => (
            <div
              className={`${styles.header_cell} ${
                column.key === 'action' ? styles.action_column : ''
              }`}
              key={column.key}
              onClick={() => handleSort(column.key, column.isSortable)}
            >
              {column.isSortable && (
                <FontAwesomeIcon
                  className={`${styles.sort} ${
                    initialOrder.sort === column.key ? styles.active : ''
                  }`}
                  icon={
                    initialOrder.sort === column.key &&
                    initialOrder.order === 'ASC'
                      ? faArrowUp
                      : faArrowDown
                  }
                />
              )}
              {column.label}
            </div>
          ))}
        </div>
        {loading ? (
          <div className={styles.loading_row}>
            <Loader type='small' />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export const Row = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

export const Cell = ({ children, align }) => {
  return (
    <div className={`${styles.cell} ${align ? styles[align] : ''}`}>
      {children}
    </div>
  );
};

export const TableOld = ({ children }) => {
  return <table className={styles.table_old}>{children}</table>;
};
