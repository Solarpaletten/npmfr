import {
  faPeopleLine, // для Clients
  faWarehouse, // для Warehouse
  faBox, // для Product Cards
  faArrowDown, // для Purchases
  faArrowUp, // для Sales
  faBoxesStacked, // для Item Stock
  faTableColumns, // для Dashboard
  faBook, // для General ledger
  faCashRegister, // для Cashier
  faSheetPlastic, // для Reports
  faUsers, // для Personnel
  faSackDollar, // для Assets
  faFolderOpen, // для Documents
  faHandHoldingDollar, // для Salary
  faReceipt, // для Declaration
  faCreditCard, // для Banks
  faGlobe, // для Locations
  faMoneyBillTransfer, // для Currencies
  faTag, // для Client Prices
  faFileInvoiceDollar, // для Automatic Invoicing
  faRotateLeft, // для Sales Returns
  faArrowRightArrowLeft, // для Item Movement
  faScaleBalanced, // для Consignment Balance
  faUniversity, // для Bank
  faLink, // для Bank Link with Cor. Acc.
  faFileImport, // для Import Statements
  faChartLine, // для Statistical Declaration
  faBoxes, // для Customs Declaration
  faMoneyBillWave, // для Payroll
  faCalendarDays, // для Timesheets
  faCalendarWeek, // для Work schedule
  faList, // для Register
  faHandshake, // для Settlement
  faCalendarCheck, // для Period Closure
  faMoneyBill, // для Currency Range
  faExchangeAlt, // для Exchange Rate
} from "@fortawesome/free-solid-svg-icons";

const filterVisibleItems = (items) => {
  return items
    .filter((item) => item.visible !== false)
    .map((item) => ({
      ...item,
      subItems: item.subItems ? filterVisibleItems(item.subItems) : undefined,
    }));
};

