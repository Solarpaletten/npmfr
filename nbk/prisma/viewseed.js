const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Проверяем существующих пользователей
  const existingUsers = await prisma.users.findMany();
  console.log('Существующие пользователи:', existingUsers.map(user => ({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    created_at: user.created_at
  })));

  // Можно также найти конкретного пользователя
  const adminUser = await prisma.users.findUnique({
    where: {
      email: 'solar@solar.de'
    }
  });

  if (adminUser) {
    console.log('Найден админ:', {
      id: adminUser.id,
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role
    });
  } else {
    console.log('Админ не найден');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
