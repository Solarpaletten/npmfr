import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, DatePicker, Select, InputNumber, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import styles from './index.module.css';



const Payroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [employees, setEmployees] = useState([]); // Для списка сотрудников

  // Получение данных
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/payroll");
      setData(response.data);
    } catch (error) {
      message.error("Error loading payroll data");
    } finally {
      setLoading(false);
    }
  };

  // Получение списка сотрудников
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      message.error("Error loading employees");
    }
  };

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, []);

  // Колонки таблицы
  const columns = [
    {
      title: "Employee",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Period Start",
      dataIndex: "period_start",
      key: "period_start",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Period End",
      dataIndex: "period_end",
      key: "period_end",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Base Salary",
      dataIndex: "base_salary",
      key: "base_salary",
      render: (text, record) => `${text} ${record.currency}`,
    },
    {
      title: "Bonus",
      dataIndex: "bonus",
      key: "bonus",
      render: (text, record) => text ? `${text} ${record.currency}` : "-",
    },
    {
      title: "Net Salary",
      dataIndex: "net_salary",
      key: "net_salary",
      render: (text, record) => `${text} ${record.currency}`,
    },
    {
      title: "Status",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Обработчики
  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    form.setFieldsValue({
      ...record,
      period_start: moment(record.period_start),
      period_end: moment(record.period_end),
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/payroll/${id}`);
      message.success("Record deleted successfully");
      fetchData();
    } catch (error) {
      message.error("Error deleting record");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Форматируем даты
      values.period_start = values.period_start.format("YYYY-MM-DD");
      values.period_end = values.period_end.format("YYYY-MM-DD");

      if (editingId) {
        await axios.put(`/api/payroll/${editingId}`, values);
        message.success("Record updated successfully");
      } else {
        await axios.post("/api/payroll", values);
        message.success("Record created successfully");
      }

      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Error saving record");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Payroll Management</h1>
        <Button type="primary" onClick={handleAdd}>
          Add New Record
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingId ? "Edit Payroll Record" : "Add Payroll Record"}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical" className={styles.form}>
          <Form.Item
            name="employee_id"
            label="Employee"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <Select className={styles.select}>
              {employees.map(emp => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="period_start"
            label="Period Start"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <DatePicker className={styles.datePicker} />
          </Form.Item>

          <Form.Item
            name="period_end"
            label="Period End"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <DatePicker className={styles.datePicker} />
          </Form.Item>

          <Form.Item
            name="base_salary"
            label="Base Salary"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <InputNumber min={0} className={styles.inputNumber} />
          </Form.Item>

          <Form.Item 
            name="bonus" 
            label="Bonus"
            className={styles.formItem}
          >
            <InputNumber min={0} className={styles.inputNumber} />
          </Form.Item>

          <Form.Item 
            name="overtime_hours" 
            label="Overtime Hours"
            className={styles.formItem}
          >
            <InputNumber min={0} className={styles.inputNumber} />
          </Form.Item>

          <Form.Item 
            name="overtime_rate" 
            label="Overtime Rate"
            className={styles.formItem}
          >
            <InputNumber min={0} className={styles.inputNumber} />
          </Form.Item>

          <Form.Item
            name="tax_amount"
            label="Tax Amount"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <InputNumber min={0} className={styles.inputNumber} />
          </Form.Item>

          <Form.Item
            name="insurance_amount"
            label="Insurance Amount"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <InputNumber min={0} className={styles.inputNumber} />
          </Form.Item>

          <Form.Item
            name="payment_status"
            label="Payment Status"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <Select className={styles.select}>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="paid">Paid</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true }]}
            className={styles.formItem}
          >
            <Select className={styles.select}>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="GBP">GBP</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Payroll;