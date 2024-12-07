import { useAuthenticatedApi } from '../../../utils/api';

const useBankOperationsService = () => {
  const api = useAuthenticatedApi();

  return {
    // Get all operations
    getAll: () => {
      return api.get('/bank/operations');  // Изменен путь на /bank/operations
    },

    // Create new operation
    create: (data) => {
      return api.post('/bank/operations', data);  // Изменен путь на /bank/operations
    },

    // Delete operation
    delete: (id) => {
      return api.delete(`/bank/operations/${id}`);  // Изменен путь на /bank/operations
    }
  };
};

export default useBankOperationsService;