const menuData = [
  {
    label: "Dashboard",
    labelRu: "Панель управления",
    path: "/dashboard",
    icon: faTableColumns,
    visible: false,
  },
  {
    label: "Clients",
    labelRu: "Клиенты",
    path: "/clients",
    icon: faPeopleLine,
  },
  {
    label: "Warehouse",
    labelRu: "Склад",
    icon: faWarehouse,
    subItems: [
      {
        label: "Sales",
        labelRu: "Продажи",
        path: "/sales",
        icon: faArrowUp,
      },
      {
        label: "Client Prices",
        labelRu: "Цены клиентов",
        path: "/warehouse/client-prices",
        icon: faTag,
      },
      {
        label: "Automatic Invoicing",
        labelRu: "Автоматическое выставление счетов",
        path: "/warehouse/auto-invoicing",
        icon: faFileInvoiceDollar,
      },
      {
        label: "Purchases",
        labelRu: "Закупки",
        path: "/warehouse/purchases",
        icon: faArrowDown,
      },
      {
        label: "Sales Returns",
        labelRu: "Возвраты продаж",
        path: "/warehouse/sales-returns",
        icon: faRotateLeft,
      },
      {
        label: "Item Stock",
        labelRu: "Остатки товаров",
        path: "/warehouse/stock",
        icon: faBoxesStacked,
      },
      {
        label: "Item Movement",
        labelRu: "Движение товаров",
        path: "/warehouse/movement",
        icon: faArrowRightArrowLeft,
      },
      {
        label: "Consignment Balance",
        labelRu: "Остатки на консигнации",
        path: "/warehouse/consignment",
        icon: faScaleBalanced,
      },
    ],
  },
  {
    label: "Bank",
    labelRu: "Банк",
    icon: faUniversity,
    subItems: [
      {
        label: "Bank Operations",
        labelRu: "Банковские операции",
        path: "/bank/operations",
        icon: faUniversity,
      },
      {
        label: "Import Statements",
        labelRu: "Импорт выписок",
        path: "/bank/import-statements",
        icon: faFileImport,
      },
      {
        label: "Bank Link with Cor. Acc.",
        labelRu: "Связь с кор. счетами",
        path: "/bank/correspondent-links",
        icon: faLink,
      },
      {
        label: "SEPA Payments",
        labelRu: "SEPA платежи",
        path: "/bank/sepa-payments",
        icon: faMoneyBillTransfer,
      },
    ],
  },
  {
    label: "General Ledger",
    labelRu: "Главная книга",
    path: "/general-ledger",
    icon: faBook,
    subItems: [
      {
        label: "Register",
        labelRu: "Регистр",
        path: "/general-ledger/register",
        icon: faList,
      },
      {
        label: "Ledger",
        labelRu: "Книга учета",
        path: "/general-ledger/ledger",
        icon: faBook,
        active: true,
      },
      {
        label: "Settlement",
        labelRu: "Взаиморасчеты",
        path: "/general-ledger/settlement",
        icon: faHandshake,
      },
      {
        label: "Period Closure",
        labelRu: "Закрытие периода",
        path: "/general-ledger/period-closure",
        icon: faCalendarCheck,
      },
      {
        label: "Currency Range",
        labelRu: "Диапазон валют",
        path: "/general-ledger/currency-range",
        icon: faMoneyBill,
      },
      {
        label: "Exchange Rate",
        labelRu: "Курс обмена",
        path: "/general-ledger/exchange-rate",
        icon: faExchangeAlt,
      },
      {
        label: "Chart of Accounts",
        labelRu: "План счетов",
        path: "/general-ledger/chart-of-accounts",
        icon: faChartLine,
      },
    ],
  },
  {
    label: "Reference Book",
    labelRu: "Справочники",
    icon: faBook,
    subItems: [
      {
        label: "Product Cards",
        labelRu: "Карточки товаров",
        path: "/references/product-cards",
        icon: faBox,
      },
      {
        label: "Warehouse References",
        labelRu: "Склады",
        path: "/references/warehouse",
        icon: faWarehouse,
      },
      {
        label: "Locations",
        labelRu: "Локации",
        path: "/references/locations",
        icon: faGlobe,
      },
      {
        label: "Banks",
        labelRu: "Банки",
        path: "/references/banks",
        icon: faCreditCard,
      },
      {
        label: "Correspondent Banks",
        labelRu: "Банки-корреспонденты",
        path: "/references/correspondent-banks",
        icon: faCreditCard,
      },
      {
        label: "Currencies",
        labelRu: "Валюты",
        path: "/references/currencies",
        icon: faMoneyBillTransfer,
      },
      {
        label: "Currency Rates",
        labelRu: "Курсы валют",
        path: "/references/currency-rates",
        icon: faMoneyBillTransfer,
      },
    ],
  },
  {
    label: "Cashier",
    labelRu: "Кассир",
    icon: faCashRegister,
    visible: false,
    subItems: [
      {
        label: "Cash Balance",
        labelRu: "",
        path: "/cashier/cash-balance",
        icon: faChartLine,
      },
      {
        label: "Cash Operations",
        labelRu: "",
        path: "/cashier/cash-operations",
        icon: faChartLine,
      },
      {
        label: "Cash Report",
        labelRu: "",
        path: "/cashier/cash-report",
        icon: faChartLine,
      },
    ],
  },
  {
    label: "Reports",
    labelRu: "Отчеты",
    path: "/reports",
    icon: faSheetPlastic,
    subItems: [
      {
        label: "Report Generator",
        labelRu: "",
        path: "/reports/report-generator",
        icon: faBox,
      },
      {
        label: "Report List",
        labelRu: "",
        path: "/reports/reports-list",
        icon: faBox,
      },
      {
        label: "Report Viewer",
        labelRu: "",
        path: "/reports/report-viewer",
        icon: faBox,
      },
    ],
  },
  {
    label: "Personnel",
    labelRu: "Персонал",
    path: "/personnel",
    icon: faUsers,
    subItems: [
      {
        label: "Departments",
        labelRu: "",
        path: "/personnel/departments",
        icon: faBox,
      },
      {
        label: "Employee List",
        labelRu: "",
        path: "/personnel/employee-list",
        icon: faBox,
      },
      {
        label: "Positions",
        labelRu: "",
        path: "/personnel/positions",
        icon: faBox,
      },
    ],
  },
  {
    label: "Production",
    labelRu: "Производство",
    path: "/production",
    icon: faBox,
    subItems: [
      {
        label: "Production Orders",
        labelRu: "",
        path: "/production/production-orders",
        icon: faBox,
      },
      {
        label: "Production Plans",
        labelRu: "",
        path: "/production/production-plans",
        icon: faBox,
      },
      {
        label: "Workshop Management",
        labelRu: "",
        path: "/production/workshop-management",
        icon: faBox,
      },
    ],
  },
  {
    label: "Assets",
    labelRu: "Активы",
    path: "/assets",
    icon: faSackDollar,
    subItems: [
      {
        label: "Assets List",
        labelRu: "",
        path: "/assets/assets-list",
        icon: faBox,
      },
      {
        label: "Depreciation",
        labelRu: "",
        path: "/assets/depreciation",
        icon: faBox,
      },
      {
        label: "Maintenance",
        labelRu: "",
        path: "/assets/maintenance",
        icon: faBox,
      },
    ],
  },
  {
    label: "Documents",
    labelRu: "Документы",
    path: "/documents",
    icon: faFolderOpen,
    subItems: [
      {
        label: "Archive",
        labelRu: "",
        path: "/documents/archive",
        icon: faBox,
      },
      {
        label: "Documents List",
        labelRu: "",
        path: "/documents/documents-list",
        icon: faBox,
      },
      {
        label: "Templates",
        labelRu: "",
        path: "/documents/templates",
        icon: faBox,
      },
    ],
  },
  {
    label: "Salary",
    labelRu: "Зарплата",
    path: "/salary",
    icon: faHandHoldingDollar,
    subItems: [
      {
        label: "Payroll",
        labelRu: "Расчет зарплаты",
        path: "/salary/payroll",
        icon: faMoneyBillWave,
      },
      {
        label: "Timesheets",
        labelRu: "Табели",
        path: "/salary/timesheets",
        icon: faCalendarDays,
      },
      {
        label: "Work Schedule",
        labelRu: "График работы",
        path: "/salary/schedule",
        icon: faCalendarWeek,
      },
      {
        label: "Wage Prints",
        labelRu: "Расчетные листы",
        path: "/salary/wage-prints",
        icon: faFileInvoiceDollar,
      },
      {
        label: "Reference Book",
        labelRu: "Справочники",
        path: "/salary/reference",
        icon: faBook,
      },
    ],
  },
  {
    label: "Declaration",
    labelRu: "Декларации",
    path: "/declaration",
    icon: faReceipt,
    subItems: [
      {
        label: "VAT Declaration",
        labelRu: "Декларация НДС",
        path: "/declaration/vat",
        icon: faFileInvoiceDollar,
      },
      {
        label: "Tax Declaration",
        labelRu: "Налоговая декларация",
        path: "/declaration/tax",
        icon: faReceipt,
      },
      {
        label: "Statistical Declaration",
        labelRu: "Статистическая декларация",
        path: "/declaration/statistical",
        icon: faChartLine,
      },
      {
        label: "Customs Declaration",
        labelRu: "Таможенная декларация",
        path: "/declaration/customs",
        icon: faBoxes,
      },
    ],
  },
];

const visibleMenuData = filterVisibleItems(menuData);
export default visibleMenuData;
