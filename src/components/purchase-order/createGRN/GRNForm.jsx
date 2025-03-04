"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";

// Mock data for purchase orders
const mockPurchaseOrders = [
  {
    id: "po1",
    poNumber: "PO-2023-001",
    date: new Date(2023, 2, 15),
    supplier: "Kamal Supplies",
    items: [
      { id: "item1", name: "Buttons", unitPrice: 0.5, quantity: 1000 },
      { id: "item2", name: "Zippers", unitPrice: 0.75, quantity: 500 },
    ],
  },
  {
    id: "po2",
    poNumber: "PO-2023-002",
    date: new Date(2023, 3, 10),
    supplier: "Textile World",
    items: [
      { id: "item3", name: "Cotton Fabric", unitPrice: 5.25, quantity: 200 },
      { id: "item4", name: "Thread Spools", unitPrice: 1.25, quantity: 100 },
    ],
  },
];

export default function GRNForm() {
  const [grnNumber, setGRNNumber] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedPO, setSelectedPO] = useState("");
  const [supplier, setSupplier] = useState("");
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  // Handle PO selection
  const handlePOSelect = (e) => {
    const poId = e.target.value;
    setSelectedPO(poId);
    const selectedOrder = mockPurchaseOrders.find((po) => po.id === poId);

    if (selectedOrder) {
      setSupplier(selectedOrder.supplier);

      // Map PO items to GRN items
      const grnItems = selectedOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        unitPrice: item.unitPrice,
        receivedQuantity: item.quantity, // Default to ordered quantity
        totalCost: item.unitPrice * item.quantity,
      }));

      setItems(grnItems);
      calculateSubTotal(grnItems);
    }
  };

  // Calculate item total cost
  const updateItemQuantity = (id, quantity) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const totalCost = item.unitPrice * quantity;
        return { ...item, receivedQuantity: quantity, totalCost };
      }
      return item;
    });

    setItems(updatedItems);
    calculateSubTotal(updatedItems);
  };

  // Update item unit price
  const updateItemUnitPrice = (id, unitPrice) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const totalCost = unitPrice * item.receivedQuantity;
        return { ...item, unitPrice, totalCost };
      }
      return item;
    });

    setItems(updatedItems);
    calculateSubTotal(updatedItems);
  };

  // Calculate subtotal
  const calculateSubTotal = (itemsList) => {
    const total = itemsList.reduce((sum, item) => sum + item.totalCost, 0);
    setSubTotal(total);
  };

  // Remove an item
  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    calculateSubTotal(updatedItems);
  };

  // Handle date change
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  // Generate GRN number on component mount
  useEffect(() => {
    const timestamp = new Date().getTime().toString().slice(-6);
    setGRNNumber(`GRN-${timestamp}`);
  }, []);

  // Format date for input
  const formatDateForInput = (date) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Create Goods Received Note (GRN)</h1>
      </div>
      <div className="p-6">
        <div className="bg-blue-50 p-6 rounded-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="grn-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                GRN Number
              </label>
              <input
                id="grn-number"
                type="text"
                value={grnNumber}
                onChange={(e) => setGRNNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <input
                id="date"
                type="date"
                value={formatDateForInput(date)}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="purchase-order"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Purchase Order
              </label>
              <select
                id="purchase-order"
                value={selectedPO}
                onChange={handlePOSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Select Purchase Order</option>
                {mockPurchaseOrders.map((po) => (
                  <option key={po.id} value={po.id}>
                    {po.poNumber}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedPO && (
            <div className="mt-4">
              <label
                htmlFor="supplier"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Supplier
              </label>
              <input
                id="supplier"
                type="text"
                value={supplier}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-12 gap-4 font-medium mb-2 px-2">
            <div className="col-span-4">Item Name</div>
            <div className="col-span-2">Unit Price</div>
            <div className="col-span-2">Received Qty</div>
            <div className="col-span-3">Total Cost</div>
            <div className="col-span-1">Actions</div>
          </div>

          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-4 mb-2 items-center"
            >
              <div className="col-span-4">
                <select
                  value={item.name}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                >
                  <option value={item.name}>{item.name}</option>
                </select>
              </div>

              <div className="col-span-2">
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateItemUnitPrice(item.id, Number(e.target.value))
                  }
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="col-span-2">
                <input
                  type="number"
                  value={item.receivedQuantity}
                  onChange={(e) =>
                    updateItemQuantity(item.id, Number(e.target.value))
                  }
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="col-span-3">
                <input
                  type="number"
                  value={item.totalCost.toFixed(2)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-blue-100"
                />
              </div>

              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-end gap-2 mb-6">
          <div className="flex gap-2 items-center">
            <span className="font-medium bg-blue-500 text-white px-4 py-2 rounded">
              Sub Total:
            </span>
            <span className="font-bold text-lg w-32 text-right">
              {subTotal.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium">Grand Total:</span>
            <span className="font-bold text-lg w-32 text-right">
              {subTotal.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm">
            Create GRN
          </button>
          <button className="px-2 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md shadow-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
