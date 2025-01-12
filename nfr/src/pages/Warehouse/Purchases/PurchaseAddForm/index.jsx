import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../../../components/Page";
import { Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";
import ProductCalculatorTable from "../../ProductCalculatorTable";
import { useClients } from "../../../../contexts/ClientContext";
import { usePurchases } from "../../../../contexts/PurchaseContext"; 
import { useAuthenticatedApi } from "../../../../utils/api";

const PurchaseAddForm = () => {
 const api = useAuthenticatedApi();
 const { clients, loading: clientsLoading } = useClients();
 const { purchases, loading: purchasesLoading } = usePurchases();
 
 const [mainCompany, setMainCompany] = useState(null);
 const [form, setForm] = useState({});
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const navigate = useNavigate();

 const [formData, setFormData] = useState({
   invoice_type: "purchase",
   invoice_number: "",
   purchase_date: "",
   warehouse_id: "",
   supplier_id: "",
   client_id: "",
   currency: "EUR",
   total_amount: (0).toFixed(2),
   vat_amount: (0).toFixed(2), 
   vat_rate: (0).toFixed(2),
   products: null
 });

 useEffect(() => {
   if (clients?.length) {
     const main = clients.find((client) => client.is_main);
     
     setMainCompany(main);
     setFormData(prevData => ({
       ...prevData,
       client_id: main?.id?.toString() || ""
     }));
   }
 }, [clients]);

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prevData => ({
     ...prevData,
     [name]: value
   }));
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError(null);

   try {
     await api.post("/warehouse/purchases", form);
     navigate("/warehouse/purchases");
   } catch (err) {
     setError("Failed to create purchase");
     setLoading(false);
   }
 };

 const setDataCallback = (data) => {
   setForm(data);
 };

 return (
   <Page>
     <h2>Create Purchase</h2>
     <Button disabled>Print</Button>
     
     <Form
       onSubmit={handleSubmit}
       onClose={() => navigate("/warehouse/purchases")}
       loading={loading}
       error={error}
       buttonPositiveName="Create Purchase"
       buttonNegativeName="Cancel"
       fullscreen
     >
       <div>
         <Select
           label="Invoice Type"
           name="invoice_type"
           value={formData.invoice_type}
           onChange={handleChange}
           options={[
             { value: "", label: "-- select option --" },
             { value: "purchase", label: "Purchase" }
           ]}
           disabled={loading}
           required
         />

         <Field
           type="text"
           label="Series/Number" 
           placeholder="Series/number"
           name="invoice_number"
           value={formData.invoice_number}
           onChange={handleChange}
           disabled={loading}
           required
         />

         <Field
           type="date"
           label="Purchase Date"
           name="purchase_date" 
           value={formData.purchase_date}
           onChange={handleChange}
           placeholder="Purchase date"
           disabled={loading}
           required
         />
       </div>

       <div>
         <Select
           label="Supplier/Partner"
           name="supplier_id"
           value={formData.supplier_id}
           onChange={handleChange}
           options={[
             { value: "", label: "-- select option --" },
             ...clients.map(({ id, name }) => ({
               value: id,
               label: name
             }))
           ]}
           disabled={loading || clientsLoading}
           required
         />

         <div>
           <b>Buyer/Payer: </b>
           <p>
             <b>
               {clientsLoading 
                 ? "-" 
                 : `${mainCompany?.name} (Code: ${mainCompany?.code})`}
             </b>
           </p>
         </div>
       </div>

       <div>
         <Select
           label="Currency"
           name="currency"
           value={formData.currency}
           onChange={handleChange} 
           options={[
             { value: "USD", label: "USD" },
             { value: "EUR", label: "EUR" }
           ]}
           disabled={loading}
           required
         />

         <Select
           label="Warehouse"
           name="warehouse_id"
           value={formData.warehouse_id}
           onChange={handleChange}
           options={[
             { value: "", label: "-- select option --" },
             ...purchases.map(({ id, name }) => ({
               value: id,
               label: name  
             }))
           ]}
           disabled={loading || purchasesLoading}
           required
         />
       </div>

       <ProductCalculatorTable
         setData={setDataCallback}
         loading={loading}
         data={formData}
       />

     </Form>
   </Page>
 );
};

export default PurchaseAddForm;