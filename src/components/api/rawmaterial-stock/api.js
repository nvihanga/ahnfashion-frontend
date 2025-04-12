import { rawMaterialStockApi } from '../../../api/rawMaterialApi';

export const addRawMaterialStock = async (rawMaterialStockList) => {
  const response = await rawMaterialStockApi.post('/add-batch', rawMaterialStockList);
  return response.data;
};

export const removeRawMaterialStock = async (rawMaterialStockList) => {
  const response = await rawMaterialStockApi.post('/remove-batch', rawMaterialStockList);
  return response.data;
};

export const getRawMaterialStock = async (rawMaterialId) => {
  const response = await rawMaterialStockApi.get(`/stock-history/${rawMaterialId}`);
  return response.data;
};