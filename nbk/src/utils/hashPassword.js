const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  try {
    console.log('🔒 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('✅ Password hashed successfully');
    console.log('🔑 Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('❌ Error hashing password:', error);
    throw error;
  }
}

// Хешируем тестовый пароль
hashPassword('pass123')
  .then(() => console.log('✨ Operation completed'))
  .catch(console.error); 