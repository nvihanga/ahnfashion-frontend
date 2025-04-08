import axios from "axios";

export const baseUrl = "http://localhost:8085";

const headers = {
  "Content-Type": "application/json",
};

export const createGRN = async (grnData) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/purchaseOrder/createGrn`,
    grnData,
    {
      headers,
    }
  );
  return response.data;
};

export const getAllGRN = async () => {
  const response = await axios.get(
    `${baseUrl}/api/v1/purchaseOrder/getAllGrn`,
    {
      headers,
    }
  );
  return response.data;
};

export const getGrnByPurchaseOrderINvoiceNo = async (invoiceNo) => {
  const response = await axios.get(
    `${baseUrl}/api/v1/purchaseOrder/getByInvoiceNo/${invoiceNo}`,
    { headers }
  );
  return response.data;
};

export const deletePurchaseOrderGrn = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/api/v1/purchaseOrder/delete/${id}`,
    { headers }
  );
  return response.data;
};

export const addPayement = async (paymentData) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/purchaseOrder/addPaymentMethod`,
    {
      purchaseOrderId: paymentData.purchaseOrderId,
      paymentType: paymentData.paymentType,
      chequeNo: paymentData.chequeNo || null,
      creditAmount: paymentData.creditAmount || null,
      chequeDate: paymentData.chequeDate || null,
    },
    { headers }
  );
  return response.data;
};

export const payCredit = async (paymentData) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/purchaseOrder/payCredit`,
    {
      purchaseOrderId: paymentData.purchaseOrderId,
      paymentType: paymentData.paymentType,
      chequeNo: paymentData.chequeNo || null,
      creditAmount: paymentData.creditAmount || null,
      chequeDate: paymentData.chequeDate || null,
    },
    { headers }
  );
  return response.data;
};
