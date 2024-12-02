import React, { useState, useEffect, useCallback } from "react";
import { Modal, Form } from "../../../../components/Modal";
import Field from "../../../../components/Field";
import Select from "../../../../components/Select";
import { useAuthenticatedApi } from "../../../../utils/api";
import { formatDate } from "../../../../utils";

const EditForm = ({ onShowForm, requery, selected }) => {
  const api = useAuthenticatedApi();

  const [current, setCurrent] = useState(selected);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await api.get("/employees");

      setEmployees(data);
    } catch (error) {
      setError("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/payroll/${selected.id}`, current);

      requery();

      setLoading(false);
      onShowForm(false);
    } catch (error) {
      setError("Failed to add payroll");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal>
      <Form
        onSubmit={handleAdd}
        onClose={() => onShowForm(false)}
        loading={loading}
        error={error}
        buttonPositiveName={"Save changes"}
        buttonNegativeName={"Cancel"}
      >
        <h2>Add New Payroll</h2>
        <Select
          label="Employee"
          value={current.employee_id}
          onChange={handleChange}
          options={[
            { value: "", label: "-- select option --" },
            ...employees.map(({ id, username }) => ({
              value: id,
              label: username,
            })),
          ]}
          name="employee_id"
          id="employee_id"
          disabled={loading}
          required
        />
        <Field
          type="date"
          label="Period start"
          name="period_start"
          value={formatDate(current.period_start)}
          onChange={handleChange}
          placeholder="Period start"
          disabled={loading}
          required
        />
        <Field
          type="date"
          label="Period end"
          name="period_end"
          value={formatDate(current.period_end)}
          onChange={handleChange}
          placeholder="Period end"
          disabled={loading}
          required
        />
        <Field
          type="number"
          label="Base salary"
          name="base_salary"
          placeholder="Base salary"
          value={current.base_salary}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="number"
          label="Bonus"
          name="bonus"
          placeholder="Bonus"
          value={current.bonus}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="number"
          label="Overtime hours"
          name="overtime_hours"
          placeholder="Overtime hours"
          value={current.overtime_hours}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="number"
          label="Overtime rate"
          name="overtime_rate"
          placeholder="Overtime rate"
          value={current.overtime_rate}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="number"
          label="Tax amount"
          name="tax_amount"
          placeholder="Tax amount"
          value={current.tax_amount}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Field
          type="number"
          label="Insurance amount"
          name="insurance_amount"
          placeholder="Insurance amount"
          value={current.insurance_amount}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <Select
          label="Payment status"
          value={current.currency}
          onChange={handleChange}
          options={[
            { value: "EUR", label: "EUR" },
            { value: "USD", label: "USD" },
            { value: "GBP", label: "GBP" },
          ]}
          name="currency"
          id="currency"
          disabled={loading}
          required
        />
        <Select
          label="Payment status"
          value={current.payment_status}
          onChange={handleChange}
          options={[
            { value: "pending", label: "Pending" },
            { value: "paid", label: "Paid" },
            { value: "cancelled", label: "Cancelled" },
          ]}
          name="payment_status"
          id="payment_status"
          disabled={loading}
          required
        />
      </Form>
    </Modal>
  );
};

export default EditForm;
