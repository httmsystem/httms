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

const BankCreateModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [bank, setbank] = useState({
    bank_name: "",
    acct_no: "",
    status: "Active",
  });

  const onChange = (e) => {
    setbank((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(props.createBank(bank));
    setbank({
      bank_name: "",
      acct_no: "",
      status: "Active",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Bank Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Bank Acct.</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Bank Name"
            name="bank_name"
            id="bank_name"
            value={bank.name}
            onChange={onChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Acct. No"
            name="acct_no"
            id="acct_no"
            value={bank.acct_no}
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

export default BankCreateModal;
