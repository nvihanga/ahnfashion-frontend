"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X, Plus, Trash2 } from "lucide-react";
import { getPurchaseOrderById } from "../../api/purchase-order/api";
import { getRawMaterials } from "../../api/rawmaterial/api";
import Toast from "../../common/Toast";
import Select from "react-select";

export default function PurchaseOrderEdit({
  isOpen,
  onClose,
  invoice,
  onSave,
}) {
  const [loading, setLoading] = useState(true);
  const [editedInvoice, setEditedInvoice] = useState(null);
  const [items, setItems] = useState([]);
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [toast, setToast] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (invoice && isOpen) {
          setLoading(true);
          const response = await getPurchaseOrderById(invoice);
          const orderData = response.data;

          setEditedInvoice(orderData);
          setItems(
            orderData.purchaseOrderItems.map((item, index) => ({
              listId: index + 1, // Add unique list id
              id: item.rawId,
              name: item.rawName,
              unitPrice: item.rawUnitPrice,
              units: item.rawUnits,
              totalCost: item.itemTotal,
            }))
          );

          setToast({
            open: true,
            severity: "success",
            message: "Purchase order details fetched successfully",
          });
        }
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

    if (isOpen && invoice) {
      fetchOrderDetails();
    }
  }, [invoice, isOpen]);

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await getRawMaterials();
        setProductNameOptions(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        setToast({
          open: true,
          severity: "error",
          message: "Failed to fetch raw materials: " + error.message,
        });
      }
    };
    fetchRawMaterials();
  }, []);

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
          <h2 className="text-xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  const calculateTotal = (unitPrice, units) => {
    return unitPrice * units;
  };

  const addNewRow = () => {
    const newListId = // Use listId for list management
      items.length > 0 ? Math.max(...items.map((item) => item.listId)) + 1 : 1;
    setItems([
      ...items,
      {
        listId: newListId,
        id: null, // This will hold the rawId
        name: "",
        unitPrice: 0,
        units: 1,
        totalCost: 0,
      },
    ]);
  };

  const removeRow = (listId) => {
    setItems(items.filter((item) => item.listId !== listId));
  };

  const formattedRawMaterialOptions = productNameOptions.map((product) => ({
    value: product.rawId,
    label: product.rawName,
    price: product.rawPrice,
  }));

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item };

          if (field === "name") {
            const selectedProduct = value ? value.value : "";
            updatedItem.name = value ? value.label : "";
            updatedItem.id = selectedProduct;
            if (value) {
              updatedItem.unitPrice = value.price;
              updatedItem.totalCost = value.price * updatedItem.units;
            }
          } else {
            updatedItem[field] = value;
            if (field === "unitPrice" || field === "units") {
              updatedItem.totalCost = calculateTotal(
                field === "unitPrice" ? value : item.unitPrice,
                field === "units" ? value : item.units
              );
            }
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    const subTotal = items.reduce((sum, item) => sum + item.totalCost, 0);
    const formattedInvoice = {
      invoiceNumber: editedInvoice.invoiceNumber,
      supplierId: editedInvoice.supplierId,
      purchaseOrderDate: editedInvoice.purchaseOrderDate,
      purchaseOrderTotal: subTotal,
      purchaseOrderItems: items.map((item) => ({
        rawId: item.id ? Number(item.id) : null,
        rawUnitPrice: parseFloat(item.unitPrice),
        rawUnits: parseFloat(item.units),
        itemTotal: item.totalCost,
      })),
    };

    console.log("Updated purchase order:", formattedInvoice);
    onSave(formattedInvoice);
    onClose();
  };

  const subTotal = items.reduce((sum, item) => sum + item.totalCost, 0);
  const grandTotal = subTotal;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Edit Invoice</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Invoice No
            </label>
            <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-700">
              {editedInvoice.invoiceNumber}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-700">
              {new Date(editedInvoice.purchaseOrderDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Supplier</label>
            <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-700">
              {editedInvoice.supplierName}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-4 px-5">
          <div className="grid grid-cols-12 gap-4 font-medium py-2 border-b">
            <div className="col-span-1"></div>
            <div className="col-span-5">Item Name</div>
            <div className="col-span-2">Unit Price</div>
            <div className="col-span-2">Units</div>
            <div className="col-span-2">Total Cost</div>
            <div className="col-span-1">Actions</div>
          </div>

          {items.map((item) => (
            <div
              key={item.listId}
              className="grid grid-cols-12 gap-4 items-center py-2 border-b"
            >
              <div className="col-span-1">
                <button
                  onClick={addNewRow}
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
                    (option) => option.label === item.name
                  )}
                  onChange={(value) => updateItem(item.id, "name", value)}
                  options={formattedRawMaterialOptions}
                  isClearable
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
                    updateItem(
                      item.id,
                      "unitPrice",
                      Number.parseFloat(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500">Units</div>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={item.units}
                  onChange={(e) =>
                    updateItem(
                      item.id,
                      "units",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
              <div className="col-span-2">
                <div className="text-xs text-gray-500">Total Cost</div>
                <div className="p-2">${item.totalCost.toFixed(2)}</div>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => removeRow(item.listId)}
                  className="w-8 h-8 flex items-center justify-center text-red-500 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t pt-4">
          <div className="w-64 ml-auto">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Sub Total:</span>
              <span className="font-medium">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="font-bold">Grand Total:</span>
              <span className="font-bold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
        <Toast
          open={toast.open}
          handleClose={handleCloseToast}
          severity={toast.severity}
          message={toast.message}
        />
      </div>
    </div>
  );
}

PurchaseOrderEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.number,
  onSave: PropTypes.func.isRequired,
};
