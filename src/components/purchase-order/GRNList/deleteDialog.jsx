import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmationModal({
  showDeleteModal,
  grnToDelete,
  confirmDelete,
  closeModal,
}) {
  if (!grnToDelete) return null;

  return (
    <Dialog
      open={showDeleteModal}
      onClose={closeModal}
      TransitionComponent={Transition}
      keepMounted
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <DialogTitle>
            <h3 className="text-lg font-medium mb-2">Are You Sure?</h3>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p className="text-gray-500 mb-4">
                This will delete the GRN{" "}
                <span className="text-black font-bold">
                  {grnToDelete.grnNumber}
                </span>{" "}
                permanently and cannot be undone.
              </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </DialogActions>
        </div>
      </div>
    </Dialog>
  );
}

DeleteConfirmationModal.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  grnToDelete: PropTypes.shape({
    purchaseOrderId: PropTypes.number.isRequired,
    grnNumber: PropTypes.string.isRequired,
  }),
  confirmDelete: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
