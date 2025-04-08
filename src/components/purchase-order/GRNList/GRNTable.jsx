import { format } from "date-fns";
import PropTypes from "prop-types";

export default function GRNTable({
  filteredGRNs,
  handleGRNClick,
  handleDeleteClick,
  getPaymentAction,
}) {
  return (
    <div className="border rounded-lg overflow-hidden m-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              GRN Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Supplier
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Net Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              To Pay
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredGRNs.map((grn) => (
            <tr key={grn.purchaseOrderId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  onClick={() => handleGRNClick(grn)}
                >
                  {grn.grnNumber}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {grn.supplierName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                Rs. {grn.purchaseOrderTotal.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{grn.toPay}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {grn.paymentType || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(new Date(grn.purchaseOrderDate), "yyyy-MM-dd")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-4">
                  {getPaymentAction(grn)}
                  {!grn.sendCreated && !grn.paymentType && (
                    <button
                      onClick={() =>
                        handleDeleteClick({
                          id: grn.purchaseOrderId,
                          grnNumber: grn.grnNumber,
                        })
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

GRNTable.propTypes = {
  filteredGRNs: PropTypes.arrayOf(
    PropTypes.shape({
      purchaseOrderId: PropTypes.number.isRequired,
      purchaseOrderDate: PropTypes.string.isRequired,
      purchaseOrderTotal: PropTypes.number.isRequired,
      grnNumber: PropTypes.string.isRequired,
      supplierName: PropTypes.string.isRequired,
      paymentType: PropTypes.string,
      toPay: PropTypes.string,
      sendCreated: PropTypes.bool.isRequired,
      grnCreated: PropTypes.bool.isRequired,
    })
  ).isRequired,
  handleGRNClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  getPaymentStatus: PropTypes.func.isRequired,
  getPaymentAction: PropTypes.func.isRequired,
};
