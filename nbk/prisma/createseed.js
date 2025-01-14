const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('pass123', 10);
  
  const admin = await prisma.users.create({
    data: {
      email: 'solar@solar.de',
      password_hash: hashedPassword,
      username: 'solar',
      role: 'admin'
    }
  });

  console.log('Created admin user:', admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
