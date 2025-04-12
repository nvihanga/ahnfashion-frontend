import createApi from './index';

const finishedGoodApi = createApi('finishedGood');

export default {
  create: (data) => finishedGoodApi.post('/save', data),
  getAll: () => finishedGoodApi.get('/all'),
  getById: (id) => finishedGoodApi.get(`/${id}`),
  update: (id, data) => finishedGoodApi.put(`/update/${id}`, data),
  delete: (id) => finishedGoodApi.delete(`/delete/${id}`)
};