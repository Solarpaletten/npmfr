const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('👤 Creating solar user...');
    
    // Проверяем, существует ли уже пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email: 'solar@solar.pl' }
    });

    if (existingUser) {
      console.log('⚠️ User already exists:', {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role
      });
      return;
    }

    // Создаем пользователя с уже хешированным паролем
    const user = await prisma.user.create({
      data: {
        email: 'solar@solar.pl',
        name: 'Solar',
        password: '$2a$10$eF.uKETCsarAURoyR67L/edHGguccLlrTXpRp96mQO.4f665icv2O',
        role: 'admin'
      }
    });

    console.log('✅ User created successfully:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    });

  } catch (error) {
    console.error('❌ Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin()
  .then(() => console.log('✨ Operation completed'))
  .catch(console.error); 