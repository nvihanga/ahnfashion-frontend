import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ openProp, onCloseProp, handleCancelProp }) => {
  return (
    <>
      <Dialog
        open={openProp}
        onClose={onCloseProp}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>
          <p className="text-red-950 font-semibold">Are You sure?</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p className="font-semibold">Are you sure you want to clear all</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCloseProp}>
            No
          </Button>
          <Button variant="contained" color="error" onClick={handleCancelProp}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogBox;

DialogBox.propTypes = {
  openProp: PropTypes.bool.isRequired,
  onCloseProp: PropTypes.func.isRequired,
  handleCancelProp: PropTypes.func.isRequired,
};
