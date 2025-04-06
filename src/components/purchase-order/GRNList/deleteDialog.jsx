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
