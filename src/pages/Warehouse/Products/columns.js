const columns = [
  { key: 'name', isSortable: true, label: 'Product name' },
  { key: 'code', isSortable: true, label: 'Code' },
  { key: 'category', isSortable: true, label: 'Category' },
  { key: 'unit', isSortable: true, label: 'Unit' },
  { key: 'vat_rate', isSortable: true, label: 'VAT rate' },
  { key: 'brand', isSortable: true, label: 'Brand' },
  { key: 'price_purchase', isSortable: true, label: 'Purchase price' },
  { key: 'price_sale', isSortable: true, label: 'Sale price' },
  { key: 'min_quantity', isSortable: true, label: 'Min quantity' },
  { key: 'description', isSortable: false, label: 'Description' },
  { key: 'action', isSortable: false, label: '' },
];

export default columns;
