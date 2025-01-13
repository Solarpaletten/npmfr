const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Checking users in database...');
    
    // Получаем всех пользователей
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Не выбираем password по соображениям безопасности
      }
    });

    if (users.length === 0) {
      console.log('📭 No users found in database');
    } else {
      console.log('👥 Found users:', JSON.stringify(users, null, 2));
    }

  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers()
  .then(() => console.log('✨ Check completed'))
  .catch(console.error); 