import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Personnel from "../pages/Personnel";
import Production from "../pages/Production";
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
import AssetsList from "../pages/Assets/AssetsList";
import Depreciation from "../pages/Assets/Depreciation";
import Maintenance from "../pages/Assets/Maintenance";
import CashBalance from "../pages/Cashier/CashBalance";
import CashOperations from "../pages/Cashier/CashOperations";
import CashReport from "../pages/Cashier/CashReport";
import DeclarationList from "../pages/Declaration/DeclarationList";
import Statistics from "../pages/Declaration/Statistics";
import TaxReports from "../pages/Declaration/TaxReports";
import Archive from "../pages/Documents/Archive";
import DocumentsList from "../pages/Documents/DocumentsList";
import Templates from "../pages/Documents/Templates";
import ReportGenerator from "../pages/Reports/ReportGenerator";
import ReportsList from "../pages/Reports/ReportsList";
import ReportViewer from "../pages/Reports/ReportViewer";
import Preferences from "../pages/Settings/Preferences";
import Profile from "../pages/Settings/Profile";
import Security from "../pages/Settings/Security";

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
  { path: "/cashier/cash-balance", component: CashBalance },
  { path: "/cashier/cash-operations", component: CashOperations },
  { path: "/cashier/cash-report", component: CashReport },
  { path: "/reports/report-generator", component: ReportGenerator },
  { path: "/reports/reports-list", component: ReportsList },
  { path: "/reports/report-viewer", component: ReportViewer },
  { path: "/personnel", component: Personnel },
  { path: "/production", component: Production },
  { path: "/assets/assets-list", component: AssetsList },
  { path: "/assets/depreciation", component: Depreciation },
  { path: "/assets/maintenance", component: Maintenance },
  { path: "/documents/archive", component: Archive },
  { path: "/documents/documents-list", component: DocumentsList },
  { path: "/documents/templates", component: Templates },
  { path: "/salary/payroll", component: Payroll },
  { path: "/declaration/declaration-list", component: DeclarationList },
  { path: "/declaration/statistics", component: Statistics },
  { path: "/declaration/tax-reports", component: TaxReports },
  { path: "/settings/preferences", component: Preferences },
  { path: "/settings/profile", component: Profile },
  { path: "/settings/security", component: Security },
  { path: "/general-ledger/register", component: GeneralRegister },
  { path: "/general-ledger/ledger", component: GeneralLedgerContent },
  { path: "/general-ledger/settlement", component: DocSettlement },
  { path: "/general-ledger/period-closure", component: PeriodClosure },
  { path: "/general-ledger/currency-range", component: CurrencyRange },
  { path: "/general-ledger/exchange-rate", component: ExchangeRate },
  { path: "/general-ledger/chart-of-accounts", component: ChartOfAccounts },
];

export default routes;
