import {
  faPeopleLine,        // Clients
  faWarehouse,         // Warehouse
  faBox,               // Products
  faArrowDown,         // Incoming
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
        label: "Products List", 
        path: "/warehouse/products", 
        icon: faBox,
        active: true
      },
      { 
        label: "Incoming Goods", 
        path: "/warehouse/incoming", 
        icon: faArrowDown,
        active: true
      },
      { 
        label: "Sales", 
        path: "/warehouse/sales", 
        icon: faArrowUp,
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
    label: "Dashboard", 
    path: "/dashboard", 
    icon: faTableColumns,
    active: false
  },
  { 
    label: "General ledger", 
    path: "#", 
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
    path: "#", 
    icon: faSheetPlastic,
    active: false
  },
  { 
    label: "Personnel", 
    path: "#", 
    icon: faUsers,
    active: false
  },
  { 
    label: "Production", 
    path: "#", 
    icon: faBox,
    active: false
  },
  { 
    label: "Assets", 
    path: "#", 
    icon: faSackDollar,
    active: false
  },
  { 
    label: "Documents", 
    path: "#", 
    icon: faFolderOpen,
    active: false
  },
  { 
    label: "Salary", 
    path: "#", 
    icon: faHandHoldingDollar,
    active: false
  },
  { 
    label: "Declaration", 
    path: "#", 
    icon: faReceipt,
    active: false
  },
];
export default menuData;
