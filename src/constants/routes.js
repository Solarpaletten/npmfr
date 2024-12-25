// // Dashboard
// import Dashboard from "../pages/Dashboard";
//Clients
import Clients from "../pages/Clients";
import ClientAddForm from "../pages/Clients/ClientAddForm";
import ClientEditForm from "../pages/Clients/ClientEditForm";
//Warehouse
import Purchases from "../pages/Warehouse/Purchases";
import Sales from "../pages/Warehouse/Sales";
import SaleAddForm from "../pages/Warehouse/Sales/SaleAddForm";
import SaleEditForm from "../pages/Warehouse/Sales/SaleEditForm";
import PurchaseAddForm from "../pages/Warehouse/Purchases/PurchaseAddForm";
import PurchaseEditForm from "../pages/Warehouse/Purchases/PurchaseEditForm";
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

const routes = [
  // { path: "/dashboard", component: Dashboard },
  //Clients
  { path: "/clients", component: Clients },
  { path: "/clients/create", component: ClientAddForm },
  { path: "/clients/edit/:id", component: ClientEditForm },
  //Warehouse
  { path: "/warehouse/purchases", component: Purchases },
  { path: "/warehouse/purchases/create", component: PurchaseAddForm },
  { path: "/warehouse/purchases/edit/:id", component: PurchaseEditForm },
  { path: "/warehouse/sales", component: Sales },
  { path: "/warehouse/sales/create", component: SaleAddForm },
  { path: "/warehouse/sales/edit/:id", component: SaleEditForm },
  //Bank
  { path: "/bank/operations", component: BankOperations },
  { path: "/bank/operations/create", component: BankOperationAddForm },
  { path: "/bank/operations/edit/:id", component: BankOperationEditForm },
  { path: "/bank/import-statements", component: ImportStatements },
  { path: "/bank/correspondent-links", component: BankLink },
  { path: "/bank/sepa-payments", component: SepaPayments },
  //General Ledger
  { path: "/general-ledger/register", component: GeneralRegister },
  { path: "/general-ledger/ledger", component: GeneralLedgerContent },
  { path: "/general-ledger/settlement", component: DocSettlement },
  { path: "/general-ledger/period-closure", component: PeriodClosure },
  { path: "/general-ledger/currency-range", component: CurrencyRange },
  { path: "/general-ledger/exchange-rate", component: ExchangeRate },
  { path: "/general-ledger/chart-of-accounts", component: ChartOfAccounts },
  { path: "/general-ledger/chart-of-accounts/create", component: AccountAddForm },
  { path: "/general-ledger/chart-of-accounts/edit/:id", component: AccountEditForm },
  //Reference Book
  { path: "/references/product-cards", component: ProductCards },
  { path: "/references/warehouse", component: WarehouseReferences },
  { path: "/references/locations", component: Locations },
  { path: "/references/banks", component: Banks },
  { path: "/references/correspondent-banks", component: CorrespondentBanks },
  { path: "/references/currencies", component: Currencies },
  { path: "/references/currency-rates", component: CurrencyRates },
  //Personnel
  { path: "/personnel/departments", component: Departments },
  { path: "/personnel/employee-list", component: EmployeeList },
  { path: "/personnel/positions", component: Positions },
  //Production
  { path: "/production/production-orders", component: ProductionOrders },
  { path: "/production/production-plans", component: ProductionPlans },
  { path: "/production/workshop-management", component: WorkshopManagement },
  //Assets
  { path: "/assets/assets-list", component: AssetsList },
  { path: "/assets/depreciation", component: Depreciation },
  { path: "/assets/maintenance", component: Maintenance },
  //Documents
  { path: "/documents/archive", component: Archive },
  { path: "/documents/documents-list", component: DocumentsList },
  { path: "/documents/templates", component: Templates },
  //Reports
  { path: "/reports/report-generator", component: ReportGenerator },
  { path: "/reports/reports-list", component: ReportsList },
  { path: "/reports/report-viewer", component: ReportViewer },
  //Salary
  { path: "/salary/payroll", component: Payroll },
  { path: "/salary/timesheets", component: Timesheets },
  { path: "/salary/schedule", component: WorkSchedule },
  { path: "/salary/wage-prints", component: WagePrints },
  { path: "/salary/reference", component: SalaryReferenceBook },
  //Declaration
  { path: "/declaration/vat", component: VatDeclaration },
  { path: "/declaration/tax", component: TaxDeclaration },
  { path: "/declaration/statistical", component: StatisticalDeclaration },
  { path: "/declaration/customs", component: CustomsDeclaration },
  //Cashier
  { path: "/cashier/cash-balance", component: CashBalance },
  { path: "/cashier/cash-operations", component: CashOperations },
  { path: "/cashier/cash-report", component: CashReport },
  { path: "/settings/preferences", component: Preferences },
  { path: "/settings/profile", component: Profile },
  { path: "/settings/security", component: Security },
];

export default routes;
