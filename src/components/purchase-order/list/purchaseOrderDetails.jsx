import { X, Download } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { getPurchaseOrderById } from "../../api/purchase-order/api";
import Toast from "../../common/Toast";

export default function InvoiceDetailsModal({ isOpen, onClose, invoice }) {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const contentRef = useRef(null);

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
          setOrderDetails(response.data);
          setToast({
            open: true,
            severity: "success",
            message: "Purchase order details fetched successfully",
          });
          console.log("Purchase Order Details:", response.data);
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

  const generatePDF = () => {
    const element = contentRef.current;
    const opt = {
      margin: 1,
      filename: `purchase-order-${orderDetails?.invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

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

  const items = orderDetails?.purchaseOrderItems || [];
  const subTotal = orderDetails?.purchaseOrderTotal || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <div className="flex gap-2">
            <button
              onClick={generatePDF}
              className="p-2 hover:bg-blue-100 rounded-full text-blue-600"
              title="Download PDF"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Status - Only visible in UI, not in PDF */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              !orderDetails?.sendCreated
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {!orderDetails?.sendCreated ? "Pending" : "Sent"}
          </span>
        </div>

        {/* PDF Content */}
        <div ref={contentRef}>
          {/* Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Invoice No
              </label>
              <div className="font-medium">{orderDetails?.invoiceNumber}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Date</label>
              <div className="font-medium">
                {new Date(orderDetails?.purchaseOrderDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Supplier
              </label>
              <div className="font-medium">{orderDetails?.supplierName}</div>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.rawId}>
                      <td className="px-4 py-3">{item.rawName}</td>
                      <td className="px-4 py-3 text-right">
                        Rs.{item.rawUnitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">{item.rawUnits}</td>
                      <td className="px-4 py-3 text-right">
                        Rs.{item.itSemTotal.toFixed(2)}
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
                <span className="font-bold">Rs.{subTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
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

InvoiceDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.number,
};
