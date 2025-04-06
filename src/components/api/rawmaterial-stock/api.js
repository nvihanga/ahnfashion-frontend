import axios from "axios";

export const baseUrl = "http://localhost:8085";

const headers = {
  "Content-Type": "application/json",
};

export const addRawMaterialStock = async (rawMaterialStockList) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/rawMaterial/stock/add-batch`,
    rawMaterialStockList,
    { headers }
  );
  return response.data;
};

export const removeRawMaterialStock = async (rawMaterialStockList) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/rawMaterial/stock/remove-batch`,
    rawMaterialStockList,
    { headers }
  );
  return response.data;
};

export const getRawMaterialStock = async (rawMaterialId) => {
  const response = await axios.get(
    `${baseUrl}/api/v1/rawMaterial/stock-history/${rawMaterialId}`,
    {
      headers,
    }
  );
  return response.data;
};
