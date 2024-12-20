import React, { useState } from "react";
import Form from "../../../../components/Form";
import { Modal } from "../../../../components/Modal";
import { useAuthenticatedApi } from "../../../../utils/api";

const AccountCopyForm = ({ onShowForm, requery, selected, setSelected }) => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const api = useAuthenticatedApi();

 const handleCopy = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError(null);

   try {
     console.log('Copying accounts:', selected);
     
     // Копируем счета последовательно, чтобы избежать конфликтов с кодами
     for (const account of selected) {
       await api.post(`/chart-of-accounts/${account.id}/copy`);
     }

     console.log('Successfully copied accounts');
     await requery();
     setSelected();
     onShowForm(false);
   } catch (error) {
     console.error('Error copying accounts:', error);
     setError(error.message || "Failed to copy account(s)");
   } finally {
     setLoading(false);
   }
 };

 return (
   <Modal>
     <Form
       onSubmit={handleCopy}
       onClose={() => onShowForm(false)}
       loading={loading}
       error={error}
       buttonPositiveName="Copy"
       buttonNegativeName="Cancel"
     >
       <h2>Copy account(s)</h2>
       <p>
         Are you sure you want to copy <b>{selected.length}</b> account(s)?
       </p>
       {selected.map(account => (
         <div key={account.id} style={{ margin: "5px 0" }}>
           {account.code} - {account.name}
         </div>
       ))}
     </Form>
   </Modal>
 );
};

export default AccountCopyForm;