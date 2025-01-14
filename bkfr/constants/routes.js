// Dashboard
import Dashboard from "../pages/Dashboard";
//Clients
import Clients from "../pages/Clients";
import ClientAddForm from "../pages/Clients/ClientAddForm";
import ClientEditForm from "../pages/Clients/ClientEditForm";
//Purchases
import Purchases from "../pages/Warehouse/Purchases";
import PurchaseAddForm from "../pages/Warehouse/Purchases/PurchaseAddForm";
import PurchaseEditForm from "../pages/Warehouse/Purchases/PurchaseEditForm";
import PurchaseCopyForm from "../pages/Warehouse/Purchases/PurchaseCopyForm";
import PurchaseDeleteForm from "../pages/Warehouse/Purchases/PurchaseDeleteForm";
//Sales
import Sales from "../pages/Sales";
import SaleAddForm from "../pages/Sales/SaleAddForm";
import SaleEditForm from "../pages/Sales/SaleEditForm";
import SaleCopyForm from "../pages/Sales/SaleCopyForm";
import SaleDeleteForm from "../pages/Sales/SaleDeleteForm";
//Bank
import BankOperations from "../pages/Bank/BankOperations";
import BankOperationAddForm from "../pages/Bank/BankOperations/BankOperationAddForm";
import BankOperationEditForm from "../pages/Bank/BankOperations/BankOperationEditForm";
import ImportStatements from "../pages/Bank/ImportStatements";
import BankLink from "../pages/Bank/BankLink";
import SepaPayments from "../pages/Bank/SepaPayments";
//General Ledger  
import ChartOfAccounts from "../pages/GeneralLedger/ChartOfAccounts";
import AccountAddForm from "../pages/GeneralLedger/ChartOfAccounts/AccountAddForm";
import AccountEditForm from "../pages/GeneralLedger/ChartOfAccounts/AccountEditForm";
import GeneralRegister from "../pages/GeneralLedger/GeneralRegister";
import GeneralLedgerContent from "../pages/GeneralLedger/GeneralLedgerContent";
import DocSettlement from "../pages/GeneralLedger/DocSettlement";
import PeriodClosure from "../pages/GeneralLedger/PeriodClosure";
import CurrencyRange from "../pages/GeneralLedger/CurrencyRange";
import ExchangeRate from "../pages/GeneralLedger/ExchangeRate";
//Reference Book
import ProductCards from "../pages/ReferenceBook/ProductCards";
import WarehouseReferences from "../pages/ReferenceBook/WarehouseReferences";
import Locations from "../pages/ReferenceBook/Locations";
import Banks from "../pages/ReferenceBook/Banks";
import CorrespondentBanks from "../pages/ReferenceBook/CorrespondentBanks";
import Currencies from "../pages/ReferenceBook/Currencies";
import CurrencyRates from "../pages/ReferenceBook/CurrencyRates";
//Personnel
import Departments from "../pages/Personnel/Departments";
import EmployeeList from "../pages/Personnel/EmployeeList";
import Positions from "../pages/Personnel/Positions";
//Production
import ProductionOrders from "../pages/Production/ProductionOrders";
import ProductionPlans from "../pages/Production/ProductionPlans";
import WorkshopManagement from "../pages/Production/WorkshopManagement";
//Assets
import AssetsList from "../pages/Assets/AssetsList";
import Depreciation from "../pages/Assets/Depreciation";
import Maintenance from "../pages/Assets/Maintenance";
//Documents
import Archive from "../pages/Documents/Archive";
import DocumentsList from "../pages/Documents/DocumentsList";
import Templates from "../pages/Documents/Templates";
//Reports
import ReportGenerator from "../pages/Reports/ReportGenerator";
import ReportsList from "../pages/Reports/ReportsList";
import ReportViewer from "../pages/Reports/ReportViewer";
//Salary
import Payroll from "../pages/Salary/Payroll";
import Timesheets from "../pages/Salary/Timesheets";
import WorkSchedule from "../pages/Salary/WorkSchedule";
import WagePrints from "../pages/Salary/WagePrints";
import SalaryReferenceBook from "../pages/Salary/SalaryReferenceBook";
//Declaration
import VatDeclaration from "../pages/Declaration/VatDeclaration";
import TaxDeclaration from "../pages/Declaration/TaxDeclaration";
import StatisticalDeclaration from "../pages/Declaration/StatisticalDeclaration";
import CustomsDeclaration from "../pages/Declaration/CustomsDeclaration";
//Cashier
import CashBalance from "../pages/Cashier/CashBalance";
import CashOperations from "../pages/Cashier/CashOperations";
import CashReport from "../pages/Cashier/CashReport";
//Settings
import Preferences from "../pages/Settings/Preferences";
import Profile from "../pages/Settings/Profile";
import Security from "../pages/Settings/Security";

// Оставляем все импорты как есть...

