import React, { useState, useEffect } from "react";
import { Table, Button, Tabs, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Incoming from "./Incoming";
import Sales from "./Sales";
import { useAuthenticatedApi } from "../../utils/api";
import styles from "./index.module.css";

const { TabPane } = Tabs;

function Warehouse() {
  const api = useAuthenticatedApi();
  const [activeTab, setActiveTab] = useState("incoming");
  const [incomingData, setIncomingData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showIncomingModal, setShowIncomingModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [incomingRes, salesRes] = await Promise.all([
        api.get("/warehouse/incoming"),
        api.get("/warehouse/sales"),
      ]);
      setIncomingData(incomingRes.data);
      setSalesData(salesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Колонки для таблицы поступлений
  const incomingColumns = [
    { title: "Код товара", dataIndex: "product_code", key: "product_code" },
    { title: "Название", dataIndex: "product_name", key: "product_name" },
    { title: "Количество", dataIndex: "quantity", key: "quantity" },
    {
      title: "Цена за ед.",
      dataIndex: "price_per_unit",
      key: "price_per_unit",
    },
    { title: "Сумма", dataIndex: "total_amount", key: "total_amount" },
    { title: "Поставщик", dataIndex: "supplier", key: "supplier" },
    { title: "Дата", dataIndex: "document_date", key: "document_date" },
    {
      title: "№ накладной",
      dataIndex: "invoice_number",
      key: "invoice_number",
    },
  ];

  const salesColumns = [
    { title: "Код товара", dataIndex: "product_code", key: "product_code" },
    { title: "Количество", dataIndex: "quantity", key: "quantity" },
    {
      title: "Цена продажи",
      dataIndex: "price_per_unit",
      key: "price_per_unit",
    },
    { title: "Клиент", dataIndex: "client", key: "client" },
    { title: "Дата", dataIndex: "document_date", key: "document_date" },
    {
      title: "№ накладной",
      dataIndex: "invoice_number",
      key: "invoice_number",
    },
    { title: "Тип оплаты", dataIndex: "payment_type", key: "payment_type" },
  ];

  const filteredIncomingData = incomingData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const filteredSalesData = salesData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Input
          placeholder="Поиск..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            activeTab === "incoming"
              ? setShowIncomingModal(true)
              : setShowSalesModal(true)
          }
        >
          {activeTab === "incoming" ? "Новое поступление" : "Новая продажа"}
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Поступления" key="incoming">
          <Table
            columns={incomingColumns}
            dataSource={filteredIncomingData}
            loading={loading}
            rowKey="id"
            scroll={{ x: true }}
          />
        </TabPane>
        <TabPane tab="Продажи" key="sales">
          <Table
            columns={salesColumns}
            dataSource={filteredSalesData}
            loading={loading}
            rowKey="id"
            scroll={{ x: true }}
          />
        </TabPane>
      </Tabs>

      {showIncomingModal && (
        <Incoming
          onClose={() => {
            setShowIncomingModal(false);
            fetchData();
          }}
        />
      )}

      {showSalesModal && (
        <Sales
          onClose={() => {
            setShowSalesModal(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

export default Warehouse;
