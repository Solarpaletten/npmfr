const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Проверяем подключение
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Проверяем таблицу User
    const usersCount = await prisma.user.count();
    console.log(`📊 Current users in database: ${usersCount}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  } finally {
    // Закрываем соединение
    await prisma.$disconnect();
  }
}

// Запускаем тест
console.log('🚀 Testing database connection...');
testConnection()
  .then(() => console.log('✨ Test completed'))
  .catch(console.error);
