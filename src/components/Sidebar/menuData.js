import {
  faTableColumns,
  faPeopleLine,
  faWarehouse,
  faBook,
  faCashRegister,
  faSheetPlastic,
  faUsers,
  faBox,
  faSackDollar,
  faFolderOpen,
  faHandHoldingDollar,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

const menuData = [
  { label: "Dashboard", path: "/dashboard", icon: faTableColumns },
  { label: "Clients", path: "/clients", icon: faPeopleLine },
  {
    label: "Warehouse",
    icon: faWarehouse,
    subItems: [
      { label: "Item 1", path: "#" },
      { label: "Item 2", path: "#" },
    ],
  },
  { label: "General ledger", path: "#", icon: faBook },
  {
    label: "Cashier",
    icon: faCashRegister,
    subItems: [
      { label: "Cashier Submenu 1", path: "#" },
      { label: "Cashier Submenu 2", path: "#" },
    ],
  },
  { label: "Reports", path: "#", icon: faSheetPlastic },
  { label: "Personnel", path: "#", icon: faUsers },
  { label: "Production", path: "#", icon: faBox },
  { label: "Assets", path: "#", icon: faSackDollar },
  { label: "Documents", path: "#", icon: faFolderOpen },
  { label: "Salary", path: "#", icon: faHandHoldingDollar },
  { label: "Declaration", path: "#", icon: faReceipt },
];

export default menuData;
