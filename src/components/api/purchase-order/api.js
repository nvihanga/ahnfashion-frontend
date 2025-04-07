import createApi from '../../../api/index';
import { purchaseOrderApi } from '../../../api/purchaseOrderApi';

export const addPurchaseOrder = async (purchaseOrder) => {
  const response = await purchaseOrderApi.post('/save', purchaseOrder);
  return response.data;
};

export const getPurchaseOrders = async () => {
  const response = await purchaseOrderApi.get('/getAll');
  return response.data;
};

export const getPurchaseOrderById = async (id) => {
  const response = await purchaseOrderApi.get(`/get/${id}`);
  return response.data;
};

export const sendPurchaseOrderEmail = async (invoiceNo) => {
  const response = await purchaseOrderApi.post(`/sendEmail/${invoiceNo}`);
  return response.data;
};

export const updatePurchaseOrder = async (purchaseOrder) => {
  const response = await purchaseOrderApi.put('/update', purchaseOrder);
  return response.data;
};

export const deletePurchaseOrder = async (id) => {
  const response = await purchaseOrderApi.delete(`/delete/${id}`);
  return response.data;
};