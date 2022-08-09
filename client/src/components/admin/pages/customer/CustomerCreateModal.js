import React, { useState } from "react";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import NumberFormat from "react-number-format";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="₱"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(+63) 0000-000000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CustomerCreateModal = (props) => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomerFormData] = useState({
    customer_type: "",
    acct_name: "",
    address: "",
    contact_no: "",
    contact_person: "",
    credit_limit_default_value: "",
    payment_term: "",
    email: "",
    remarks: "",
    status: "Active",
  });

  const onChange = (e) => {
    setCustomerFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(props.createCustomer(customer));
    setCustomerFormData({
      customer_type: "",
      acct_name: "",
      address: "",
      contact_no: "",
      contact_person: "",
      credit_limit_default_value: "",
      payment_term: "",
      email: "",
      remarks: "",
      status: "Active",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create New Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <DialogTitle>Create New Customer's Account</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">
                Customer Type
              </InputLabel>
              <Select
                autoFocus
                label="Customer Type"
                name="customer_type"
                id="customer_type"
                value={customer.customer_type}
                onChange={onChange}
              >
                <MenuItem value="SUB-AGENT">SUB-AGENT</MenuItem>
                <MenuItem value="CORPORATE">CORPORATE</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Account Name"
              fullWidth
              variant="outlined"
              name="acct_name"
              id="acct_name"
              value={customer.acct_name}
              onChange={onChange}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              variant="outlined"
              name="address"
              id="address"
              value={customer.address}
              onChange={onChange}
            />
            <TextField
              label="Contact Number"
              fullWidth
              margin="dense"
              name="contact_no"
              id="contact_no"
              value={customer.contact_no}
              onChange={onChange}
              InputProps={{
                inputComponent: TextMaskCustom,
              }}
            />
            <TextField
              margin="dense"
              label="Contact Person"
              fullWidth
              variant="outlined"
              name="contact_person"
              id="contact_person"
              value={customer.contact_person}
              onChange={onChange}
            />
            <TextField
              margin="dense"
              label="Credit Limit"
              fullWidth
              variant="outlined"
              name="credit_limit_default_value"
              id="credit_limit_default_value"
              value={customer.credit_limit_default_value}
              onChange={onChange}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">
                Payment Term
              </InputLabel>
              <Select
                label="Customer Type"
                name="payment_term"
                id="payment_term"
                value={customer.payment_term}
                onChange={onChange}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Email Address"
              fullWidth
              variant="outlined"
              name="email"
              id="email"
              value={customer.email}
              onChange={onChange}
              type="email"
            />

            <TextField
              margin="dense"
              label="Remarks"
              fullWidth
              variant="outlined"
              name="remarks"
              id="remarks"
              value={customer.remarks}
              onChange={onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CustomerCreateModal;
