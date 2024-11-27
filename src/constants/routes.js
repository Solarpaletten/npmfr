// Импорты основных компонентов
import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Assets from "../pages/Assets";
import Cashier from "../pages/Cashier";
import Declaration from "../pages/Declaration";
import Documents from "../pages/Documents";
import Personnel from "../pages/Personnel";
import Production from "../pages/Production";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

// Импорты компонентов Salary
import Salary from "../pages/Salary";
import Payroll from "../pages/Salary/Payroll";

// Импорты компонентов Warehouse
import Purchases from "../pages/Warehouse/Purchases";
import Sales from "../pages/Warehouse/Sales";
import Stock from "../pages/Warehouse/Stock";
import SaleAddForm from "../pages/Warehouse/Sales/SaleAddForm";
import SaleEditForm from "../pages/Warehouse/Sales/SaleEditForm";
import PurchaseAddForm from "../pages/Warehouse/Purchases/PurchaseAddForm";
import PurchaseEditForm from "../pages/Warehouse/Purchases/PurchaseEditForm";

// Импорты компонентов Clients
import ClientAddForm from "../pages/Clients/ClientAddForm";
import ClientEditForm from "../pages/Clients/ClientEditForm";

// Импорты компонентов GeneralLedger
import GeneralLedger from '../pages/GeneralLedger';
import GeneralRegister from '../pages/GeneralLedger/GeneralRegister';
import GeneralLedgerContent from '../pages/GeneralLedger/GeneralLedgerContent';
import DocSettlement from '../pages/GeneralLedger/DocSettlement';
import PeriodClosure from '../pages/GeneralLedger/PeriodClosure';
import CurrencyRange from '../pages/GeneralLedger/CurrencyRange';
import ExchangeRate from '../pages/GeneralLedger/ExchangeRate';
import ChartOfAccounts from '../pages/GeneralLedger/ChartOfAccounts';

const routes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/clients", component: Clients },
  { path: "/clients/create", component: ClientAddForm },
  { path: "/clients/edit/:id", component: ClientEditForm },
  { path: "/warehouse/purchases", component: Purchases },
  { path: "/warehouse/purchases/create", component: PurchaseAddForm },
  { path: "/warehouse/purchases/edit/:id", component: PurchaseEditForm },
  { path: "/warehouse/sales", component: Sales },
  { path: "/warehouse/sales/create", component: SaleAddForm },
  { path: "/warehouse/sales/edit/:id", component: SaleEditForm },
  { path: "/warehouse/stock", component: Stock },
  { path: "/cashier", component: Cashier },
  { path: "/reports", component: Reports },
  { path: "/personnel", component: Personnel },
  { path: "/production", component: Production },
  { path: "/assets", component: Assets },
  { path: "/documents", component: Documents },
  { path: "/salary", component: Salary },
  { path: "/salary/payroll", component: Payroll },
  { path: "/declaration", component: Declaration },
  { path: "/settings", component: Settings },

  // General Ledger Routes
  { 
    path: "/general-ledger", 
    component: GeneralLedger, 
    label: "General Ledger",
    subItems: [
      { path: "/general-ledger/register", component: GeneralRegister, label: "General Register" },
      { path: "/general-ledger/ledger", component: GeneralLedgerContent, label: "General Ledger Content" },
      { path: "/general-ledger/settlement", component: DocSettlement, label: "Document Settlement" },
      { path: "/general-ledger/period-closure", component: PeriodClosure, label: "Period Closure" },
      { path: "/general-ledger/currency-range", component: CurrencyRange, label: "Currency Range" },
      { path: "/general-ledger/exchange-rate", component: ExchangeRate, label: "Exchange Rate" },
      { path: "/general-ledger/chart-of-accounts", component: ChartOfAccounts, label: "Chart of Accounts" },
    ],
  },
];

export default routes;