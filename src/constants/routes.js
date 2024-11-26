import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Assets from "../pages/Assets";
import Cashier from "../pages/Cashier";
import Declaration from "../pages/Declaration";
import Documents from "../pages/Documents";
import GeneralLedger from "../pages/GeneralLedger";
import Personnel from "../pages/Personnel";
import Production from "../pages/Production";
import Salary from "../pages/Salary";
import Payroll from "../pages/Salary/Payroll";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Purchases from "../pages/Warehouse/Purchases";
import Sales from "../pages/Warehouse/Sales";
import Stock from "../pages/Warehouse/Stock";
import SaleAddForm from "../pages/Warehouse/Sales/SaleAddForm";
import SaleEditForm from "../pages/Warehouse/Sales/SaleEditForm";
import PurchaseAddForm from "../pages/Warehouse/Purchases/PurchaseAddForm";
import PurchaseEditForm from "../pages/Warehouse/Purchases/PurchaseEditForm";
import ClientAddForm from "../pages/Clients/ClientAddForm";
import ClientEditForm from "../pages/Clients/ClientEditForm";

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
  { path: "/general-ledger", component: GeneralLedger },
  { path: "/cashier", component: Cashier },
  { path: "/reports", component: Reports },
  { path: "/personnel", component: Personnel },
  { path: "/production", component: Production },
  { path: "/assets", component: Assets },
  { path: "/documents", component: Documents },
  { path: "/salary", component: Salary },
  { path: "/salary/payroll", component: Payroll }, // Добавляем новый маршрут
  { path: "/declaration", component: Declaration },
  { path: "/settings", component: Settings },
];

export default routes;
