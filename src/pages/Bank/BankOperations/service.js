import { useAuthenticatedApi } from '../../../utils/api';

const useBankOperationsService = () => {
  const api = useAuthenticatedApi();

  return {
    getAll: () => {
      return api.get('/bank-operations');
    },

    create: (operationData) => {
      return api.post('/bank-operations', operationData);
    }
  };
};

export default useBankOperationsService;