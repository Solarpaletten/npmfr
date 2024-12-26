// src/pages/Clients/ClientAddForm/index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/Page";
import { Form } from "../../../components/Modal";
import Field from "../../../components/Field";
import { useClients } from "../../../contexts/ClientContext";
import { useAuthenticatedApi } from "../../../utils/api";

const ClientAddForm = () => {
 const { refetch } = useClients();
 const [formData, setFormData] = useState({
   name: "",
   email: "",
   phone: "",
   code: "",
   vat_code: "",
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const navigate = useNavigate();
 const api = useAuthenticatedApi();

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   try {
     await api.post("/clients", formData);
     refetch();
     navigate("/clients");
   } catch (err) {
     setError("Failed to create client");
   } finally {
     setLoading(false);
   }
 };

 return (
   <Page>
     <Form
       onSubmit={handleSubmit}
       onClose={() => navigate("/clients")}
       loading={loading}
       error={error}
       buttonPositiveName="Create client"
       buttonNegativeName="Cancel"
     >
       <h2>Create client</h2>
       <Field
         label="Name"
         type="text"
         name="name"
         value={formData.name}
         onChange={e => setFormData(prev => ({...prev, name: e.target.value}))}
         disabled={loading}
         required
       />
       <Field
         label="Email"
         type="email"
         name="email"
         value={formData.email}
         onChange={e => setFormData(prev => ({...prev, email: e.target.value}))}
         disabled={loading}
         required
       />
       <Field
         label="Phone"
         type="tel"
         name="phone"
         value={formData.phone}
         onChange={e => setFormData(prev => ({...prev, phone: e.target.value}))}
         disabled={loading}
         required
       />
       <Field
         label="Code"
         type="text"
         name="code"
         value={formData.code}
         onChange={e => setFormData(prev => ({...prev, code: e.target.value}))}
         disabled={loading}
         required
       />
       <Field
         label="VAT code"
         type="text"
         name="vat_code"
         value={formData.vat_code}
         onChange={e => setFormData(prev => ({...prev, vat_code: e.target.value}))}
         disabled={loading}
         required
       />
     </Form>
   </Page>
 );
};

export default ClientAddForm;