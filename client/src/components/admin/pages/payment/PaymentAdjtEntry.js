import React, { useState } from "react";
import {
  Button,
  Box,
  Modal,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

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
      prefix=""
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PaymentAdjtEntry = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 4,
    overflow: "hidden",
  };

  const [adj_type, set_adj_type] = useState("");
  const [amt, set_amt] = useState(0);

  const data = {
    receipt: { _id: props.receipt._id },
    booking: { _id: ""},
    adjustment_type: adj_type,
    amount: amt,
    tag: "ADJ",
  };

  const onSubmit = (e) => {
    props.dispatch(props.createAdjustment(data));
    props.handle_close_adjst();
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handle_close_view_payment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <>
            

            <Grid container spacing={1} columns={16}>
              <Grid item xs={16}></Grid>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Adjustment Type
                  </InputLabel>
                  <Select
                    name="adjustment_type"
                    label="Adjustment Type"
                    value={adj_type}
                    onChange={(e) => {
                      set_adj_type(e.target.value);
                    }}
                  >
                    <MenuItem value={"OVERPAYMENT"}>OVERPAYMENT</MenuItem>
                    <MenuItem value={"MISC. INCOME"}>MISC. INCOME</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  onChange={(e) => {
                    set_amt(parseFloat(e.target.value));
                  }}
                  value={amt}
                  fullWidth
                  name="amount"
                  label="Ajustment Amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {props.receipt.currency}
                      </InputAdornment>
                    ),
                    inputComponent: NumberFormatCustom,
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button
                variant="contained"
                margin="dense"
                color="success"
                sx={{ m: 1 }}
                onClick={onSubmit}
              >
                Done
              </Button>
              <Button
                variant="contained"
                margin="dense"
                color="error"
                onClick={props.handle_close_adjst}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentAdjtEntry;
