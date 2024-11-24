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
} from '@fortawesome/free-solid-svg-icons';

const menuData = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: faTableColumns,
    active: false,
  },
  {
    label: 'Clients',
    path: '/clients',
    icon: faPeopleLine,
    active: true,
  },
  {
    label: 'Warehouse',
    icon: faWarehouse,
    active: true,
    subItems: [
      {
        label: 'Sales',
        path: '/warehouse/sales',
        icon: faArrowUp,
        active: true,
      },
      {
        label: 'Purchases',
        path: '/warehouse/purchases',
        icon: faArrowDown,
        active: true,
      },
      {
        label: 'Stock',
        path: '/warehouse/stock',
        icon: faBoxesStacked,
        active: true,
      },
    ],
  },
  {
    label: 'General ledger',
    path: '/general-ledger',
    icon: faBook,
    active: false,
  },
  {
    label: 'Reference Book',
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
    icon: faCashRegister,
    active: false,
    subItems: [
      { label: 'Cashier Submenu 1', path: '#' },
      { label: 'Cashier Submenu 2', path: '#' },
    ],
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: faSheetPlastic,
    active: false,
  },
  {
    label: 'Personnel',
    path: '/personnel',
    icon: faUsers,
    active: false,
  },
  {
    label: 'Production',
    path: '/production',
    icon: faBox,
    active: false,
  },
  {
    label: 'Assets',
    path: '/assets',
    icon: faSackDollar,
    active: false,
  },
  {
    label: 'Documents',
    path: '/documents',
    icon: faFolderOpen,
    active: false,
  },
  {
    label: 'Salary',
    path: '/salary',
    icon: faHandHoldingDollar,
    active: false,
  },
  {
    label: 'Declaration',
    path: '/declaration',
    icon: faReceipt,
    active: false,
  },
];

export default menuData;
