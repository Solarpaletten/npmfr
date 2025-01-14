import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../../../components/Page";
import Form from "../../../../components/Form";
import Field from "../../../../components/Field";
import { useAccounts } from "../../../../contexts/AccountContext";
import { useAuthenticatedApi } from "../../../../utils/api";

const AccountEditForm = () => {
 const { refetch } = useAccounts();
 const { id } = useParams();
 const [formData, setFormData] = useState({
   code: "",
   name: "",
   account_type: "",
   parent_code: "",
   is_active: true
 });

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const navigate = useNavigate();
 const api = useAuthenticatedApi();

 const fetchData = useCallback(async () => {
   setLoading(true);
   setError(null);

   try {
     console.log('Fetching account:', id);
     const data = await api.get(`/chart-of-accounts/${id}`);
     console.log('Received account data:', data);
     setFormData(data);
   } catch (error) {
     console.error('Error fetching account:', error);
     setError(error.message || "Failed to fetch account");
   } finally {
     setLoading(false);
   }
 }, [id, api]);

 useEffect(() => {
   fetchData();
 }, [fetchData]);

 const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
   const newValue = type === 'checkbox' ? checked : value;

   setFormData((prevData) => ({
     ...prevData,
     [name]: newValue,
   }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError(null);

   try {
     console.log('Updating account:', {
       id,
       formData
     });

     await api.put(`/chart-of-accounts/${id}`, formData);
     await refetch();
     navigate("/general-ledger/chart-of-accounts");
   } catch (err) {
     console.error('Error updating account:', err);
     setError(err.message || "Failed to update account");
     setLoading(false);
   }
 };

 return (
   <Page>
     <Form
       onSubmit={handleSubmit}
       onClose={() => navigate("/general-ledger/chart-of-accounts")}
       loading={loading}
       error={error}
       buttonPositiveName="Save changes"
       buttonNegativeName="Cancel"
     >
       <h2>Edit account</h2>
       <Field
         type="text"
         placeholder="Code"
         name="code"
         value={formData.code}
         onChange={handleChange}
         disabled={loading}
         required
       />
       <Field
         type="text"
         name="name"
         value={formData.name}
         onChange={handleChange}
         placeholder="Name"
         disabled={loading}
         required
       />
       <Field
         type="text"
         name="account_type"
         value={formData.account_type}
         onChange={handleChange}
         placeholder="Account type"
         disabled={loading}
       />
       <Field
         type="text"
         name="parent_code"
         value={formData.parent_code}
         onChange={handleChange}
         placeholder="Parent code"
         disabled={loading}
       />
       <div className="checkbox-group">
         <label>
           <Field
             type="checkbox"
             name="is_active"
             checked={formData.is_active}
             onChange={handleChange}
             disabled={loading}
           />
           Active
         </label>
       </div>
     </Form>
   </Page>
 );
};

export default AccountEditForm;