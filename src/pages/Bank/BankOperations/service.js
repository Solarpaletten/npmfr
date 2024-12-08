import { useAuthenticatedApi } from '../../../utils/api';

const useBankOperationsService = () => {
  const api = useAuthenticatedApi();

  return {
    getAll: async () => {
      console.log('API URL:', process.env.REACT_APP_API_URL);
      try {
        const response = await api.get('api/bank/operations');
        console.log('Response:', response);
        return response;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },

    create: async (operationData) => {
      const data = {
        type: operationData.type,
        amount: Number(operationData.amount),
        date: operationData.date,
        client: operationData.client,
        description: operationData.description,
        correspondingAccount: operationData.correspondingAccount
      };
      
      try {
        return await api.post('api/bank/operations', data);
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    }
  };
};

export default useBankOperationsService;