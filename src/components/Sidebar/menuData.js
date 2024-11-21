import {
  faPeopleLine,        // Clients
  faWarehouse,         // Warehouse
  faBox,               // Products
  faArrowDown,         // Purchases
  faArrowUp,           // Sales
  faBoxesStacked,      // Stock
  faTableColumns,      // Dashboard
  faBook,              // General ledger
  faCashRegister,      // Cashier
  faSheetPlastic,      // Reports
  faUsers,             // Personnel
  faSackDollar,        // Assets
  faFolderOpen,        // Documents
  faHandHoldingDollar, // Salary
  faReceipt,           // Declaration
} from "@fortawesome/free-solid-svg-icons";

const menuData = [
  { 
    label: "Dashboard", 
    path: "/dashboard", 
    icon: faTableColumns,
    active: false
  },
  { 
    label: "Clients", 
    path: "/clients", 
    icon: faPeopleLine,
    active: true
  },
  {
    label: "Warehouse",
    icon: faWarehouse,
    active: true,
    subItems: [
      { 
        label: "Sales", 
        path: "/warehouse/sales", 
        icon: faArrowUp,
        active: true
      },
      { 
        label: "Purchases", 
        path: "/warehouse/purchases", 
        icon: faArrowDown,
        active: true
      },
      { 
        label: "Stock", 
        path: "/warehouse/stock", 
        icon: faBoxesStacked,
        active: true
      }
    ],
  },
  { 
    label: "General ledger", 
    path: "/general-ledger", 
    icon: faBook,
    active: false
  },
  {
    label: "Cashier",
    icon: faCashRegister,
    active: false,
    subItems: [
      { label: "Cashier Submenu 1", path: "#" },
      { label: "Cashier Submenu 2", path: "#" }
    ]
  },
  { 
    label: "Reports", 
    path: "/reports", 
    icon: faSheetPlastic,
    active: false
  },
  { 
    label: "Personnel", 
    path: "/personnel", 
    icon: faUsers,
    active: false
  },
  { 
    label: "Production", 
    path: "/production", 
    icon: faBox,
    active: false
  },
  { 
    label: "Assets", 
    path: "/assets", 
    icon: faSackDollar,
    active: false
  },
  { 
    label: "Documents", 
    path: "/documents", 
    icon: faFolderOpen,
    active: false
  },
  { 
    label: "Salary", 
    path: "/salary", 
    icon: faHandHoldingDollar,
    active: false
  },
  { 
    label: "Declaration", 
    path: "/declaration", 
    icon: faReceipt,
    active: false
  },
];

export default menuData;
