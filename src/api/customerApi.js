
import createApi from './index';

const customerApi = createApi('customer');

export default {
  create: (data) => customerApi.post('/create', data),
  getAll: () => customerApi.get('/all'),
  getById: (id) => customerApi.get(`/${id}`),
  update: (id, data) => customerApi.put(`/update/${id}`, data),
  delete: (id) => customerApi.delete(`/delete/${id}`)
};