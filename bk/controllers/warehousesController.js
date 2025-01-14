const getWarehouses = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Используем Prisma для получения складов пользователя
    const warehouses = await req.prisma.warehouses.findMany({
      where: { user_id: userId }, // Фильтрация по user_id
      include: {
        users_warehouses_user_idTousers: {  // ✅ Правильное имя связи из схемы
          select: {
            username: true,
          },
        },
      },
    });

    // Преобразуем данные с правильным обращением к полю users
    const formattedWarehouses = warehouses.map(warehouse => ({
      ...warehouse,
      created_by_name: warehouse.users_warehouses_user_idTousers?.username,  // ✅ Изменено с user на правильное имя связи
    }));

    res.json(formattedWarehouses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWarehouses,
};
