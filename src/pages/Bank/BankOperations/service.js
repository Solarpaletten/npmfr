import { useAuthenticatedApi } from '../../../utils/api';

const useBankOperationsService = () => {
  const api = useAuthenticatedApi();

  return {
    // Get all operations
    getAll: () => {
      // Убираем https://npmbk.onrender.com из URL, так как это уже включено в BASE_URL
      return api.get('/v1/bank/operations');
    },

    // Create new operation
    create: (operationData) => {
      // Форматируем данные перед отправкой
      const data = {
        type: operationData.type,
        amount: Number(operationData.amount),
        date: operationData.date,
        client: operationData.client,
        description: operationData.description,
        correspondingAccount: operationData.correspondingAccount
      };
      
      return api.post('/v1/bank/operations', data);
    }
  };
};

export default useBankOperationsService;