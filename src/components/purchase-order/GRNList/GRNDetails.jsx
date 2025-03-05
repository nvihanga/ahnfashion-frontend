import { format } from "date-fns";
import PropTypes from "prop-types";

GRNDetails.propTypes = {
  showDetailsModal: PropTypes.bool.isRequired,
  selectedGRN: PropTypes.shape({
    grnNumber: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    supplier: PropTypes.string.isRequired,
    poNumber: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unitPrice: PropTypes.number.isRequired,
        totalPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string,
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  handlePaymentClick: PropTypes.func.isRequired,
};

export default function GRNDetails({
  showDetailsModal,
  selectedGRN,
  closeModal,
  handlePaymentClick,
}) {
  if (!showDetailsModal || !selectedGRN) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">GRN Details</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">
                GRN Number
              </span>
              <span className="block text-lg">{selectedGRN.grnNumber}</span>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">
                Date
              </span>
              <span className="block text-lg">
                {format(selectedGRN.date, "MMMM dd, yyyy")}
              </span>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">
                Supplier
              </span>
              <span className="block text-lg">{selectedGRN.supplier}</span>
            </div>
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-500">
                Purchase Order
              </span>
              <span className="block text-lg">{selectedGRN.poNumber}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Unit Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedGRN.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col items-end mb-6">
          <div className="flex justify-between w-64 border-t pt-2">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold">
              ${selectedGRN.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between w-64 mt-2">
            <span className="font-medium">Payment Status:</span>
            <span>
              {selectedGRN.paymentMethod ? (
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    selectedGRN.paymentMethod === "Cash"
                      ? "bg-green-100 text-green-800"
                      : selectedGRN.paymentMethod === "Credit"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedGRN.paymentMethod}
                </span>
              ) : (
                <span className="text-red-500">Not Paid</span>
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              closeModal();
              if (!selectedGRN.paymentMethod) {
                handlePaymentClick(selectedGRN);
              }
            }}
            className={`px-4 py-2 mr-2 rounded-md ${
              selectedGRN.paymentMethod
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={selectedGRN.paymentMethod !== ""}
          >
            {selectedGRN.paymentMethod ? "Already Paid" : "Make Payment"}
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
