const columns = [
    { key: "code", isSortable: true, label: "Code" },
    { key: "name", isSortable: true, label: "Name" },
    { key: "parent_code", isSortable: false, label: "Parent Account" },
    { key: "cost_center", isSortable: false, label: "Cost Center" },
    { key: "is_reserve", isSortable: false, label: "Reserve" },
    { key: "is_advance", isSortable: false, label: "Advance" },
    { key: "is_active", isSortable: false, label: "Active" },
    { key: "action", isSortable: false, label: "" },
  ];
  
  export default columns;