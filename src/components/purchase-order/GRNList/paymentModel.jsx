import PropTypes from "prop-types";

export default function PaymentModal({
  showPaymentModal,
  selectedGRN,
  paymentAmount,
  setPaymentAmount,
  handlePaymentMethodSelect,
  closeModal,
  getRemainingAmount,
}) {
  if (!showPaymentModal || !selectedGRN) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Make Payment</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Amount
          </label>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            max={getRemainingAmount(selectedGRN)}
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-3">
          <button
            onClick={() => handlePaymentMethodSelect("Credit")}
            className="w-full px-4 py-2 text-left rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Credit
          </button>
          <button
            onClick={() => handlePaymentMethodSelect("Cash")}
            className="w-full px-4 py-2 text-left rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cash
          </button>
          <button
            onClick={() => handlePaymentMethodSelect("Cheque")}
            className="w-full px-4 py-2 text-left rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cheque
          </button>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

PaymentModal.propTypes = {
  showPaymentModal: PropTypes.bool.isRequired,
  selectedGRN: PropTypes.object,
  paymentAmount: PropTypes.number.isRequired,
  setPaymentAmount: PropTypes.func.isRequired,
  handlePaymentMethodSelect: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  getRemainingAmount: PropTypes.func.isRequired,
};
