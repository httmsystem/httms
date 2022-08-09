import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const UtilityCreateModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [utility, setutility] = useState({
    name: "",
  });

  const onChange = (e) => {
    setutility((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(props.createUtility(utility));
    setutility({
      name: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Utility
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Utility</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Utility Name"
            name="name"
            id="name"
            value={utility.name}
            onChange={onChange}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UtilityCreateModal;
