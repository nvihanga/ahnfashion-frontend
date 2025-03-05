import PropTypes from "prop-types";

export default function DeleteConfirmationModal({
  showDeleteModal,
  grnToDelete,
  confirmDelete,
  closeModal,
}) {
  if (!showDeleteModal || !grnToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md">
        <div className="flex items-center justify-center mb-4 text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2 text-center">Confirm Delete</h2>
        <p className="text-center mb-6">
          Are you sure you want to delete GRN{" "}
          <span className="font-semibold">{grnToDelete.grnNumber}</span>? This
          action cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteConfirmationModal.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  grnToDelete: PropTypes.shape({
    grnNumber: PropTypes.string.isRequired,
  }).isRequired,
  confirmDelete: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
