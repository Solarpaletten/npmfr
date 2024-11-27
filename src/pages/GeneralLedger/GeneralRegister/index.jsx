// src/pages/GeneralLedger/index.jsx
import React from 'react';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { 
  BookOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SwapOutlined,
  BankOutlined,
  ApartmentOutlined,
  BarsOutlined
} from '@ant-design/icons';
import styles from './index.module.css';

const { SubMenu } = Menu;

const GeneralLedger = () => {
  return (
    <div className={styles.container}>
      <Menu
        mode="inline"
        className={styles.menu}
        defaultOpenKeys={['financial', 'costCenters']}
      >
        <Menu.Item key="generalRegister" icon={<BookOutlined />}>
          <Link to="register">General register</Link>
        </Menu.Item>

        <Menu.Item key="generalLedger" icon={<FileTextOutlined />}>
          <Link to="ledger">General ledger</Link>
        </Menu.Item>

        <Menu.Item key="docSettlement" icon={<FileTextOutlined />}>
          <Link to="settlement">Doc. settlement</Link>
        </Menu.Item>

        <Menu.Item key="periodClosure" icon={<ClockCircleOutlined />}>
          <Link to="period-closure">Period closure</Link>
        </Menu.Item>

        <Menu.Item key="currencyRange" icon={<DollarOutlined />}>
          <Link to="currency-range">Currency exchange rate range</Link>
        </Menu.Item>

        <Menu.Item key="exchangeRate" icon={<SwapOutlined />}>
          <Link to="exchange-rate">Exchange rate conversion</Link>
        </Menu.Item>

        <SubMenu 
          key="financial" 
          icon={<BankOutlined />} 
          title="Financial accountability articles"
        >
          {/* Подпункты для financial */}
        </SubMenu>

        <SubMenu 
          key="costCenters" 
          icon={<ApartmentOutlined />} 
          title="Cost centers"
        >
          {/* Подпункты для cost centers */}
        </SubMenu>

        <Menu.Item key="chartOfAccounts" icon={<BarsOutlined />}>
          <Link to="chart-of-accounts">Chart of accounts</Link>
        </Menu.Item>
      </Menu>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default GeneralLedger;