const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получить всех клиентов с включением связанных данных
exports.getClients = async (req, res) => {
  const userId = req.user.userId;

  try {
    const clients = await req.prisma.clients.findMany({
      where: {
        user_id: userId
      },
      include: {
        users: {
          select: {
            username: true
          }
        },
        warehouses: true,
        doc_settlement: true
      }
    });
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: error.message });
  }
};

// Получить одного клиента
exports.getClient = async (req, res) => {
  try {
    // Здесь будет логика получения одного клиента
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создать клиента с валидацией
exports.createClient = async (req, res) => {
  const userId = req.user.userId;

  try {
    const { name, email, phone, code = null, vat_code = null } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name, email, and phone are required",
        received: { name, email, phone },
      });
    }

    const newClient = await req.prisma.clients.create({
      data: {
        name,
        email,
        phone,
        code,
        vat_code,
        user_id: userId,
      },
    });

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновить клиента
exports.updateClient = async (req, res) => {
  try {
    // Здесь будет логика обновления клиента
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удалить клиента
exports.deleteClient = async (req, res) => {
  try {
    // Здесь будет логика удаления клиента
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Копирование клиента
exports.copyClient = async (req, res) => {
  const { id } = req.params;

  try {
    const sourceClient = await req.prisma.clients.findUnique({
      where: { id: Number(id) },
    });

    if (!sourceClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    const { id: _, ...clientData } = sourceClient;

    const newClient = await req.prisma.clients.create({
      data: {
        ...clientData,
        name: `${clientData.name} (Copy)`,
      },
    });

    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 