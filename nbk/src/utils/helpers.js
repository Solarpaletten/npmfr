const generateDocNumber = (prefix, number) => {
  return `${prefix}-${String(number).padStart(6, '0')}`;
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
};

const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

module.exports = {
  generateDocNumber,
  calculateTotal,
  formatDate
}; 