const menuData = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Clients", path: "/clients" },
  {
    label: "Warehouse",
    subItems: [
      { label: "Item 1", path: "#" },
      { label: "Item 2", path: "#" },
    ],
  },
  { label: "General ledger", path: "#" },
  {
    label: "Cashier",
    subItems: [
      { label: "Cashier Submenu 1", path: "#" },
      { label: "Cashier Submenu 2", path: "#" },
    ],
  },
  { label: "Reports", path: "#" },
  { label: "Personnel", path: "#" },
  { label: "Production", path: "#" },
  { label: "Assets", path: "#" },
  { label: "Documents", path: "#" },
  { label: "Salary", path: "#" },
  { label: "Declaration", path: "#" },
];

export default menuData;