const routes = [
  { path: "/dashboard", element: <Dashboard /> },
  //Clients
  { path: "/clients", element: <Clients /> },
  { path: "/clients/create", element: <ClientAddForm /> },
  { path: "/clients/edit/:id", element: <ClientEditForm /> },
  //Purchases
  { path: "/warehouse/purchases", element: <Purchases /> },
  { path: "/warehouse/purchases/create", element: <PurchaseAddForm /> },
  { path: "/warehouse/purchases/edit/:id", element: <PurchaseEditForm /> },
  { path: "/warehouse/purchases/copy/:id", element: <PurchaseCopyForm /> },
  { path: "/warehouse/purchases/delete/:id", element: <PurchaseDeleteForm /> },
  //Sales
  { path: "/sales", element: <Sales /> },
  { path: "/sales/create", element: <SaleAddForm /> },
  { path: "/sales/edit/:id", element: <SaleEditForm /> },
  { path: "/sales/copy/:id", element: <SaleCopyForm /> },
  { path: "/sales/delete/:id", element: <SaleDeleteForm /> },
  //Bank
  { path: "/bank/operations", element: <BankOperations /> },
  { path: "/bank/operations/create", element: <BankOperationAddForm /> },
  { path: "/bank/operations/edit/:id", element: <BankOperationEditForm /> },
  { path: "/bank/import-statements", element: <ImportStatements /> },
  { path: "/bank/correspondent-links", element: <BankLink /> },
  { path: "/bank/sepa-payments", element: <SepaPayments /> },
  //General Ledger
  { path: "/general-ledger/register", element: <GeneralRegister /> },
  { path: "/general-ledger/ledger", element: <GeneralLedgerContent /> },
  { path: "/general-ledger/settlement", element: <DocSettlement /> },
  { path: "/general-ledger/period-closure", element: <PeriodClosure /> },
  { path: "/general-ledger/currency-range", element: <CurrencyRange /> },
  { path: "/general-ledger/exchange-rate", element: <ExchangeRate /> },
  { path: "/general-ledger/chart-of-accounts", element: <ChartOfAccounts /> },
  { path: "/general-ledger/chart-of-accounts/create", element: <AccountAddForm /> },
  { path: "/general-ledger/chart-of-accounts/edit/:id", element: <AccountEditForm /> },
  //Reference Book
  { path: "/references/product-cards", element: <ProductCards /> },
  { path: "/references/warehouse", element: <WarehouseReferences /> },
  { path: "/references/locations", element: <Locations /> },
  { path: "/references/banks", element: <Banks /> },
  { path: "/references/correspondent-banks", element: <CorrespondentBanks /> },
  { path: "/references/currencies", element: <Currencies /> },
  { path: "/references/currency-rates", element: <CurrencyRates /> },
  //Personnel
  { path: "/personnel/departments", element: <Departments /> },
  { path: "/personnel/employee-list", element: <EmployeeList /> },
  { path: "/personnel/positions", element: <Positions /> },
  //Production
  { path: "/production/production-orders", element: <ProductionOrders /> },
  { path: "/production/production-plans", element: <ProductionPlans /> },
  { path: "/production/workshop-management", element: <WorkshopManagement /> },
  //Assets
  { path: "/assets/assets-list", element: <AssetsList /> },
  { path: "/assets/depreciation", element: <Depreciation /> },
  { path: "/assets/maintenance", element: <Maintenance /> },
  //Documents
  { path: "/documents/archive", element: <Archive /> },
  { path: "/documents/documents-list", element: <DocumentsList /> },
  { path: "/documents/templates", element: <Templates /> },
  //Reports
  { path: "/reports/report-generator", element: <ReportGenerator /> },
  { path: "/reports/reports-list", element: <ReportsList /> },
  { path: "/reports/report-viewer", element: <ReportViewer /> },
  //Salary
  { path: "/salary/payroll", element: <Payroll /> },
  { path: "/salary/timesheets", element: <Timesheets /> },
  { path: "/salary/schedule", element: <WorkSchedule /> },
  { path: "/salary/wage-prints", element: <WagePrints /> },
  { path: "/salary/reference", element: <SalaryReferenceBook /> },
  //Declaration
  { path: "/declaration/vat", element: <VatDeclaration /> },
  { path: "/declaration/tax", element: <TaxDeclaration /> },
  { path: "/declaration/statistical", element: <StatisticalDeclaration /> },
  { path: "/declaration/customs", element: <CustomsDeclaration /> },
  //Cashier
  { path: "/cashier/cash-balance", element: <CashBalance /> },
  { path: "/cashier/cash-operations", element: <CashOperations /> },
  { path: "/cashier/cash-report", element: <CashReport /> },
  //Settings
  { path: "/settings/preferences", element: <Preferences /> },
  { path: "/settings/profile", element: <Profile /> },
  { path: "/settings/security", element: <Security /> }
];

export default routes;