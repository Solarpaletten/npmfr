import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Page from "../../../components/Page";
import Toolbar from "../../../components/Toolbar";
import SearchField from "../../../components/SearchField";
import { Table, Row, Cell } from "../../../components/Table";
import Button from "../../../components/Button";
import AccountCopyForm from "./AccountCopyForm";
import AccountDeleteForm from "./AccountDeleteForm";
import AccountImportForm from "./AccountImportForm";
import { useAccounts } from "../../../contexts/AccountContext";
import columns from "./columns";
import {
 faTrashCan,
 faCopy,
 faPenToSquare,
 faPlus,
 faUpload,
} from "@fortawesome/free-solid-svg-icons";

const FormPortal = ({ show, children }) => {
  return show ? createPortal(children, document.body) : null;
};

const ChartOfAccounts = () => {
 const {
   accounts,
   refetch,
   loading: accountsLoading,
   error: accountsError,
 } = useAccounts();

 const [searchTerm, setSearchTerm] = useState("");
 const [sort, setSort] = useState({ sort: "code", order: "ASC" });
 const [showCopyForm, setShowCopyForm] = useState(false);
 const [showDeleteForm, setShowDeleteForm] = useState(false);
 const [selected, setSelected] = useState([]);
 const [allSelected, setAllSelected] = useState(false);
 const [showImportForm, setShowImportForm] = useState(false);
 
 const navigate = useNavigate();

 useEffect(() => {
   console.log('ChartOfAccounts state:', {
     accountsLength: accounts?.length || 0,
     loading: accountsLoading,
     error: accountsError,
     searchTerm,
     sort
   });
 }, [accounts, accountsLoading, accountsError, searchTerm, sort]);

 useEffect(() => {
   if (accountsLoading) {
     console.log('Loading accounts...');
   } else if (accountsError) {
     console.error('Error loading accounts:', accountsError);
   } else if (accounts?.length > 0) {
     console.log('Accounts loaded successfully:', accounts.length, accounts);
   } else {
     console.log('No accounts loaded or empty array');
   }
 }, [accounts, accountsLoading, accountsError]);

 const selectedAccounts = accounts?.filter((account) =>
   selected.includes(account.id)
 ) || [];
 const selectedAccountsQty = selectedAccounts?.length || 0;

 useEffect(() => {
   if (allSelected) {
     setSelected(accounts?.map((account) => account.id) || []);
   } else {
     setSelected([]);
   }
 }, [allSelected, accounts]);

 const handleSelectAll = () => {
   setAllSelected((prev) => !prev);
 };

 const handleSelect = (id) => {
   setSelected((prev) => {
     if (prev.includes(id)) {
       return prev.filter((item_id) => item_id !== id);
     } 
       return [...prev, id];
   });
 };

 const resetSelection = () => {
  setSelected([]);
  setAllSelected(false);
};

const handleRequery = () => refetch({ searchTerm, ...sort });

 if (accounts === null || accounts === undefined) {
   console.log('Accounts data is null/undefined');
   return (
     <Page loading={accountsLoading} error={accountsError}>
       <h1>Chart of Accounts</h1>
       {accountsLoading ? (
         <p>Loading accounts...</p>
       ) : (
         <p>No accounts data available</p>
       )}
     </Page>
   );
 }

 return (
   <Page loading={accountsLoading} error={accountsError}>
     <h1>Chart of Accounts</h1>

     {accounts.length > 0 && (
       <p>Total accounts: {accounts.length}</p>
     )}

     <Toolbar>
       <div className="toolbar-buttons">
       <Button 
      size="small"
      icon={faPlus}
      onClick={() => navigate("/general-ledger/chart-of-accounts/create")}
      disabled={accountsLoading}
    >
      Add new account
    </Button>
    <Button 
      size="small"
      icon={faUpload} 
      onClick={() => setShowImportForm(true)}
      disabled={accountsLoading}
    >
      Import accounts
    </Button>
    <Button 
      size="small"
      icon={faCopy}
      onClick={() => setShowCopyForm(true)}
      disabled={!selectedAccountsQty || accountsLoading}
    >
           Copy{selectedAccountsQty ? ` ${selectedAccountsQty} item(s)` : ""}
         </Button>
         <Button 
           size="small"
           variant="danger"
           icon={faTrashCan}
           onClick={() => setShowDeleteForm(true)}
           disabled={!selectedAccountsQty || accountsLoading}
         >
           Delete{selectedAccountsQty ? ` ${selectedAccountsQty} item(s)` : ""}
         </Button>
         </div>

       <SearchField
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         disabled={accountsLoading}
       />
     </Toolbar>
     
     {showImportForm && (
        <AccountImportForm onClose={() => setShowImportForm(false)} />
      )}

     {accounts.length === 0 ? (
       <div style={{ padding: "20px 0" }}>
         <p>No accounts found</p>
         {!accountsLoading && !accountsError && (
           <p>Try adding a new account using the button above</p>
         )}
       </div>
     ) : (
       <Table
         columns={columns}
         initialOrder={sort}
         sort={setSort}
         loading={accountsLoading}
         allSelected={allSelected}
         toggleSelectAll={handleSelectAll}
       >
         {accounts.map((account) => (
           <Row
             key={account.id}
             onSelect={() => handleSelect(account.id)}
             isSelected={selected.includes(account.id)}
           >
             <Cell>{account.code}</Cell>
             <Cell>{account.name}</Cell>
             <Cell>{account.account_type || "-"}</Cell>
             <Cell>{account.parent_code || "-"}</Cell>
             <Cell>{account.is_active ? "Yes" : "No"}</Cell>
             <Cell align="right">
               <Button
                 icon={faPenToSquare}
                 onClick={() => navigate(`/general-ledger/chart-of-accounts/edit/${account.id}`)}
               >
                 Edit
               </Button>
             </Cell>
           </Row>
         ))}
       </Table>
     )}

      <FormPortal show={showCopyForm}>
        <AccountCopyForm
          selected={selectedAccounts}
          setSelected={resetSelection}
          onShowForm={setShowCopyForm}
          requery={handleRequery}
        />
      </FormPortal>

      <FormPortal show={showDeleteForm}>
        <AccountDeleteForm
          selected={selectedAccounts}
          setSelected={resetSelection}
          onShowForm={setShowDeleteForm}
          requery={handleRequery}
        />
      </FormPortal>
   </Page>
 );
};

export default ChartOfAccounts;