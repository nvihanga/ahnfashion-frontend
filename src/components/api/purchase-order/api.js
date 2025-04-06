import axios from "axios";

export const baseUrl = "http://localhost:8085";

const headers = {
  "Content-Type": "application/json",
};

export const addPurchaseOrder = async (purchaseOrder) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/purchaseOrder/save`,
    purchaseOrder,
    { headers }
  );
  return response.data;
};

export const getPurchaseOrders = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/purchaseOrder/getAll`, {
    headers,
  });
  return response.data;
};

export const getPurchaseOrderById = async (id) => {
  const response = await axios.get(
    `${baseUrl}/api/v1/purchaseOrder/getById/${id}`,
    { headers }
  );
  return response.data;
};

export const sendPurchaseOrderEmail = async (invoiceNo) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/purchaseOrder/sendEmail/${invoiceNo}`,
    null,
    { headers }
  );
  return response.data;
};

export const updatePurchaseOrder = async (purchaseOrder) => {
  const response = await axios.put(
    `${baseUrl}/api/v1/purchaseOrder/update`,
    purchaseOrder,
    { headers }
  );
  return response.data;
};

export const deletePurchaseOrder = async (id) => {
  const response = await axios.delete(
    `${baseUrl}/api/v1/purchaseOrder/delete/${id}`,
    { headers }
  );
  return response.data;
};
