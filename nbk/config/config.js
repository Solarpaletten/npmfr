// Проверим настройки базы данных и другие конфигурации
console.log('Current config:', {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}); 