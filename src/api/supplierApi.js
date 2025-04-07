import createApi from './index';

const supplierApi = createApi('supplier');

export default {
  create: (data) => supplierApi.post('/save', data),
  getAll: () => supplierApi.get('/all'),
  getById: (id) => supplierApi.get(`/${id}`),
  update: (id, data) => supplierApi.put(`/update/${id}`, data),
  delete: (id) => supplierApi.delete(`/delete/${id}`),
  checkCodeExists: (code) => supplierApi.get(`/exists/${code}`)
};