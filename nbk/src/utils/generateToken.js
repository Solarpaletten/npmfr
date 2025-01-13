const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role || 'user'
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h'
    }
  );
};

module.exports = generateToken; 