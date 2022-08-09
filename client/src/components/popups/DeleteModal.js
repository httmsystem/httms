import React, { useState, forwardRef } from "react";
import {
  Slide,
  DialogTitle,
  DialogContentText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = ({ ...props }) => {
  // Variables
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.messageContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            autoFocus
            color="primary"
            onClick={props.deleteHandler}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
