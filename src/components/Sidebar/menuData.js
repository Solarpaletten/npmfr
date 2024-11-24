import {
  faPeopleLine,
  faWarehouse,
  faBox,
  faArrowDown,
  faArrowUp,
  faBoxesStacked,
  faTableColumns,
  faBook,
  faCashRegister,
  faSheetPlastic,
  faUsers,
  faSackDollar,
  faFolderOpen,
  faHandHoldingDollar,
  faReceipt,
  faBook as faReference, // для справочника
  faCreditCard, // для банков
  faGlobe, // для локаций
  faMoneyBillTransfer, // для валют
  faTag, // для Client Prices
  faFileInvoiceDollar, // для Automatic Invoicing
  faRotateLeft, // для Sales Returns
  faArrowRightArrowLeft, // для Item Movement
  faScaleBalanced, // для Consignment Balance
  faUniversity, // для Bank основной иконки
  faLink, // для Bank link
  faFileImport, // для Import statements
  faMoneyBillTransfer as faSepa, // для SEPA payments
  faChartLine,
  faBoxes,
} from '@fortawesome/free-solid-svg-icons';

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
    label: 'Dashboard',
    labelRu: 'Панель управления',
    path: '/dashboard',
    icon: faTableColumns,
    active: false,
    visible: false, // Скрыть пункт меню
  },
  {
    label: 'Clients',
    labelRu: 'Клиенты',
    path: '/clients',
    icon: faPeopleLine,
    active: true,
  },
  // Вставка Warehause start
  {
    label: 'Warehouse',
    labelRu: 'Склад',
    icon: faWarehouse,
    active: true,
    subItems: [
      {
        label: 'Sales',
        labelRu: 'Продажи',
        path: '/warehouse/sales',
        icon: faArrowUp,
        active: true,
      },
      {
        label: 'Client Prices',
        labelRu: 'Цены клиентов',
        path: '/warehouse/client-prices',
        icon: faTag,
        active: true,
      },
      {
        label: 'Automatic Invoicing',
        labelRu: 'Автоматическое выставление счетов',
        path: '/warehouse/auto-invoicing',
        icon: faFileInvoiceDollar,
        active: true,
      },
      {
        label: 'Purchases',
        labelRu: 'Закупки',
        path: '/warehouse/purchases',
        icon: faArrowDown,
        active: true,
      },
      {
        label: 'Sales Returns',
        labelRu: 'Возвраты продаж',
        path: '/warehouse/sales-returns',
        icon: faRotateLeft,
        active: true,
      },
      {
        label: 'Item Stock',
        labelRu: 'Остатки товаров',
        path: '/warehouse/stock',
        icon: faBoxesStacked,
        active: true,
      },
      {
        label: 'Item Movement',
        labelRu: 'Движение товаров',
        path: '/warehouse/movement',
        icon: faArrowRightArrowLeft,
        active: true,
      },
      {
        label: 'Consignment Balance',
        labelRu: 'Остатки на консигнации',
        path: '/warehouse/consignment',
        icon: faScaleBalanced,
        active: true,
      },
    ],
  },
  //   вставкаWarehause end
  // вставкаBank start
  {
    label: 'Bank',
    labelRu: 'Банк',
    icon: faUniversity,
    active: true,
    subItems: [
      {
        label: 'Bank Operations',
        labelRu: 'Банковские операции',
        path: '/bank/operations',
        icon: faUniversity,
        active: true,
      },
      {
        label: 'Import Statements',
        labelRu: 'Импорт выписок',
        path: '/bank/import-statements',
        icon: faFileImport,
        active: true,
      },
      // Отключенные пункты меню - можно включить позже если потребуется
      {
        label: 'Bank Link with Cor. Acc.',
        labelRu: 'Связь с кор. счетами',
        path: '/bank/correspondent-links',
        icon: faLink,
        active: true,
        visible: false, // Скрыть пункт меню
      },
      {
        label: 'SEPA Payments',
        labelRu: 'SEPA платежи',
        path: '/bank/sepa-payments',
        icon: faSepa,
        active: true,
        visible: false, // Скрыть пункт меню
      },
    ],
  },
  // ВставкаBank end
  {
    label: 'General ledger',
    labelRu: 'Главная книга', // добавлено
    path: '/general-ledger',
    icon: faBook,
    active: false,
    visible: false, // скрыто
  },
  {
    label: 'Reference Book',
    labelRu: 'Справочники',
    icon: faReference,
    active: true,
    subItems: [
      {
        label: 'Product Cards',
        labelRu: 'Карточки товаров',
        path: '/references/product-cards',
        icon: faBox,
        active: true,
      },
      {
        label: 'Warehouse References',
        labelRu: 'Склады',
        path: '/references/warehouse',
        icon: faWarehouse,
        active: true,
      },
      {
        label: 'Locations',
        labelRu: 'Локации',
        path: '/references/locations',
        icon: faGlobe,
        active: true,
      },
      {
        label: 'Banks',
        labelRu: 'Банки',
        path: '/references/banks',
        icon: faCreditCard,
        active: true,
      },
      {
        label: 'Correspondent Banks',
        labelRu: 'Банки-корреспонденты',
        path: '/references/correspondent-banks',
        icon: faCreditCard,
        active: true,
      },
      {
        label: 'Currencies',
        labelRu: 'Валюты',
        path: '/references/currencies',
        icon: faMoneyBillTransfer,
        active: true,
      },
      {
        label: 'Currency Rates',
        labelRu: 'Курсы валют',
        path: '/references/currency-rates',
        icon: faMoneyBillTransfer,
        active: true,
      },
    ],
  },
  {
    label: 'Cashier',
    labelRu: 'Кассир', // добавлено
    icon: faCashRegister,
    active: false,
    visible: false, // скрыто
    subItems: [
      { label: 'Cashier Submenu 1', path: '#' },
      { label: 'Cashier Submenu 2', path: '#' },
    ],
  },
  {
    label: 'Reports',
    labelRu: 'Отчеты', // добавлено
    path: '/reports',
    icon: faSheetPlastic,
    active: false,
    visible: false, // скрыто
  },
  {
    label: 'Personnel',
    labelRu: 'Персонал',
    path: '/personnel',
    icon: faUsers,
    active: false,
  
  },
  {
    label: 'Production',
    labelRu: 'Производство',
    path: '/production',
    icon: faBox,
    active: false,
    
  },
  {
    label: 'Assets',
    labelRu: 'Активы',
    path: '/assets',
    icon: faSackDollar,
    active: false,
    
  },
  {
    label: 'Documents',
    labelRu: 'Документы',
    path: '/documents',
    icon: faFolderOpen,
    active: false,
    
  },
  {
    label: 'Salary',
    labelRu: 'Зарплата',
    path: '/salary',
    icon: faHandHoldingDollar,
    active: true,
    // visible: true, // скрыто
  },
  {
    label: 'Declaration',
    labelRu: 'Декларации',
    path: '/declaration',
    icon: faReceipt,
    active: false,
    // visible: false, // Убираем это свойство, чтобы показать пункт меню
    subItems: [
      {
        label: 'VAT Declaration',
        labelRu: 'Декларация НДС',
        path: '/declaration/vat',
        icon: faFileInvoiceDollar,
        active: true,
      },
      {
        label: 'Tax Declaration',
        labelRu: 'Налоговая декларация',
        path: '/declaration/tax',
        icon: faReceipt,
        active: true,
      },
      {
        label: 'Statistical Declaration',
        labelRu: 'Статистическая декларация',
        path: '/declaration/statistical',
        icon: faChartLine, // Нужно добавить в импорт
        active: true,
      },
      {
        label: 'Customs Declaration',
        labelRu: 'Таможенная декларация',
        path: '/declaration/customs',
        icon: faBoxes, // Нужно добавить в импорт
        active: true,
      },
    ],
  },
]; // Закрывающая скобка для menuData массива

const visibleMenuData = filterVisibleItems(menuData);
export default visibleMenuData;
