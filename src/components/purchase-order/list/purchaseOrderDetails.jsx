import { X } from "lucide-react";
import PropTypes from "prop-types";

export default function InvoiceDetailsModal({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  // Mock items data (in real app, this would come from your database)
  const items = [
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
  ];

  const subTotal = items.reduce((sum, item) => sum + item.totalCost, 0);
  const tax = subTotal * 0.1; // 10% tax
  const grandTotal = subTotal + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
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
            <div className="font-medium">{invoice.invoiceNo}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <div className="font-medium">{invoice.date}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Supplier</label>
            <div className="font-medium">{invoice.supplier}</div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              invoice.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {invoice.status === "pending" ? "Pending" : "Sent"}
          </span>
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">{item.units}</td>
                    <td className="px-4 py-3 text-right">
                      ${item.totalCost.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <div className="flex justify-between py-2 border-double border-t-2">
              <span className="font-bold">Grand Total:</span>
              <span className="font-bold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

InvoiceDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.shape({
    invoiceNo: PropTypes.string,
    date: PropTypes.string,
    supplier: PropTypes.string,
    status: PropTypes.string,
  }),
};
