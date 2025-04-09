import { grnApi } from '../../../api/grnApi';


export const createGRN = async (grnData) => {
  const response = await grnApi.post('/createGrn', grnData);
  return response.data;
};

export const getAllGRN = async () => {
  const response = await grnApi.get('/getAllGrn');
  return response.data;
};

export const getGrnByPurchaseOrderINvoiceNo = async (invoiceNo) => {
  const response = await grnApi.get(`/getByInvoiceNo/${invoiceNo}`);
  return response.data;
};

export const deletePurchaseOrderGrn = async (id) => {
  const response = await grnApi.delete(`/delete/${id}`);
  return response.data;
};

export const addPayement = async (paymentData) => {
  const response = await grnApi.post('/addPaymentMethod', {
    purchaseOrderId: paymentData.purchaseOrderId,
    paymentType: paymentData.paymentType,
    chequeNo: paymentData.chequeNo || null,
    creditAmount: paymentData.creditAmount || null,
    chequeDate: paymentData.chequeDate || null,
  });
  return response.data;
};

export const payCredit = async (paymentData) => {
  const response = await grnApi.post('/payCredit', {
    purchaseOrderId: paymentData.purchaseOrderId,
    paymentType: paymentData.paymentType,
    chequeNo: paymentData.chequeNo || null,
    creditAmount: paymentData.creditAmount || null,
    chequeDate: paymentData.chequeDate || null,
  });
  return response.data;
};
