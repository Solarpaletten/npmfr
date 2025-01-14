const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateRequired = (fields) => {
  return Object.entries(fields).reduce((errors, [key, value]) => {
    if (!value || value.toString().trim() === '') {
      errors[key] = `${key} is required`;
    }
    return errors;
  }, {});
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRequired
}; 