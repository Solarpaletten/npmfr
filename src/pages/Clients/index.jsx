// src/pages/Clients/index.jsx
import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import Button from "../../components/Button";
import { Table, Row, Cell } from "../../components/Table";
import { useClients } from "../../contexts/ClientContext";
import columns from "./columns";
import { 
 Filter, RefreshCw, Settings, BarChart2,
 Printer, UserPlus, Pencil, Trash , FileText, Copy
} from 'lucide-react';
import styles from './index.module.css';

const Clients = () => {
 const { clients, loading, error } = useClients();
 const [sort, setSort] = useState({ sort: "", order: "ASC" });
 const [allSelected, setAllSelected] = useState(false);
 const [selectedClients, setSelectedClients] = useState([]);

 const handleSelectAll = () => setAllSelected(prev => !prev);
 const handleSelect = (id) => {
   setSelectedClients(prev => prev.includes(id) 
     ? prev.filter(itemId => itemId !== id)
     : [...prev, id]
   );
 };

 useEffect(() => {
   if (allSelected) {
     setSelectedClients(clients.map(client => client.id));
   } else {
     setSelectedClients([]);
   }
 }, [allSelected, clients]);

 const LeftButtons = () => (
  <div className={styles.buttonGroup}>
    {!selectedClients.length ? (
      // Только кнопка создания
      <Button className={styles.addButton}>
        <UserPlus size={16} />
      </Button>
    ) : selectedClients.length === 1 ? (
      // Для одного выбранного клиента
      <>
        <Button className={styles.addButton}>
        <UserPlus size={16} />
        </Button>
        <Button className={styles.editButton}>
          <Pencil size={16} />
        </Button>
        <Button className={styles.copyButton}>
          <Copy size={16} />
        </Button>
        <Button className={styles.deleteButton}>
          <Trash size={16} />
        </Button>
        <Button className={styles.printButton}>
          <Printer size={16} />
        </Button>
      </>
    ) : (
      // Для нескольких выбранных клиентов
      <>
        <Button className={styles.addButton}>
        <UserPlus size={16} />
        </Button>
        <Button className={styles.editButton}>
          <Pencil size={16} />
        </Button>
        <Button className={styles.copyButton}>
          <Copy size={16} />
        </Button>
        <Button className={styles.deleteButton}>
          <Trash size={16} />
        </Button>
        <Button className={styles.mergeButton}>
          <FileText size={16} />
        </Button>
        <Button className={styles.printButton}>
          <Printer size={16} />
        </Button>
      </>
    )}
  </div>
);

 const RightButtons = () => (
   <div className={styles.buttonGroup}>
     <Button className={styles.utilityButton}><Filter size={16} /></Button>
     <Button className={styles.utilityButton}><RefreshCw size={16} /></Button>
     <Button className={styles.utilityButton}><Settings size={16} /></Button>
     <Button className={styles.utilityButton}><BarChart2 size={16} /></Button>
   </div>
 );

 return (
   <Page loading={loading} error={error}>
     <h1>Clients</h1>
     <div className={styles.buttonsContainer}>
       <LeftButtons />
       <RightButtons />
     </div>
     <Table
       columns={columns}
       initialOrder={sort}
       sort={setSort}
       loading={loading}
       allSelected={allSelected}
       toggleSelectAll={handleSelectAll}
     >
       {clients?.map(client => (
         <Row
           key={client.id}
           onSelect={() => handleSelect(client.id)}
           isSelected={selectedClients.includes(client.id)}
         >
           <Cell>{new Date(client.created_at).toLocaleDateString()}</Cell>
           <Cell>{client.name || "-"}</Cell>
           <Cell>{client.code || "-"}</Cell>
           <Cell>{client.vat_code || "-"}</Cell>
           <Cell>{client.phone || "-"}</Cell>
           <Cell>{client.email || "-"}</Cell>
         </Row>
       ))}
     </Table>
   </Page>
 );
};

export default Clients;
