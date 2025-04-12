
import createApi from './index';

const salesOrderApi = createApi('salesorders');

export default {
  getAll: () => salesOrderApi.get(''),                      
  getById: (id) => salesOrderApi.get(`/${id}`),            
  create: (data) => salesOrderApi.post('', data),       
  update: (id, data) => salesOrderApi.put(`/${id}`, data),  
  delete: (id) => salesOrderApi.delete(`/${id}`),         
  sendInvoice: (id, data) => salesOrderApi.post(`/send-invoice/${id}`, data), 
  getDetails: (id) => salesOrderApi.get(`/${id}/details`),  
};