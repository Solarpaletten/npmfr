const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('🔍 Checking database connection...');
    
    // Проверяем подключение
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Проверяем таблицу пользователей
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        // Не выбираем пароль в целях безопасности
      }
    });

    if (users.length === 0) {
      console.log('⚠️ No users found in database');
    } else {
      console.log('👥 Found users:', JSON.stringify(users, null, 2));
    }

  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase()
  .then(() => console.log('✨ Database check completed'))
  .catch(console.error); 