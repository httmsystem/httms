import React, { useState } from "react";
import NumberFormat from "react-number-format";
import moment from "moment";
import PropTypes from "prop-types";
import PaymentAdjtEntrySoa from "./PaymentAdjtEntrySoa";

import {
  Button,
  Box,
  Modal,
  Grid,
  Divider,
  TextField,
  InputAdornment,
  Card,
  CardContent,
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
      prefix=""
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PaymentAddSoaLiq = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 4,
    overflow: "hidden",
    overflowY: "scroll",
  };

  function truncate(num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
  }

  const [add_adjst, set_add_adjst] = useState(false);
  const handle_open_adjst = () => {
    set_add_adjst(true);
  };
  const handle_close_adjst = () => {
    set_add_adjst(false);
  };

  const [draft_pay_detail] = useState(props.booking);

  const [payment, set_payment] = useState({
    receipt: {
      _id: props.receipt._id,
      receipt_no: props.receipt.receipt_no,
    },
    booking: {
      _id: props.booking._id,
      rs_no: props.booking.rs_no,
    },
    amount: 0,
    currency: props.receipt.currency,
    tag: "SOA",
  });

  let onChange = (e) => {
    set_payment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // PHP CURRENCY
  let pay_php =
    parseFloat(draft_pay_detail.received_php) + parseFloat(payment.amount);

  let pay_php_bal =
    parseFloat(
      draft_pay_detail.grand_total_selling.grand_total_selling_in_php
    ) -
    parseFloat(draft_pay_detail.received_php) -
    parseFloat(payment.amount);

  let pay_usd_convert =
    parseFloat(draft_pay_detail.received_usd) +
    parseFloat(payment.amount / parseFloat(props.booking.acr.rate));

  let pay_bal_usd_convert =
    parseFloat(
      draft_pay_detail.grand_total_selling.grand_total_selling_in_usd
    ) -
    parseFloat(draft_pay_detail.received_usd) -
    parseFloat(payment.amount / parseFloat(props.booking.acr.rate));

  // USD CURRENCY
  let pay_usd =
    parseFloat(draft_pay_detail.received_usd) + parseFloat(payment.amount);
  let pay_usd_bal =
    parseFloat(
      draft_pay_detail.grand_total_selling.grand_total_selling_in_usd
    ) -
    parseFloat(draft_pay_detail.received_usd) -
    parseFloat(payment.amount);
  let pay_php_convert =
    parseFloat(draft_pay_detail.received_php) +
    parseFloat(payment.amount) * parseFloat(props.booking.acr.rate);
  let pay_bal_php_convert =
    parseFloat(
      draft_pay_detail.grand_total_selling.grand_total_selling_in_php
    ) -
    parseFloat(draft_pay_detail.received_php) -
    parseFloat(payment.amount) * parseFloat(props.booking.acr.rate);

  const data_liquidation = props.liquidations.filter((type) => {
    return type.no === props.booking.no;
  });

  let passenger_data_set = props.result
    .filter((type) => type.no === props.booking.no)
    .map((e) => {
      return data_liquidation
        .map((ee) => {
          return ee.passenger
            .filter((type) => type.passenger_no === e.passenger_no)
            .map((eee) => {
              return {
                passenger_no: eee.passenger_no,
                name: eee.name,
                received_php: eee.received_php,
                received_usd: eee.received_usd,
                updated_received_php: eee.received_php,
                updated_received_usd: eee.received_usd,
                upd_status: e.status,
                status: e.status,
                selling_price_in_php: e.selling_price_in_php,
                selling_price_in_usd: e.selling_price_in_usd,
                amount: 0,
              };
            })
            .flat();
        })
        .flat();
    })
    .flat();

  const [pass, set_pass] = useState(passenger_data_set);

  let onChange_pass = (e, i) => {
    let new_pass_onChange = [...pass];
    new_pass_onChange[i][e.target.name] = e.target.value;
    if (props.receipt.currency === "₱") {
      if (
        new_pass_onChange[i]["updated_received_php"] >=
        new_pass_onChange[i]["selling_price_in_php"]
      ) {
        new_pass_onChange[i]["upd_status"] = "PAID";
        set_pass(new_pass_onChange);
      } else {
        new_pass_onChange[i]["upd_status"] = "UNPAID";
        set_pass(new_pass_onChange);
      }
    } else if (props.receipt.currency === "$") {
      if (
        new_pass_onChange[i]["updated_received_usd"] >=
        new_pass_onChange[i]["selling_price_in_usd"]
      ) {
        new_pass_onChange[i]["upd_status"] = "PAID";
        set_pass(new_pass_onChange);
      } else {
        new_pass_onChange[i]["upd_status"] = "UNPAID";
        set_pass(new_pass_onChange);
      }
    }
    set_pass(new_pass_onChange);
  };

  const result = pass.reduce(
    (total, currentValue) =>
      (total = parseFloat(total) + parseFloat(currentValue.amount)),
    0
  );

  let data_pass = pass.map((e) => {
    return {
      passenger_no: e.passenger_no,
      name: e.name,
      received_php: e.updated_received_php,
      received_usd: e.updated_received_usd,
      status: e.upd_status,
    };
  });

  const onSubmit = (e) => {
    props.dispatch(
      props.createPayment({
        receipt: {
          _id: props.receipt._id,
          receipt_no: props.receipt.receipt_no,
        },
        booking: {
          _id: data_liquidation[0]._id,
          no: data_liquidation[0].no,
          passenger: data_pass,
          received_php: pay_php,
          received_usd: pay_usd_convert,
        },
        amount: result,
        tag: "PARTIAL",
      })
    );
    if (props.receipt.currency === "₱") {
      if (
        pay_php >= props.booking.grand_total_selling.grand_total_selling_in_php
      ) {
        props.dispatch(
          props.updateLiquidation({
            _id: data_liquidation[0]._id,
            no: data_liquidation[0].no,
            passenger: data_pass,
            received_php: pay_php,
            received_usd: pay_usd_convert,
            status: "PAID",
          })
        );
      } else {
        props.dispatch(
          props.updateLiquidation({
            _id: data_liquidation[0]._id,
            no: data_liquidation[0].no,
            passenger: data_pass,
            received_php: pay_php,
            received_usd: pay_usd_convert,
            status: "UNPAID",
          })
        );
      }
    } else {
      if (
        pay_usd >= props.booking.grand_total_selling.grand_total_selling_in_usd
      ) {
        props.dispatch(
          props.updateLiquidation({
            _id: data_liquidation[0]._id,
            no: data_liquidation[0].no,
            passenger: data_pass,
            received_php: pay_php_convert,
            received_usd: pay_usd,
            status: "PAID",
          })
        );
      } else {
        props.dispatch(
          props.updateLiquidation({
            _id: data_liquidation[0]._id,
            no: data_liquidation[0].no,
            passenger: data_pass,
            received_php: pay_php_convert,
            received_usd: pay_usd,
            status: "UNPAID",
          })
        );
      }
    }
    props.handle_close_liq();
    props.handle_close_soa();
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={4}>
                <div className="title_net">
                  <b>LIQ AMOUNT</b>
                </div>
                <b>
                  <NumberFormat
                    value={parseFloat(props.liq_amount).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={props.receipt.currency + " "}
                  />
                </b>
              </Grid>
              <Grid item xs={4}>
                <div className="title_net">
                  <b>UNLIQ AMOUNT</b>
                </div>
                <b>
                  <NumberFormat
                    value={parseFloat(props.unliq_amount).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={props.receipt.currency + " "}
                  />
                </b>
              </Grid>
              <Grid item xs={16}>
                <Divider
                  sx={{ borderBottomWidth: 1.5, borderColor: "text.primary" }}
                />
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={8}>
                <div className="title_net">
                  <b>SOA No.</b>
                </div>
                <b> {props.booking.no}</b>
              </Grid>
              <Grid item xs={8}>
                <div className="title_net">
                  <b>ACR</b>
                </div>
                <b>
                  {" "}
                  {props.booking.acr.rate +
                    " | " +
                    moment(props.booking.acr.date).format("D-MMM-YYYY")}
                </b>
              </Grid>

              <Grid item xs={5}>
                <div className="title_net">
                  <b>Amount to be Paid</b>
                </div>
                {props.receipt.currency === "$" ? (
                  <>
                    <div>
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.booking.grand_total_selling
                              .grand_total_selling_in_usd
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    </div>
                    <div style={{ display: "none" }}>
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.booking.grand_total_selling
                              .grand_total_selling_in_php
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.booking.grand_total_selling
                              .grand_total_selling_in_php
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    </div>
                    <div style={{ display: "none" }}>
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.booking.grand_total_selling
                              .grand_total_selling_in_usd
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    </div>
                  </>
                )}
              </Grid>
              <Grid item xs={5}>
                <div className="title_net">
                  <b>Amount Received</b>
                </div>
                {props.receipt.currency === "$" ? (
                  <>
                    {" "}
                    <div>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_usd)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    </div>
                    <div style={{ display: "none" }}>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_php_convert)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_php)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    </div>

                    <div style={{ display: "none" }}>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_usd_convert)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    </div>
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <div className="title_net">
                  <b>Balance</b>
                </div>
                {props.receipt.currency === "$" ? (
                  <>
                    <div>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_usd_bal)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    </div>

                    <div style={{ display: "none" }}>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_bal_php_convert)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_php_bal)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    </div>

                    <div style={{ display: "none" }}>
                      <b>
                        <NumberFormat
                          value={parseFloat(pay_bal_usd_convert)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    </div>
                  </>
                )}
              </Grid>

              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <Divider
                  sx={{ borderBottomWidth: 1.5, borderColor: "text.primary" }}
                />
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <div className="title_net">
                  <b>Passenger List</b>
                </div>
              </Grid>
              {/* PASS LIST */}
              <Grid item xs={16}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1} columns={16}>
                      <Grid item xs={16}>
                        {pass.map((e, i) => {
                          return (
                            <>
                              <Grid container spacing={1} columns={16}>
                                <Grid item xs={16}>
                                  <b>{e.name}</b>
                                </Grid>
                                <Grid item xs={3}>
                                  <div className="title_net">
                                    <b>Amount to be Paid</b>
                                  </div>
                                  {props.receipt.currency === "$" ? (
                                    <TextField
                                      fullWidth
                                      sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                          WebkitTextFillColor: "black",
                                        },
                                        backgroundColor: "#ecf0f1",
                                        mt: 0.5,
                                      }}
                                      size="small"
                                      disabled
                                      value={parseFloat(e.selling_price_in_usd)}
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
                                  ) : (
                                    <TextField
                                      sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                          WebkitTextFillColor: "black",
                                        },
                                        backgroundColor: "#ecf0f1",
                                        mt: 0.5,
                                      }}
                                      disabled
                                      fullWidth
                                      onClick={(e) => e.target.select()}
                                      size="small"
                                      value={parseFloat(e.selling_price_in_php)}
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
                                  )}
                                </Grid>
                                <Grid item xs={3}>
                                  <div className="title_net">
                                    <b>Amount Received</b>
                                  </div>
                                  {props.receipt.currency === "$" ? (
                                    <>
                                      <TextField
                                        fullWidth
                                        onClick={(e) => e.target.select()}
                                        size="small"
                                        sx={{
                                          "& .MuiInputBase-input.Mui-disabled":
                                            {
                                              WebkitTextFillColor: "black",
                                            },
                                          backgroundColor: "#ecf0f1",
                                          mt: 0.5,
                                        }}
                                        disabled
                                        name="updated_received_usd"
                                        value={parseFloat(
                                          parseFloat(e.received_usd) +
                                            parseFloat(e.amount)
                                        )}
                                        onChange={(e) => onChange_pass(e, i)}
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

                                      <TextField
                                        disabled
                                        fullWidth
                                        size="small"
                                        sx={{
                                          "& .MuiInputBase-input.Mui-disabled":
                                            {
                                              WebkitTextFillColor: "black",
                                            },
                                          backgroundColor: "#ecf0f1",
                                          mt: 0.5,
                                          display: "none",
                                        }}
                                        name="updated_received_php"
                                        value={
                                          parseFloat(e.received_usd) +
                                          parseFloat(
                                            parseFloat(e.amount) *
                                              parseFloat(props.booking.acr.rate)
                                          )
                                        }
                                        onChange={(e) => onChange_pass(e, i)}
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
                                    </>
                                  ) : (
                                    <>
                                      <TextField
                                        fullWidth
                                        onClick={(e) => e.target.select()}
                                        size="small"
                                        sx={{
                                          "& .MuiInputBase-input.Mui-disabled":
                                            {
                                              WebkitTextFillColor: "black",
                                            },
                                          backgroundColor: "#ecf0f1",
                                          mt: 0.5,
                                        }}
                                        name="updated_received_php"
                                        value={
                                          parseFloat(e.received_php) +
                                          parseFloat(e.amount)
                                        }
                                        onChange={(e) => onChange_pass(e, i)}
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
                                      <TextField
                                        fullWidth
                                        onClick={(e) => e.target.select()}
                                        size="small"
                                        sx={{
                                          "& .MuiInputBase-input.Mui-disabled":
                                            {
                                              WebkitTextFillColor: "black",
                                            },
                                          backgroundColor: "#ecf0f1",
                                          mt: 0.5,
                                          display: "none",
                                        }}
                                        name="updated_received_usd"
                                        value={
                                          parseFloat(e.received_usd) +
                                          parseFloat(
                                            parseFloat(e.amount) /
                                              parseFloat(props.booking.acr.rate)
                                          )
                                        }
                                        onChange={(e) => onChange_pass(e, i)}
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
                                    </>
                                  )}
                                </Grid>
                                <Grid item xs={3}>
                                  <div className="title_net">
                                    <b>Balance</b>
                                  </div>
                                  {props.receipt.currency === "$" ? (
                                    <TextField
                                      fullWidth
                                      onClick={(e) => e.target.select()}
                                      size="small"
                                      sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                          WebkitTextFillColor: "black",
                                        },
                                        backgroundColor: "#ecf0f1",
                                        mt: 0.5,
                                      }}
                                      disabled
                                      value={
                                        parseFloat(e.selling_price_in_usd) -
                                        parseFloat(e.received_usd) -
                                        parseFloat(e.amount)
                                      }
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
                                  ) : (
                                    <TextField
                                      fullWidth
                                      onClick={(e) => e.target.select()}
                                      size="small"
                                      sx={{
                                        "& .MuiInputBase-input.Mui-disabled": {
                                          WebkitTextFillColor: "black",
                                        },
                                        backgroundColor: "#ecf0f1",
                                        mt: 0.5,
                                      }}
                                      disabled
                                      value={
                                        parseFloat(e.selling_price_in_php) -
                                        parseFloat(e.received_php) -
                                        parseFloat(e.amount)
                                      }
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
                                  )}
                                </Grid>
                                {e.status === "UNPAID" ? (
                                  <>
                                    <Grid item xs={3.2}>
                                      <div className="title_net">
                                        <b>Amount Payment</b>
                                      </div>
                                      <div>
                                        <TextField
                                          fullWidth
                                          name="amount"
                                          onClick={(e) => e.target.select()}
                                          size="small"
                                          sx={{
                                            mt: 0.5,
                                          }}
                                          value={e.amount}
                                          onChange={(e) => onChange_pass(e, i)}
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
                                      </div>
                                    </Grid>
                                  </>
                                ) : (
                                  <>
                                    <Grid item xs={3.2}>
                                      <div className="title_net">
                                        <b>Amount Payment</b>
                                      </div>
                                      <div>
                                        <TextField
                                          disabled
                                          fullWidth
                                          name="amount"
                                          onClick={(e) => e.target.select()}
                                          size="small"
                                          sx={{
                                            "& .MuiInputBase-input.Mui-disabled":
                                              {
                                                WebkitTextFillColor: "black",
                                              },
                                            backgroundColor: "#ecf0f1",
                                            mt: 0.5,
                                          }}
                                          value={e.amount}
                                          onChange={(e) => onChange_pass(e, i)}
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
                                      </div>
                                    </Grid>
                                  </>
                                )}

                                <Grid item xs={3.2}   sx={{
                                            mt: 4.5,
                                          }}>
                                  {" "}
                                  {e.status}
                                </Grid>
                                <Grid item xs={16}></Grid>
                                <Grid item xs={16}>
                                  <Divider
                                    sx={{
                                      borderBottomWidth: 1.5,
                                      borderColor: "text.primary",
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={16}></Grid>
                              </Grid>
                            </>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={16}>
                <div className="title_net">
                  <b>Total Amount Payment</b>
                </div>
                <TextField
                  disabled
                  size="small"
                  fullWidth
                  name="amount"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "black",
                    },
                    backgroundColor: "#ecf0f1",
                    mt: 0.5,
                  }}
                  value={result}
                  onChange={onChange}
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

              <Grid item xs={16}></Grid>
            </Grid>
          </>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              {result > props.unliq_amount ? (
                <>
                  <Button
                    disabled
                    sx={{ m: 1 }}
                    variant="contained"
                    color="success"
                    onClick={onSubmit}
                  >
                    Done
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ m: 1 }}
                    variant="contained"
                    color="success"
                    onClick={onSubmit}
                  >
                    Done
                  </Button>
                </>
              )}

              {/* <Button
                sx={{ mr: 1 }}
                variant="contained"
                onClick={handle_open_adjst}
              >
                Add Adjustment to SOA
              </Button> */}

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  props.handle_close_liq();
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
          <PaymentAdjtEntrySoa
            receipt={props.receipt}
            open={add_adjst}
            handle_close_adjst={handle_close_adjst}
            dispatch={props.dispatch}
            createAdjustment={props.createAdjustment}
            booking={props.booking}
            updateRs={props.updateRs}
          ></PaymentAdjtEntrySoa>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentAddSoaLiq;
