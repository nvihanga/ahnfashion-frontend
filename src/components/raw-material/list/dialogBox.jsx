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

export default function DialogBox({
  openProp,
  onCloseProp,
  handleDeleteProp,
  selectedItemProp,
}) {
  return (
    <>
      <Dialog
        open={openProp}
        onClose={onCloseProp}
        TransitionComponent={Transition}
        keepMounted
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  rounded-lg max-w-md w-full">
            <DialogTitle className="text-lg font-medium mb-2">
              Are You Sure?
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="text-gray-500 mb-4">
                
                  This will delete the{" "}
                  <span className="text-black font-bold">
                    {selectedItemProp ? selectedItemProp.productName : ""}
                  </span>{" "}
                  permanently and cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  onClick={onCloseProp}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleDeleteProp}
                >
                  Delete
                </button>
              </div>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </>
  );
}

DialogBox.propTypes = {
  openProp: PropTypes.bool.isRequired,
  onCloseProp: PropTypes.func.isRequired,
  handleDeleteProp: PropTypes.func.isRequired,
  selectedItemProp: PropTypes.shape({
    productName: PropTypes.string,
  }),
};
