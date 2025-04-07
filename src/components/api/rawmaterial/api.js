import axios from "axios";

export const baseUrl = "http://localhost:8085";

const headers = {
  "Content-Type": "application/json",
};

export const addRawMaterialType = async (rawTypeName) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/rawMaterialType/save`,
    { rawTypeName },
    { headers }
  );
  return response.data;
};

export const getRawMaterialTypes = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/rawMaterialType/list`, {
    headers,
  });
  return response.data;
};

export const addRawMaterial = async (rawMaterial) => {
  const response = await axios.post(
    `${baseUrl}/api/v1/rawMaterial/save`,
    {
      rawName: rawMaterial.productName,
      rawQuantity: rawMaterial.quantity,
      rawPrice: rawMaterial.price,
      rawTypeId: rawMaterial.productType,
      rawDescription: rawMaterial.description || "",
      rawMinimumStockLevel: rawMaterial.minimumStockLevel || 0,
      supplierId: [rawMaterial.supplier],
    },
    { headers }
  );
  return response.data;
};

export const getSuppliers = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/supplier/all`, {
    headers,
  });
  return response.data;
};

export const getRawMaterials = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/rawMaterial/list`, {
    headers,
  });
  return response.data;
};

export const editRawMaterial = async (rawMaterial) => {
  const response = await axios.put(
    `${baseUrl}/api/v1/rawMaterial/update`,
    {
      rawId: rawMaterial.rawId,
      rawName: rawMaterial.rawName,
      rawQuantity: rawMaterial.rawQuantity,
      rawPrice: rawMaterial.rawPrice,
      rawTypeId: rawMaterial.rawTypeId,
      rawDescription: rawMaterial.description || "",
      rawMinimumStockLevel: rawMaterial.minimumStockLevel || 0,
      supplierId: rawMaterial.supplierId,
    },
    { headers }
  );
  return response.data;
};

export const deleteRawMaterial = async (rawId) => {
  const response = await axios.delete(
    `${baseUrl}/api/v1/rawMaterial/delete/${rawId}`,
    { headers }
  );
  return response.data;
};
