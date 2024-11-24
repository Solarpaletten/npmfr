import {
  faPeopleLine, // для Clients
  faWarehouse, // для Warehouse
  faBox,  // для Product Cards
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
  faBook as faReference, // для Reference Book
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
  faMoneyBillTransfer as faSepa, // для SEPA Payments
  faChartLine, // для Statistical Declaration
  faBoxes, // для Customs Declaration
} from '@fortawesome/free-solid-svg-icons'; // Импорт иконок из библиотеки

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
    active: false,
    visible: false,
  },
  {
    label: "Clients",
    labelRu: "Клиенты",
    path: "/clients",
    icon: faPeopleLine,
    active: true,
  },
  {
    label: "Warehouse",
    labelRu: "Склад",
    icon: faWarehouse,
    active: true,
    subItems: [
      {
        label: "Sales",
        labelRu: "Продажи",
        path: "/warehouse/sales",
        icon: faArrowUp,
        active: true,
      },
      {
        label: "Client Prices",
        labelRu: "Цены клиентов",
        path: "/warehouse/client-prices",
        icon: faTag,
        active: true,
      },
      {
        label: "Automatic Invoicing",
        labelRu: "Автоматическое выставление счетов",
        path: "/warehouse/auto-invoicing",
        icon: faFileInvoiceDollar,
        active: true,
      },
      {
        label: "Purchases",
        labelRu: "Закупки",
        path: "/warehouse/purchases",
        icon: faArrowDown,
        active: true,
      },
      {
        label: "Sales Returns",
        labelRu: "Возвраты продаж",
        path: "/warehouse/sales-returns",
        icon: faRotateLeft,
        active: true,
      },
      {
        label: "Item Stock",
        labelRu: "Остатки товаров",
        path: "/warehouse/stock",
        icon: faBoxesStacked,
        active: true,
      },
      {
        label: "Item Movement",
        labelRu: "Движение товаров",
        path: "/warehouse/movement",
        icon: faArrowRightArrowLeft,
        active: true,
      },
      {
        label: "Consignment Balance",
        labelRu: "Остатки на консигнации",
        path: "/warehouse/consignment",
        icon: faScaleBalanced,
        active: true,
      },
    ],
  },
  {
    label: "Bank",
    labelRu: "Банк",
    icon: faUniversity,
    active: true,
    subItems: [
      {
        label: "Bank Operations",
        labelRu: "Банковские операции",
        path: "/bank/operations",
        icon: faUniversity,
        active: true,
      },
      {
        label: "Import Statements",
        labelRu: "Импорт выписок",
        path: "/bank/import-statements",
        icon: faFileImport,
        active: true,
      },
      {
        label: "Bank Link with Cor. Acc.",
        labelRu: "Связь с кор. счетами",
        path: "/bank/correspondent-links",
        icon: faLink,
        active: true,
        // visible: false,
      },
      {
        label: "SEPA Payments",
        labelRu: "SEPA платежи",
        path: "/bank/sepa-payments",
        icon: faSepa,
        active: true,
        // visible: false,
      },
    ],
  },
  {
    label: "General ledger",
    labelRu: "Главная книга",
    path: "/general-ledger",
    icon: faBook,
    active: true,
    // visible: false,
  },
  {
    label: "Reference Book",
    labelRu: "Справочники",
    icon: faReference,
    active: true,
    subItems: [
      {
        label: "Product Cards",
        labelRu: "Карточки товаров",
        path: "/references/product-cards",
        icon: faBox,
        active: true,
      },
      {
        label: "Warehouse References",
        labelRu: "Склады",
        path: "/references/warehouse",
        icon: faWarehouse,
        active: true,
      },
      {
        label: "Locations",
        labelRu: "Локации",
        path: "/references/locations",
        icon: faGlobe,
        active: true,
      },
      {
        label: "Banks",
        labelRu: "Банки",
        path: "/references/banks",
        icon: faCreditCard,
        active: true,
      },
      {
        label: "Correspondent Banks",
        labelRu: "Банки-корреспонденты",
        path: "/references/correspondent-banks",
        icon: faCreditCard,
        active: true,
      },
      {
        label: "Currencies",
        labelRu: "Валюты",
        path: "/references/currencies",
        icon: faMoneyBillTransfer,
        active: true,
      },
      {
        label: "Currency Rates",
        labelRu: "Курсы валют",
        path: "/references/currency-rates",
        icon: faMoneyBillTransfer,
        active: true,
      },
    ],
  },
  {
    label: "Cashier",
    labelRu: "Кассир",
    icon: faCashRegister,
    active: false,
    visible: false,
    subItems: [
      { label: "Cashier Submenu 1", path: "#" },
      { label: "Cashier Submenu 2", path: "#" },
    ],
  },
  {
    label: "Reports",
    labelRu: "Отчеты",
    path: "/reports",
    icon: faSheetPlastic,
    active: true,
    // visible: false,
  },
  {
    label: "Personnel",
    labelRu: "Персонал",
    path: "/personnel",
    icon: faUsers,
    active: true,
  },
  {
    label: "Production",
    labelRu: "Производство",
    path: "/production",
    icon: faBox,
    active: true,
  },
  {
    label: "Assets",
    labelRu: "Активы",
    path: "/assets",
    icon: faSackDollar,
    active: true,
  },
  {
    label: "Documents",
    labelRu: "Документы",
    path: "/documents",
    icon: faFolderOpen,
    active: true,
  },
  {
    label: "Salary",
    labelRu: "Зарплата",
    path: "/salary",
    icon: faHandHoldingDollar,
    active: true,
  },
  {
    label: "Declaration",
    labelRu: "Декларации",
    path: "/declaration",
    icon: faReceipt,
    active: true,
    subItems: [
      {
        label: "VAT Declaration",
        labelRu: "Декларация НДС",
        path: "/declaration/vat",
        icon: faFileInvoiceDollar,
        active: true,
      },
      {
        label: "Tax Declaration",
        labelRu: "Налоговая декларация",
        path: "/declaration/tax",
        icon: faReceipt,
        active: true,
      },
      {
        label: "Statistical Declaration",
        labelRu: "Статистическая декларация",
        path: "/declaration/statistical",
        icon: faChartLine,
        active: true,
      },
      {
        label: "Customs Declaration",
        labelRu: "Таможенная декларация",
        path: "/declaration/customs",
        icon: faBoxes,
        active: false,
        visible: false,
      },
    ],
  },
];

const visibleMenuData = filterVisibleItems(menuData);
export default visibleMenuData;
