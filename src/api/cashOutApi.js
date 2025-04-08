
import createApi from './index';

const cashOutApi = createApi('cashout');

export default {
  create: (data) => cashOutApi.post('', data),
  getAll: () => cashOutApi.get(''),
  getById: (id) => cashOutApi.get(`/${id}`),
  update: (id, data) => cashOutApi.put(`/${id}`, data),
  delete: (id) => cashOutApi.delete(`/${id}`)
};