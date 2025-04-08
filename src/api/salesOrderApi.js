
import createApi from './index';

const salesOrderApi = createApi('salesorders');

export default {
  getAll: () => salesOrderApi.get(''),                      // GET /api/salesorders
  getById: (id) => salesOrderApi.get(`/${id}`),             // GET /api/salesorders/{id}
  create: (data) => salesOrderApi.post('', data),           // POST /api/salesorders
  update: (id, data) => salesOrderApi.put(`/${id}`, data),  // PUT /api/salesorders/{id}
  delete: (id) => salesOrderApi.delete(`/${id}`),           // DELETE /api/salesorders/{id}
  sendInvoice: (id, data) => salesOrderApi.post(`/send-invoice/${id}`, data), // POST /api/salesorders/send-invoice/{id}
  getDetails: (id) => salesOrderApi.get(`/${id}/details`),  // GET /api/salesorders/{id}/details
};