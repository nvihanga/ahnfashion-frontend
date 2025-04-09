import createApi from './index';

const stockApi = createApi('stock');

export default {
  create: (data) => stockApi.post('', data),             // POST /api/stock
  getById: (id) => stockApi.get(`/${id}`),               // GET /api/stock/{id}
  getAll: () => stockApi.get(''),                        // GET /api/stock
  update: (id, data) => stockApi.put(`/${id}`, data),    // PUT /api/stock/{id}
  delete: (id) => stockApi.delete(`/${id}`),             // DELETE /api/stock/{id}
};
