import { rawMaterialApi, rawMaterialTypeApi } from '../../../api/rawMaterialApi';
import { supplierApi } from '../../../api/supplierApi';


export const addRawMaterialType = async (rawTypeName) => {
  const response = await rawMaterialTypeApi.post('/save', { rawTypeName });
  return response.data;
};

export const getRawMaterialTypes = async () => {
  const response = await rawMaterialTypeApi.get('/list');
  return response.data;
};

export const addRawMaterial = async (rawMaterial) => {
  const response = await rawMaterialApi.post('/save', {
    rawName: rawMaterial.productName,
    rawQuantity: rawMaterial.quantity,
    rawPrice: rawMaterial.price,
    rawTypeId: rawMaterial.productType,
    rawDescription: rawMaterial.description || "",
    rawMinimumStockLevel: rawMaterial.minimumStockLevel || 0,
    supplierId: [rawMaterial.supplier],
  });
  return response.data;
};

export const getSuppliers = async () => {
  const response = await supplierApi.get('/all'); 
  return response.data;
};

export const getRawMaterials = async () => {
  const response = await rawMaterialApi.get('/list');
  return response.data;
};

export const editRawMaterial = async (rawMaterial) => {
  const response = await rawMaterialApi.put('/update', {
    rawId: rawMaterial.rawId,
    rawName: rawMaterial.rawName,
    rawQuantity: rawMaterial.rawQuantity,
    rawPrice: rawMaterial.rawPrice,
    rawTypeId: rawMaterial.rawTypeId,
    rawDescription: rawMaterial.description || "",
    rawMinimumStockLevel: rawMaterial.minimumStockLevel || 0,
    supplierId: rawMaterial.supplierId,
  });
  return response.data;
};

export const deleteRawMaterial = async (rawId) => {
  const response = await rawMaterialApi.delete(`/delete/${rawId}`);
  return response.data;
};

