"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X, Plus, Trash2 } from "lucide-react";

export default function PurchaseOrderEdit({
  isOpen,
  onClose,
  invoice,
  onSave,
}) {
  const [editedInvoice, setEditedInvoice] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (invoice) {
      setEditedInvoice({
        ...invoice,
      });

      // Initialize with mock items or actual items if available
      setItems([
        {
          id: 1,
          name: "Buttons",
          unitPrice: 0.5,
          units: 200,
          totalCost: 100,
        },
        {
          id: 2,
          name: "Zippers",
          unitPrice: 1.0,
          units: 100,
          totalCost: 100,
        },
        {
          id: 3,
          name: "Thread",
          unitPrice: 2.5,
          units: 30,
          totalCost: 75,
        },
      ]);
    }
  }, [invoice]);

  if (!isOpen || !editedInvoice) return null;

  const calculateTotal = (unitPrice, units) => {
    return unitPrice * units;
  };

  const addNewRow = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    setItems([
      ...items,
      {
        id: newId,
        name: "",
        unitPrice: 0,
        units: 1,
        totalCost: 0,
      },
    ]);
  };

  const removeRow = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate total cost if unit price or units changed
          if (field === "unitPrice" || field === "units") {
            updatedItem.totalCost = calculateTotal(
              field === "unitPrice" ? value : item.unitPrice,
              field === "units" ? value : item.units
            );
          }

          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleSave = () => {
    const subTotal = items.reduce((sum, item) => sum + item.totalCost, 0);
    const updatedInvoice = {
      ...editedInvoice,
      total: subTotal,
      items: items,
    };
    onSave(updatedInvoice);
    onClose();
  };

  const subTotal = items.reduce((sum, item) => sum + item.totalCost, 0);
  const tax = subTotal * 0.1; // 10% tax
  const grandTotal = subTotal + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={editedInvoice.invoiceNo}
              onChange={(e) =>
                setEditedInvoice({
                  ...editedInvoice,
                  invoiceNo: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md"
              value={editedInvoice.date}
              onChange={(e) =>
                setEditedInvoice({ ...editedInvoice, date: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Supplier</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={editedInvoice.supplier}
              onChange={(e) =>
                setEditedInvoice({ ...editedInvoice, supplier: e.target.value })
              }
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Item Name
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Units
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Total Cost
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <select
                        className="w-full p-2 border rounded-md"
                        value={item.name}
                        onChange={(e) =>
                          updateItem(item.id, "name", e.target.value)
                        }
                      >
                        <option value="">Select Item</option>
                        <option value="Buttons">Buttons</option>
                        <option value="Zippers">Zippers</option>
                        <option value="Thread">Thread</option>
                        <option value="Fabric">Fabric</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md text-right"
                        value={item.unitPrice}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "unitPrice",
                            Number.parseFloat(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md text-right"
                        value={item.units}
                        onChange={(e) =>
                          updateItem(
                            item.id,
                            "units",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      ${item.totalCost.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeRow(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addNewRow}
            className="mt-3 flex items-center text-blue-500 hover:text-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </button>
        </div>

        {/* Totals */}
        <div className="border-t pt-4">
          <div className="w-64 ml-auto">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Sub Total:</span>
              <span className="font-medium">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax (10%):</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2  border-double border-t-2">
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
      </div>
    </div>
  );
}

PurchaseOrderEdit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};
