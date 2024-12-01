import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Payroll from "../pages/Salary/Payroll";
import Timesheets from "../pages/Salary/Timesheets";
import WorkSchedule from "../pages/Salary/WorkSchedule";
import WagePrints from "../pages/Salary/WagePrints";
import SalaryReferenceBook from "../pages/Salary/SalaryReferenceBook";
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
import VatDeclaration from "../pages/Declaration/VatDeclaration";
import TaxDeclaration from "../pages/Declaration/TaxDeclaration";
import StatisticalDeclaration from "../pages/Declaration/StatisticalDeclaration";
import CustomsDeclaration from "../pages/Declaration/CustomsDeclaration";
import Archive from "../pages/Documents/Archive";
import DocumentsList from "../pages/Documents/DocumentsList";
import Templates from "../pages/Documents/Templates";
import ReportGenerator from "../pages/Reports/ReportGenerator";
import ReportsList from "../pages/Reports/ReportsList";
import ReportViewer from "../pages/Reports/ReportViewer";
import Preferences from "../pages/Settings/Preferences";
import Profile from "../pages/Settings/Profile";
import Security from "../pages/Settings/Security";
import ProductCards from "../pages/ReferenceBook/ProductCards";
import WarehouseReferences from "../pages/ReferenceBook/WarehouseReferences";
import Locations from "../pages/ReferenceBook/Locations";
import Banks from "../pages/ReferenceBook/Banks";
import CorrespondentBanks from "../pages/ReferenceBook/CorrespondentBanks";
import Currencies from "../pages/ReferenceBook/Currencies";
import CurrencyRates from "../pages/ReferenceBook/CurrencyRates";
import BankOperations from "../pages/Bank/BankOperations";
import ImportStatements from "../pages/Bank/ImportStatements";
import BankLink from "../pages/Bank/BankLink";
import SepaPayments from "../pages/Bank/SepaPayments";
import Departments from "../pages/Personnel/Departments";
import EmployeeList from "../pages/Personnel/EmployeeList";
import Positions from "../pages/Personnel/Positions";
import ProductionOrders from "../pages/Production/ProductionOrders";
import ProductionPlans from "../pages/Production/ProductionPlans";
import WorkshopManagement from "../pages/Production/WorkshopManagement";

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

  { path: "/bank/operations", component: BankOperations },
  { path: "/bank/import-statements", component: ImportStatements },
  { path: "/bank/correspondent-links", component: BankLink },
  { path: "/bank/sepa-payments", component: SepaPayments },

  { path: "/general-ledger/register", component: GeneralRegister },
  { path: "/general-ledger/ledger", component: GeneralLedgerContent },
  { path: "/general-ledger/settlement", component: DocSettlement },
  { path: "/general-ledger/period-closure", component: PeriodClosure },
  { path: "/general-ledger/currency-range", component: CurrencyRange },
  { path: "/general-ledger/exchange-rate", component: ExchangeRate },
  { path: "/general-ledger/chart-of-accounts", component: ChartOfAccounts },

  { path: "/references/product-cards", component: ProductCards },
  { path: "/references/warehouse", component: WarehouseReferences },
  { path: "/references/locations", component: Locations },
  { path: "/references/banks", component: Banks },
  { path: "/references/correspondent-banks", component: CorrespondentBanks },
  { path: "/references/currencies", component: Currencies },
  { path: "/references/currency-rates", component: CurrencyRates },

  { path: "/cashier/cash-balance", component: CashBalance },
  { path: "/cashier/cash-operations", component: CashOperations },
  { path: "/cashier/cash-report", component: CashReport },

  { path: "/reports/report-generator", component: ReportGenerator },
  { path: "/reports/reports-list", component: ReportsList },
  { path: "/reports/report-viewer", component: ReportViewer },

  { path: "/personnel/departments", component: Departments },
  { path: "/personnel/employee-list", component: EmployeeList },
  { path: "/personnel/positions", component: Positions },

  { path: "/production/production-orders", component: ProductionOrders },
  { path: "/production/production-plans", component: ProductionPlans },
  { path: "/production/workshop-management", component: WorkshopManagement },

  { path: "/assets/assets-list", component: AssetsList },
  { path: "/assets/depreciation", component: Depreciation },
  { path: "/assets/maintenance", component: Maintenance },

  { path: "/documents/archive", component: Archive },
  { path: "/documents/documents-list", component: DocumentsList },
  { path: "/documents/templates", component: Templates },

  { path: "/salary/payroll", component: Payroll },
  { path: "/salary/timesheets", component: Timesheets },
  { path: "/salary/schedule", component: WorkSchedule },
  { path: "/salary/wage-prints", component: WagePrints },
  { path: "/salary/reference", component: SalaryReferenceBook },

  { path: "/declaration/vat", component: VatDeclaration },
  { path: "/declaration/tax", component: TaxDeclaration },
  { path: "/declaration/statistical", component: StatisticalDeclaration },
  { path: "/declaration/customs", component: CustomsDeclaration },

  { path: "/settings/preferences", component: Preferences },
  { path: "/settings/profile", component: Profile },
  { path: "/settings/security", component: Security },
];

export default routes;
