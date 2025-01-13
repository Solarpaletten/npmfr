const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkTables() {
  try {
    console.log('🔍 Checking database tables...\n');

    // Получаем список таблиц
    const tables = await prisma.$queryRaw`
      SELECT 
        table_schema as schema,
        table_name as name,
        table_type as type
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    console.log('📋 Found tables:');
    console.table(tables);

    // Проверяем таблицу User
    console.log('\n👥 Checking User table structure:');
    const userColumns = await prisma.$queryRaw`
      SELECT 
        column_name as column,
        data_type as type,
        is_nullable as nullable
      FROM information_schema.columns
      WHERE table_name = 'User'
      ORDER BY ordinal_position;
    `;
    
    console.table(userColumns);

    // Проверяем количество пользователей
    const userCount = await prisma.user.count();
    console.log(`\n📊 Total users in database: ${userCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkTables()
  .then(() => console.log('\n✨ Database check completed'))
  .catch(console.error); 