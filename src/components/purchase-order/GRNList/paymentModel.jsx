import { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function PaymentModal({
  showPaymentModal,
  selectedGRN,
  paymentAmount,
  setPaymentAmount,
  handlePaymentMethodSelect,
  closeModal,
  getRemainingAmount,
}) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeDate, setChequeDate] = useState("");

  if (!showPaymentModal || !selectedGRN) return null;

  const handleSubmit = () => {
    if (selectedMethod === "Cheque" && (!chequeNumber || !chequeDate)) {
      alert("Please fill in all cheque details");
      return;
    }

    const paymentTypeMap = {
      Cash: "CASH",
      Cheque: "CHEQUE",
      Credit: "CREDIT",
    };

    // If paying a credit
    if (selectedGRN.paymentType === "CREDIT") {
      handlePaymentMethodSelect({
        purchaseOrderId: selectedGRN.purchaseOrderId,
        paymentType: paymentTypeMap[selectedMethod],
        chequeNo: selectedMethod === "Cheque" ? chequeNumber : null,
        creditAmount: paymentAmount,
        chequeDate: selectedMethod === "Cheque" ? chequeDate : null,
        isPayingCredit: true,
      });
      return;
    }

    // Normal payment
    handlePaymentMethodSelect({
      purchaseOrderId: selectedGRN.purchaseOrderId,
      paymentType: paymentTypeMap[selectedMethod],
      chequeNo: selectedMethod === "Cheque" ? chequeNumber : null,
      creditAmount: selectedMethod === "Credit" ? paymentAmount : null,
      chequeDate: selectedMethod === "Cheque" ? chequeDate : null,
    });
  };

  return (
    <Dialog
      open={showPaymentModal}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="text-xl font-bold">Make Payment</DialogTitle>
      <DialogContent>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {["Credit", "Cash", "Cheque"].map((method) => (
              <button
                key={method}
                onClick={() => {
                  setSelectedMethod(method);
                  // Ensure paymentAmount is set correctly when selecting a method
                  if (method === "Credit" || method === "Cheque") {
                    setPaymentAmount(selectedGRN.purchaseOrderTotal);
                  } else if (method === "Cash") {
                    setPaymentAmount(""); // Reset for Cash
                  }
                }}
                className={`p-3 rounded-md border ${
                  selectedMethod === method
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        {selectedMethod && (
          <div className="space-y-4">
            {(selectedMethod === "Credit" || selectedMethod === "Cash") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount
                </label>
                <input
                  type="number"
                  value={paymentAmount || ""} // Ensure paymentAmount is properly bound
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  max={getRemainingAmount(selectedGRN) || 0}
                  min="0"
                  step="0.01"
                />
              </div>
            )}
            {selectedMethod === "Cheque" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount
                  </label>
                  <input
                    type="number"
                    value={paymentAmount || ""} // Ensure paymentAmount is properly bound
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    max={getRemainingAmount(selectedGRN) || 0}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cheque Number
                  </label>
                  <input
                    type="text"
                    value={chequeNumber}
                    onChange={(e) => setChequeNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cheque Date
                  </label>
                  <input
                    type="date"
                    value={chequeDate}
                    onChange={(e) => setChequeDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <div className="flex justify-end gap-4 p-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          {selectedMethod && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Confirm Payment
            </button>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}

PaymentModal.propTypes = {
  showPaymentModal: PropTypes.bool.isRequired,
  selectedGRN: PropTypes.object,
  paymentAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setPaymentAmount: PropTypes.func.isRequired,
  handlePaymentMethodSelect: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getRemainingAmount: PropTypes.func.isRequired,
};
