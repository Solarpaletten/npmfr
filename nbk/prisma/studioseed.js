const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('\n=== Проверка пользователей в базе данных ===\n');
  
  const users = await prisma.users.findMany({
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      created_at: true
    }
  });

  users.forEach(user => {
    console.log(`
    ID: ${user.id}
    Email: ${user.email}
    Username: ${user.username}
    Role: ${user.role}
    Created: ${user.created_at}
    ----------------------`);
  });

  console.log(`\nВсего пользователей: ${users.length}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });