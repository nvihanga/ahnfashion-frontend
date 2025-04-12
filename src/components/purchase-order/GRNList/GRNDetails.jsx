import { format } from "date-fns";
import PropTypes from "prop-types";
import { X, Download } from "lucide-react";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

GRNDetails.propTypes = {
  showDetailsModal: PropTypes.bool.isRequired,
  selectedGRN: PropTypes.shape({
    purchaseOrderId: PropTypes.number.isRequired,
    invoiceNumber: PropTypes.string.isRequired,
    purchaseOrderDate: PropTypes.string.isRequired,
    purchaseOrderTotal: PropTypes.number.isRequired,
    supplierId: PropTypes.number.isRequired,
    supplierName: PropTypes.string.isRequired,
    purchaseOrderItems: PropTypes.arrayOf(
      PropTypes.shape({
        rawId: PropTypes.number.isRequired,
        rawName: PropTypes.string.isRequired,
        rawUnitPrice: PropTypes.number.isRequired,
        rawUnits: PropTypes.number.isRequired,
        itemTotal: PropTypes.number.isRequired,
      })
    ).isRequired,
    sendCreated: PropTypes.bool,
    grnCreated: PropTypes.bool,
    paymentType: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
  handlePaymentClick: PropTypes.func.isRequired,
};

export default function GRNDetails({
  showDetailsModal,
  selectedGRN,
  closeModal,
  handlePaymentClick,
}) {
  const contentRef = useRef(null);

  const generatePDF = () => {
    const element = contentRef.current;
    const opt = {
      margin: 1,
      filename: `grn-${selectedGRN?.invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!showDetailsModal || !selectedGRN) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">GRN Details</h2>
          <div className="flex gap-2">
            <button
              onClick={generatePDF}
              className="p-2 hover:bg-blue-100 rounded-full text-blue-600"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div ref={contentRef}>
          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              Gren Created
            </label>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                !selectedGRN.grnCreated
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {!selectedGRN.grnCreated ? "Pending" : "Completed"}
            </span>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Invoice Number
              </label>
              <div className="font-medium">{selectedGRN.invoiceNumber}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <div className="font-medium">
                {format(
                  new Date(selectedGRN.purchaseOrderDate),
                  "MMMM dd, yyyy"
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Supplier
              </label>
              <div className="font-medium">{selectedGRN.supplierName}</div>
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
                      Raw Material
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Units
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedGRN.purchaseOrderItems.map((item) => (
                    <tr key={item.rawId}>
                      <td className="px-4 py-3">{item.rawName}</td>
                      <td className="px-4 py-3 text-right">
                        Rs. {item.rawUnitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">{item.rawUnits}</td>
                      <td className="px-4 py-3 text-right">
                        Rs. {item.itemTotal.toFixed(2)}
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
              <div className="flex justify-between py-2 border-t">
                <span className="font-bold">Total:</span>
                <span className="font-bold">
                  Rs. {selectedGRN.purchaseOrderTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              closeModal();
              if (!selectedGRN.paymentType) {
                handlePaymentClick(selectedGRN);
              }
            }}
            className={`px-4 py-2 mr-2 rounded-md ${
              selectedGRN.paymentType
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={selectedGRN.paymentType !== ""}
          >
            {selectedGRN.paymentType ? "Already Paid" : "Make Payment"}
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
