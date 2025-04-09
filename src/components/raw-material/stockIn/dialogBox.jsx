import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({
  openProp,
  onCloseProp,
  selectedItemProp,
  handleDeleteProp,
}) => {
  return (
    <>
      <Dialog
        open={openProp}
        onClose={onCloseProp}
        TransitionComponent={Transition}
        keepMounted
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <DialogTitle className="text-lg font-medium mb-2">
              Are you sure?
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="text-gray-500 mb-4">
                
                  Are you sure you want to remove{" "}
                  <span className="text-black font-bold">
                    {selectedItemProp ? selectedItemProp.productName : ""}
                  </span>{" "}
                  from list
                
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
                  Remove
                </button>
              </div>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    </>
  );
};
DialogBox.propTypes = {
  openProp: PropTypes.bool.isRequired,
  onCloseProp: PropTypes.func.isRequired,
  selectedItemProp: PropTypes.object,
  handleDeleteProp: PropTypes.func.isRequired,
};

export default DialogBox;
