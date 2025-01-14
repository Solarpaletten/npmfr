const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createUser() {
  try {
    const newUser = await prisma.users.create({
      data: {
        email: 'solar@solar.pl',  // Укажите нужный email
        password_hash: '$2a$10$NomucSxlV4nq7KTxhcxV8eZi137xYmIpOUzwc7e4w8cAYrg9wn/Ne',
        username: 'solar',           // Укажите нужное имя пользователя
        role: 'admin'
      }
    })
    
    console.log('Создан новый пользователь:', newUser)
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createUser()