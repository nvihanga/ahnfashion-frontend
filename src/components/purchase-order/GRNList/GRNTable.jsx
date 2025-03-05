import { format } from "date-fns";
import PropTypes from "prop-types";

export default function GRNTable({
  filteredGRNs,
  handleGRNClick,

  handleDeleteClick,
  getPaymentStatus,
  getPaymentAction,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
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
            <tr key={grn.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  onClick={() => handleGRNClick(grn)}
                >
                  {grn.grnNumber}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {grn.supplier}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                Rs. {grn.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getPaymentStatus(grn)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {grn.paymentMethod || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {format(grn.date, "yyyy-MM-dd")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-4">
                  {getPaymentAction(grn)}
                  {grn.paidAmount === 0 && (
                    <button
                      onClick={() => handleDeleteClick(grn)}
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
      id: PropTypes.number.isRequired,
      grnNumber: PropTypes.string.isRequired,
      supplier: PropTypes.string.isRequired,
      totalAmount: PropTypes.number.isRequired,
      paymentMethod: PropTypes.string,
      date: PropTypes.instanceOf(Date).isRequired,
      paidAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleGRNClick: PropTypes.func.isRequired,
  handlePaymentClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  getPaymentStatus: PropTypes.func.isRequired,
  getPaymentAction: PropTypes.func.isRequired,
};
