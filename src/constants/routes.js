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
import Salary from "../pages/Salary";
import Payroll from "../pages/Salary/Payroll";
import Purchases from "../pages/Warehouse/Purchases";
import Sales from "../pages/Warehouse/Sales";
import Stock from "../pages/Warehouse/Stock";
import SaleAddForm from "../pages/Warehouse/Sales/SaleAddForm";
import SaleEditForm from "../pages/Warehouse/Sales/SaleEditForm";
import PurchaseAddForm from "../pages/Warehouse/Purchases/PurchaseAddForm";
import PurchaseEditForm from "../pages/Warehouse/Purchases/PurchaseEditForm";
import ClientAddForm from "../pages/Clients/ClientAddForm";
import ClientEditForm from "../pages/Clients/ClientEditForm";
import GeneralRegister from "../pages/GeneralLedger/GeneralRegister";
import GeneralLedgerContent from "../pages/GeneralLedger/GeneralLedgerContent";
import DocSettlement from "../pages/GeneralLedger/DocSettlement";
import PeriodClosure from "../pages/GeneralLedger/PeriodClosure";
import CurrencyRange from "../pages/GeneralLedger/CurrencyRange";
import ExchangeRate from "../pages/GeneralLedger/ExchangeRate";
import ChartOfAccounts from "../pages/GeneralLedger/ChartOfAccounts";

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
  {
    path: "/general-ledger/register",
    component: GeneralRegister,
  },
  {
    path: "/general-ledger/ledger",
    component: GeneralLedgerContent,
  },
  {
    path: "/general-ledger/settlement",
    component: DocSettlement,
  },
  {
    path: "/general-ledger/period-closure",
    component: PeriodClosure,
  },
  {
    path: "/general-ledger/currency-range",
    component: CurrencyRange,
  },
  {
    path: "/general-ledger/exchange-rate",
    component: ExchangeRate,
  },
  {
    path: "/general-ledger/chart-of-accounts",
    component: ChartOfAccounts,
  },
];

export default routes;
