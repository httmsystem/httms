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

const SupplierCreateModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [suppliers, setSuppliers] = useState({
    product_services_type: "",
    name: "",
    status: "Active",
  });

  const onChange = (e) => {
    setSuppliers((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(props.createSupplier(suppliers));
    setSuppliers({
      product_services_type: "",
      name: "",
      status: "Active",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Supplier
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Supplier</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Name of Supplier"
            name="name"
            id="name"
            value={suppliers.name}
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

export default SupplierCreateModal;
