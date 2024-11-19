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
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Incoming from "../pages/Warehouse/Incoming";
import Sales from "../pages/Warehouse/Sales";
// Заглушки для Products и Stock
const Products = () => <div>Products Page</div>;
const Stock = () => <div>Stock Page</div>;

const routes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/clients", component: Clients },
  { path: "/assets", component: Assets }, // Поменял местами с "/warehouse/products"
  { path: "/cashier", component: Cashier }, // Поменял местами с "/warehouse/incoming"
  { path: "/declaration", component: Declaration }, // Поменял местами с "/warehouse/sales"
  { path: "/documents", component: Documents }, // Добавил недостающий маршрут
  { path: "/general-ledger", component: GeneralLedger }, // Добавил недостающий маршрут
  { path: "/personnel", component: Personnel }, // Добавил недостающий маршрут
  { path: "/production", component: Production }, // Добавил недостающий маршрут
  { path: "/salary", component: Salary }, // Добавил недостающий маршрут
  { path: "/reports", component: Reports }, // Добавил недостающий маршрут
  { path: "/settings", component: Settings }, // Добавил недостающий маршрут
  { path: "/warehouse/products", component: Products },
  { path: "/warehouse/incoming", component: Incoming },
  { path: "/warehouse/sales", component: Sales },
  { path: "/warehouse/stock", component: Stock },
];

export default routes;
