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

const CustomerEditModal = (props) => {
  const [customerData, setCustomerFormData] = useState({
    customer_type: props.customer.customer_type,
    acct_name: props.customer.acct_name,
    address: props.customer.address,
    contact_no: props.customer.contact_no,
    contact_person: props.customer.contact_person,
    credit_limit_default_value: props.customer.credit_limit_default_value,
    payment_term: props.customer.payment_term,
    email: props.customer.email,
    remarks: props.customer.remarks,
    status: props.customer.status,
  });
  const {
    customer_type,
    acct_name,
    address,
    contact_no,
    contact_person,
    credit_limit_default_value,
    payment_term,
    email,
    remarks,
    status,
  } = customerData;

  const onChange = (e) => {
    setCustomerFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const editCustomerHandler = (e) => {
    e.preventDefault();
    props.dispatch(
      props.updateCustomer({
        _id: props.customer._id,
        customer_type: customerData.customer_type,
        acct_name: customerData.acct_name,
        address: customerData.address,
        contact_no: customerData.contact_no,
        contact_person: customerData.contact_person,
        credit_limit_default_value: customerData.credit_limit_default_value,
        payment_term: customerData.payment_term,
        email: customerData.email,
        remarks: customerData.remarks,
        status: customerData.status,
      })
    );
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <form onSubmit={editCustomerHandler}>
          <DialogTitle>Update Customer's Account</DialogTitle>
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
                value={customer_type}
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
              value={acct_name}
              onChange={onChange}
            />
            <TextField
              margin="dense"
              label="Address"
              fullWidth
              variant="outlined"
              name="address"
              id="address"
              value={address}
              onChange={onChange}
            />
            <TextField
              label="Contact Number"
              fullWidth
              margin="dense"
              name="contact_no"
              id="contact_no"
              value={contact_no}
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
              value={contact_person}
              onChange={onChange}
            />
            <TextField
              margin="dense"
              label="Credit Limit"
              fullWidth
              variant="outlined"
              name="credit_limit_default_value"
              id="credit_limit_default_value"
              value={credit_limit_default_value}
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
                value={payment_term}
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
              value={email}
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
              value={remarks}
              onChange={onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CustomerEditModal;
