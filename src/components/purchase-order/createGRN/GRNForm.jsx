"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  getPurchaseOrderById,
  getPurchaseOrders,
} from "../../api/purchase-order/api";
import Toast from "../../common/Toast";
import Select from "react-select";
import { getRawMaterials } from "../../api/rawmaterial/api";
import { createGRN } from "../../api/grn-create/api";

export default function GRNForm() {
  const [loading, setLoading] = useState(false);
  const [grnNumber, setGRNNumber] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedPO, setSelectedPO] = useState(null);
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [purchaseOrderOptions, setPurchaseOrderOptions] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [errors, setErrors] = useState({
    grnNumber: "",
    date: "",
    purchaseOrder: "",
    items: "",
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        const response = await getPurchaseOrders();
        const filteredOrders = response.data.filter(
          (order) => !order.grnCreated
        );
        const options = filteredOrders.map((order) => ({
          value: order.purchaseOrderId,
          label: order.invoiceNumber,
        }));
        setPurchaseOrderOptions(options);
        setToast({
          open: true,
          severity: "success",
          message: "Purchase orders fetched successfully",
        });
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message: "Failed to fetch purchase orders: " + error.message,
        });
      }
    };
    fetchPurchaseOrders();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const response = await getRawMaterials();
      setRawMaterials(response.data || []);
      setToast({
        open: true,
        severity: "success",
        message: "Raw materials fetched successfully",
      });
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: error.message || "Failed to fetch raw materials",
      });
    }
  };

  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const handlePOSelect = async (selectedOption) => {
    if (!selectedOption) {
      setSelectedPO(null);
      setSupplier("");
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const response = await getPurchaseOrderById(selectedOption.value);
      const poData = response.data;

      setSelectedPO(selectedOption);
      setSupplier(poData.supplierName);

      const grnItems = poData.purchaseOrderItems.map((item, index) => ({
        id: index + 1,
        rawId: item.rawId,
        name: item.rawName,
        unitPrice: item.rawUnitPrice,
        receivedQuantity: item.rawUnits,
        totalCost: item.itemTotal,
      }));

      setItems(grnItems);
      calculateSubTotal(grnItems);

      setToast({
        open: true,
        severity: "success",
        message: "Purchase order details loaded successfully",
      });
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: "Failed to fetch purchase order details: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateItem = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const updates = { ...item, [field]: value };
          if (field === "unitPrice" || field === "receivedQuantity") {
            updates.totalCost = updates.unitPrice * updates.receivedQuantity;
          }
          return updates;
        }
        return item;
      })
    );
  };

  const calculateSubTotal = (itemsList) => {
    const total = itemsList.reduce((sum, item) => sum + item.totalCost, 0);
    setSubTotal(total);
  };

  const addNewItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([
      ...items,
      {
        id: newId,
        rawId: "",
        name: "",
        unitPrice: 0,
        receivedQuantity: 1,
        totalCost: 0,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      calculateSubTotal(updatedItems);
    }
  };

  const validateForm = () => {
    const newErrors = {
      grnNumber: "",
      date: "",
      purchaseOrder: "",
      items: "",
    };

    let isValid = true;

    if (!grnNumber.trim()) {
      newErrors.grnNumber = "GRN number is required";
      isValid = false;
    }

    if (!date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    if (!selectedPO) {
      newErrors.purchaseOrder = "Purchase Order is required";
      isValid = false;
    }

    const hasValidItem = items.some(
      (item) => item.rawId && item.receivedQuantity > 0 && item.unitPrice > 0
    );
    if (!hasValidItem) {
      newErrors.items = "At least one item with valid details is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateGRN = async () => {
    if (!validateForm()) {
      setToast({
        open: true,
        severity: "error",
        message: "Please fill in all required fields",
      });
      return;
    }

    try {
      const grnData = {
        invoiceNumber: selectedPO.label,
        supplierId: supplier.id, // Make sure supplier ID is available in supplier state
        purchaseOrderDate: new Date(date).toISOString(),
        purchaseOrderTotal: subTotal,
        grnNumber: grnNumber,
        purchaseOrderItems: items.map((item) => ({
          rawId: parseInt(item.rawId),
          rawUnitPrice: parseFloat(item.unitPrice),
          rawUnits: parseFloat(item.receivedQuantity),
          itemTotal: parseFloat(item.totalCost),
        })),
        grnCreated: true,
      };

      const response = await createGRN(grnData);
      setToast({
        open: true,
        severity: "success",
        message: "GRN created successfully " + response.data,
      });

      // Reset form
      setSelectedPO(null);
      setSupplier("");
      setItems([]);
      setSubTotal(0);
    } catch (error) {
      setToast({
        open: true,
        severity: "error",
        message: error.response?.data?.message || "Failed to create GRN",
      });
    }
  };

  const formattedRawMaterialOptions = rawMaterials.map((material) => ({
    value: material.rawId,
    label: material.rawName,
  }));

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 px-5">
        Create Goods Received Note (GRN)
      </h1>

      <div className="bg-blue-50 py-6 rounded-lg mb-8 px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-2">
              GRN Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded ${
                errors.grnNumber ? "border-red-500" : ""
              }`}
              value={grnNumber}
              onChange={(e) => setGRNNumber(e.target.value)}
              placeholder="Enter GRN Number"
            />
            {errors.grnNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.grnNumber}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className={`w-full p-2 border rounded ${
                errors.date ? "border-red-500" : ""
              }`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-2">
              Purchase Order <span className="text-red-500">*</span>
            </label>
            <Select
              className={`w-full ${
                errors.purchaseOrder ? "border-red-500" : ""
              }`}
              value={selectedPO}
              onChange={handlePOSelect}
              options={purchaseOrderOptions}
              isClearable
              placeholder="Search Purchase Order..."
              isLoading={loading}
            />
            {errors.purchaseOrder && (
              <p className="text-red-500 text-sm mt-1">
                {errors.purchaseOrder}
              </p>
            )}
          </div>
          {supplier && (
            <div>
              <label className="block font-medium mb-2">Supplier</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-50"
                value={supplier}
                readOnly
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 px-5">
        <div className="grid grid-cols-12 gap-4 font-medium py-2 border-b">
          <div className="col-span-1"></div>
          <div className="col-span-5">Item Name</div>
          <div className="col-span-2">Unit Price</div>
          <div className="col-span-2">Received Qty</div>
          <div className="col-span-2">Total Cost</div>
          <div className="col-span-1">Actions</div>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-4 items-center py-2 border-b"
          >
            <div className="col-span-1">
              <button
                onClick={addNewItem}
                className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="col-span-4">
              <div className="text-xs text-gray-500">Item Name</div>
              <Select
                className="w-full"
                value={formattedRawMaterialOptions.find(
                  (option) => option.value === item.rawId
                )}
                options={formattedRawMaterialOptions}
                isSearchable={true}
                isDisabled={false}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    updateItem(item.id, "rawId", selectedOption.value);
                    updateItem(item.id, "name", selectedOption.label);
                  }
                }}
                placeholder="Search item..."
              />
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500">Unit Price</div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={item.unitPrice}
                onChange={(e) =>
                  updateItem(item.id, "unitPrice", Number(e.target.value))
                }
              />
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500">Received Qty</div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={item.receivedQuantity}
                onChange={(e) =>
                  updateItem(
                    item.id,
                    "receivedQuantity",
                    Number(e.target.value)
                  )
                }
              />
            </div>
            <div className="col-span-2">
              <div className="text-xs text-gray-500">Total Cost</div>
              <div className="p-2 bg-blue-50 rounded">
                ${item.totalCost.toFixed(2)}
              </div>
            </div>
            <div className="col-span-1">
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 flex items-center justify-center text-red-500 rounded-full hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {errors.items && (
          <p className="text-red-500 text-sm mt-2">{errors.items}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-4 mb-6">
        <div className="flex gap-2 items-center">
          <span className=" font-bold">Sub Total:</span>
          <span className="font-bold text-lg w-32 text-right">
            Rs .{subTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleCreateGRN}
        >
          Create GRN
        </button>
        <button
          className="px-6 py-2 bg-red-400 text-white rounded"
          onClick={() => {
            setSelectedPO(null);
            setSupplier("");
            setItems([]);
            setSubTotal(0);
          }}
        >
          Cancel
        </button>
      </div>

      <Toast
        open={toast.open}
        handleClose={handleCloseToast}
        severity={toast.severity}
        message={toast.message}
      />
    </div>
  );
}
