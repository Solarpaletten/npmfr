const express = require('express');
const path = require('path');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Импорт всех роутов
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const bankOperationsRoutes = require('./routes/bankOperationsRoutes');
const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const saleRoutes = require('./routes/saleRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const chartOfAccountsRoutes = require('./routes/chartOfAccountsRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Добавляем prisma в request
app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/bank-operations', bankOperationsRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/warehouses', warehouseRoutes);
app.use('/api/v1/sales', saleRoutes);
app.use('/api/v1/purchases', purchaseRoutes);
app.use('/api/v1/chart-of-accounts', chartOfAccountsRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Test route
app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});