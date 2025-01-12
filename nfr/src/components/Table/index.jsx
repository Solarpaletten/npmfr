import React, { createContext, useContext } from "react";
import Loader from "../Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./index.module.css";

const TableContext = createContext({ hasCheckboxes: true });

export const Table = ({
  children,
  columns,
  initialOrder,
  sort,
  loading,
  allSelected,
  toggleSelectAll,
  hasCheckboxes = true,
}) => {
  const handleSort = (key, isSortable) => {
    if (isSortable) {
      sort((prevSort) => ({
        sort: key,
        order:
          prevSort.sort === key && prevSort.order === "ASC" ? "DESC" : "ASC",
      }));
    }
  };

  return (
    <TableContext.Provider value={{ hasCheckboxes }}>
      <div className={styles.table_container}>
        <div
          className={styles.table}
          style={{
            gridTemplateColumns: hasCheckboxes
              ? `40px ${"1fr ".repeat(columns.length - 1).trim()} 1fr`
              : `${"1fr ".repeat(columns.length -1 ).trim()} 1fr`,
          }}
        >
          <div className={styles.header_row}>
            {hasCheckboxes && (
              <div className={styles.header_cell}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </div>
            )}
            {columns.map((column) => (
              <div
                className={styles.header_cell}
                key={column.key}
                onClick={() => handleSort(column.key, column.isSortable)}
              >
                {column.isSortable && (
                  <FontAwesomeIcon
                    className={`${styles.sort} ${
                      initialOrder.sort === column.key ? styles.active : ""
                    }`}
                    icon={
                      initialOrder.sort === column.key &&
                      initialOrder.order === "ASC"
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
              <Loader type="small" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </TableContext.Provider>
  );
};

export const Row = ({ children, onSelect, isSelected }) => {
  const { hasCheckboxes } = useContext(TableContext);

  return (
    <div className={styles.row}>
      {hasCheckboxes && (
        <div className={styles.cell}>
          <input type="checkbox" checked={isSelected} onChange={onSelect} />
        </div>
      )}
      {children}
    </div>
  );
};

export const Cell = ({ children, align }) => {
  return (
    <div className={`${styles.cell} ${align ? styles[align] : ""}`}>
      {children}
    </div>
  );
};
