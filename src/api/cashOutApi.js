import createApi from './index';

const cashOutApi = createApi('cashout'); 

export default {
  getAll: () => cashOutApi.get('/'),  
  create: (data) => cashOutApi.post('', data),  
};
