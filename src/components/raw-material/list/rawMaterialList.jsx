import { FormControl, TextField, Autocomplete } from "@mui/material";

import EditDrawer from "./editDrawer";
import { useEffect, useState } from "react";
import DialogBox from "./dialogBox";
import { Edit, Trash2 } from "lucide-react";
import {
  deleteRawMaterial,
  editRawMaterial,
  getRawMaterials,
  getRawMaterialTypes,
  getSuppliers,
} from "../../api/rawmaterial/api";
import Toast from "../../common/Toast";
import StockHistoryDrawer from "./stockHistoryDrawer";
import { getRawMaterialStock } from "../../api/rawmaterial-stock/api";

const RawMaterialList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [supplierOptions, setSupplierOptions] = useState([]);
  const [rawMaterialTypeOptions, setRawMaterialTypeOptions] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedRawMaterialType, setSelectedRawMaterialType] = useState("");

  const [newRawMaterial, setNewRawMaterial] = useState([]);
  const [originalRawMaterials, setOriginalRawMaterials] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [stockHistory, setStockHistory] = useState([]);

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleEditClick = (item) => {
    console.log("Edit clicked for item:", item);
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleDeleteClick = async (raw) => {
    console.log("Delete clicked for item:", raw);
    try {
      await deleteRawMaterial(raw.rawId);

      setToast({
        open: true,
        severity: "success",
        message: "Raw material deleted successfully",
      });
      await fetchRawMaterials();
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message:
          error.response?.data?.errorMessage || "Failed to delete raw material",
      });
      return;
    }
    setDialogBoxOpen(false);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  const filter = (supplier, rawMaterialType) => {
    console.log(
      "Filtering with supplier:",
      supplier,
      "and type:",
      rawMaterialType
    );
    console.log("Original materials:", originalRawMaterials);

    let filteredMaterials = [...originalRawMaterials];

    if (supplier) {
      filteredMaterials = filteredMaterials.filter((material) => {
        const result =
          material.supplier === supplier ||
          (Array.isArray(material.supplierName) &&
            material.supplierName.includes(supplier));
        return result;
      });
      console.log("After supplier filter:", filteredMaterials);
    }

    if (rawMaterialType) {
      filteredMaterials = filteredMaterials.filter((material) => {
        const result =
          material.type === rawMaterialType ||
          material.rawType === rawMaterialType;
        return result;
      });
      console.log("After type filter:", filteredMaterials);
    }

    setNewRawMaterial(filteredMaterials);
  };

  const handleSave = (updatedItem) => {
    const handleSave = async (updatedItem) => {
      try {
        const updatedItemData = {
          rawId: updatedItem.rawId,
          rawName: updatedItem.rawName,
          rawPrice: updatedItem.rawPrice,
          rawQuantity: updatedItem.rawQuantity,
          rawTypeId: updatedItem.rawType,
          supplierId: updatedItem.supplierId,
          rawDescription: updatedItem.rawDescription,
        };
        console.log("Updated Item Data:", updatedItemData);

        const response = await editRawMaterial(updatedItemData);

        setToast({
          open: true,
          severity: "success",
          message: "Raw material updated successfully" + response.data,
        });

        const updatedMaterials = newRawMaterial.map((material) =>
          material.rawId === updatedItem.rawId ? updatedItem : material
        );

        setNewRawMaterial(updatedMaterials);
        setOriginalRawMaterials(updatedMaterials);
        await fetchRawMaterials();
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message:
            error.response?.data?.errorMessage ||
            "Failed to update raw material",
        });
      }
    };
    handleSave(updatedItem);
    setDrawerOpen(false);
    setSelectedItem(null);
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      setNewRawMaterial([...originalRawMaterials]);
      return;
    }
    const filteredMaterials = originalRawMaterials.filter((material) =>
      material.rawName.toLowerCase().includes(searchValue)
    );
    setNewRawMaterial(filteredMaterials);
  };

  const handleDialogBoxOpen = (raw) => {
    setDialogBoxOpen(true);
    setSelectedItem(raw);
  };

  const handleHistoryClick = async (raw) => {
    try {
      const response = await getRawMaterialStock(raw.rawId);
      const data = response.data;
      setStockHistory(data);
      setHistoryDrawerOpen(true);
    } catch (e) {
      setToast({
        open: true,
        severity: "error",
        message: "Failed to fetch history" + e.message,
      });
    }
  };

  useEffect(() => {
    const fetchRawTypes = async () => {
      try {
        const response = await getRawMaterialTypes();
        console.log("Raw material types response:", response);

        setToast({
          open: true,
          severity: "success",
          message: "Raw material types fetched successfully",
        });

        setRawMaterialTypeOptions(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message:
            error.response?.data && typeof error.response.data === "object"
              ? error.response.data.errorMessage ||
                JSON.stringify(error.response.data)
              : error.response?.data ||
                error.message ||
                "Failed to fetch raw material types",
        });
      }
    };
    fetchRawTypes();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await getSuppliers();
        console.log("Suppliers response:", response);

        setToast({
          open: true,
          severity: "success",
          message: "Suppliers fetched successfully",
        });

        setSupplierOptions(Array.isArray(response) ? response : []);
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message:
            error.response?.data && typeof error.response.data === "object"
              ? error.response.data.errorMessage ||
                JSON.stringify(error.response.data)
              : error.response?.data ||
                error.message ||
                "Failed to fetch suppliers",
        });
      }
    };
    fetchSuppliers();
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const response = await getRawMaterials();
      console.log("Raw Materials response:", response);

      setToast({
        open: true,
        severity: "success",
        message: "Raw materials fetched successfully",
      });

      setNewRawMaterial(response.data);
      setOriginalRawMaterials(response.data);
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message:
          error.response?.data && typeof error.response.data === "object"
            ? error.response.data.errorMessage ||
              JSON.stringify(error.response.data)
            : error.response?.data ||
              error.message ||
              "Failed to fetch raw materials",
      });
    }
  };

  return (
    <>
      <div className="w-full border-collapse py-4 flex flex-col">
        <div className="">
          <h1 className="font-bold">Filters</h1>
        </div>

        <div className="w-full">
          <div className="flex flex-row gap-5 gap-t-5 mt-5">
            <div className="w-1/3">
              <FormControl fullWidth>
                <Autocomplete
                  options={
                    Array.isArray(supplierOptions) ? supplierOptions : []
                  }
                  getOptionLabel={(option) => option.supplierName}
                  onChange={(event, value) => {
                    const supplierName = value ? value.supplierName : "";
                    console.log("Selected supplier:", supplierName);
                    setSelectedSupplier(supplierName);
                    filter(supplierName, selectedRawMaterialType);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Supplier"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="w-1/3">
              <FormControl fullWidth>
                <Autocomplete
                  options={
                    Array.isArray(rawMaterialTypeOptions)
                      ? rawMaterialTypeOptions
                      : []
                  }
                  getOptionLabel={(option) => option.rawTypeName}
                  onChange={(_, value) => {
                    const typeName = value ? value.rawTypeName : "";
                    console.log("Selected raw material type:", typeName);
                    setSelectedRawMaterialType(typeName);
                    filter(selectedSupplier, typeName);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Raw Material Type"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </div>
            <div className="w-1/3">
              <FormControl fullWidth>
                <TextField
                  id="search"
                  label="Search by Product Name"
                  variant="outlined"
                  onChange={handleSearch}
                />
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newRawMaterial.map((raw) => (
              <tr
                key={raw.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleHistoryClick(raw)}
              >
                <td className="px-6 py-4 whitespace-nowrap">{raw.rawId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-blue-500 hover:text-blue-700">
                  {raw.rawName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{raw.rawType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {raw.rawQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Array.isArray(raw.supplierName)
                    ? raw.supplierName[0]
                    : raw.supplierName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Rs.{raw.rawPrice}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditClick(raw)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDialogBoxOpen(raw)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <EditDrawer
          supplierOptions={supplierOptions}
          rawMaterialTypeOptions={rawMaterialTypeOptions}
          setNewRawMaterial={setNewRawMaterial}
          open={drawerOpen}
          onClose={handleDrawerClose}
          item={selectedItem}
          onSave={handleSave}
        />
      )}
      <DialogBox
        openProp={dialogBoxOpen}
        onCloseProp={() => setDialogBoxOpen(false)}
        selectedItemProp={selectedItem}
        handleDeleteProp={() => handleDeleteClick(selectedItem)}
      />
      <StockHistoryDrawer
        open={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        historyData={stockHistory}
      />
      <Toast
        open={toast.open}
        handleClose={handleCloseToast}
        severity={toast.severity}
        message={toast.message}
      />
    </>
  );
};
export default RawMaterialList;
