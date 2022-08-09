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

const PaymentAdjtEntrySoa = (props) => {
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
  const [draft_pay_detail, set_draft_pay_detail] = useState({
    payment_detail: props.booking.payment_detail,
  });
  // // PHP CURRENCY
  // let pay_php =
  //   parseFloat(draft_pay_detail.payment_detail.amount_received_php) +
  //   parseFloat(amt);

  // let pay_php_bal =
  //   parseFloat(draft_pay_detail.payment_detail.balance_php) - parseFloat(amt);

  // let pay_usd_convert =
  //   parseFloat(draft_pay_detail.payment_detail.amount_received_usd) +
  //   parseFloat(amt / parseFloat(props.booking.acr.rate));
  // let pay_bal_usd_convert =
  //   parseFloat(draft_pay_detail.payment_detail.balance_usd) -
  //   parseFloat(amt / parseFloat(props.booking.acr.rate));
  // console.log(pay_bal_usd_convert);
  // console.log(pay_php_bal);
  // // USD CURRENCY
  // let pay_usd =
  //   parseFloat(draft_pay_detail.payment_detail.amount_received_usd) +
  //   parseFloat(amt);
  // let pay_usd_bal =
  //   parseFloat(draft_pay_detail.payment_detail.balance_usd) - parseFloat(amt);
  // let pay_php_convert =
  //   parseFloat(draft_pay_detail.payment_detail.amount_received_php) +
  //   parseFloat(amt) * parseFloat(props.booking.acr.rate);
  // let pay_bal_php_convert =
  //   parseFloat(draft_pay_detail.payment_detail.balance_php) -
  //   parseFloat(amt) * parseFloat(props.booking.acr.rate);

  const data = {
    receipt: { _id: "" },
    booking: { _id: props.booking._id },
    adjustment_type: adj_type,
    amount: amt,
    tag: "ADJ",
  };

  const onSubmit = (e) => {
    // if (props.receipt.currency === "₱") {
    //   if (pay_php_bal === parseFloat(0)) {
    //     props.dispatch(
    //       props.updateRs({
    //         _id: props.booking._id,
    //         particular: props.booking.particular,
    //         ref_no: props.booking.ref_no,
    //         booking_no: props.booking.booking_no,
    //         rs_no: props.booking.rs_no,
    //         acr: props.booking.acr,
    //         customer: props.booking.customer,
    //         product_service: props.booking.product_service,
    //         product_service_compute: props.booking.product_service_compute,
    //         passenger: props.booking.passenger,
    //         grand_total_cost: props.booking.grand_total_cost,
    //         grand_total_selling: props.booking.grand_total_selling,
    //         payment_due: props.booking.payment_due,
    //         payment_detail: {
    //           amount_received_php: pay_php,
    //           balance_php: pay_php_bal,
    //           amount_received_usd: pay_usd_convert,
    //           balance_usd: pay_bal_usd_convert,
    //         },
    //         status: "PAID",
    //       })
    //     );
    //   } else {
    //     props.dispatch(
    //       props.updateRs({
    //         _id: props.booking._id,
    //         particular: props.booking.particular,
    //         ref_no: props.booking.ref_no,
    //         booking_no: props.booking.booking_no,
    //         rs_no: props.booking.rs_no,
    //         acr: props.booking.acr,
    //         customer: props.booking.customer,
    //         product_service: props.booking.product_service,
    //         product_service_compute: props.booking.product_service_compute,
    //         passenger: props.booking.passenger,
    //         grand_total_cost: props.booking.grand_total_cost,
    //         grand_total_selling: props.booking.grand_total_selling,
    //         payment_due: props.booking.payment_due,
    //         payment_detail: {
    //           amount_received_php: pay_php,
    //           balance_php: pay_php_bal,
    //           amount_received_usd: pay_usd_convert,
    //           balance_usd: pay_bal_usd_convert,
    //         },
    //         status: props.booking.status,
    //       })
    //     );
    //   }
    // } else if (props.receipt.currency === "$") {
    //   if (pay_usd_bal === parseFloat(0)) {
    //     props.dispatch(
    //       props.updateRs({
    //         _id: props.booking._id,
    //         particular: props.booking.particular,
    //         ref_no: props.booking.ref_no,
    //         booking_no: props.booking.booking_no,
    //         rs_no: props.booking.rs_no,
    //         acr: props.booking.acr,
    //         customer: props.booking.customer,
    //         product_service: props.booking.product_service,
    //         product_service_compute: props.booking.product_service_compute,
    //         passenger: props.booking.passenger,
    //         grand_total_cost: props.booking.grand_total_cost,
    //         grand_total_selling: props.booking.grand_total_selling,
    //         payment_due: props.booking.payment_due,
    //         payment_detail: {
    //           amount_received_php: parseFloat(pay_php_convert),
    //           balance_php: parseFloat(pay_bal_php_convert),
    //           amount_received_usd: parseFloat(pay_usd),
    //           balance_usd: parseFloat(pay_usd_bal),
    //         },
    //         status: "PAID",
    //       })
    //     );
    //   } else {
    //     props.dispatch(
    //       props.updateRs({
    //         _id: props.booking._id,
    //         particular: props.booking.particular,
    //         ref_no: props.booking.ref_no,
    //         booking_no: props.booking.booking_no,
    //         rs_no: props.booking.rs_no,
    //         acr: props.booking.acr,
    //         customer: props.booking.customer,
    //         product_service: props.booking.product_service,
    //         product_service_compute: props.booking.product_service_compute,
    //         passenger: props.booking.passenger,
    //         grand_total_cost: props.booking.grand_total_cost,
    //         grand_total_selling: props.booking.grand_total_selling,
    //         payment_due: props.booking.payment_due,
    //         payment_detail: {
    //           amount_received_php: parseFloat(pay_usd),
    //           balance_php: parseFloat(pay_usd_bal),
    //           amount_received_usd: parseFloat(pay_php_convert),
    //           balance_usd: parseFloat(pay_bal_php_convert),
    //         },
    //         status: props.booking.status,
    //       })
    //     );
    //   }
    // }

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
              {JSON.stringify(data)}
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
                    <MenuItem value={"DISCOUNT"}>DISCOUNT</MenuItem>
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

export default PaymentAdjtEntrySoa;
