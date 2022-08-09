import React, { useState, useEffect } from "react";
// 
import PaymentAddSoa from "./PaymentAddSoa";
import PaymentAdjtEntry from "./PaymentAdjtEntry";
import {
  Button,
  Box,
  Modal,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import NumberFormat from "react-number-format";
import OpenSnackBar from "../../../popups/OpenSnackBar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  getLiquidation,
  updateLiquidation,
  reset,
} from "../../../../features/liquidation/liquidationSlice";
import { getRs } from "../../../../features/rs/rsSlice";
import {
  createPayment,
  getPayment,
} from "../../../../features/payment/paymentSlice";
import {
  createAdjustment,
  getAdjustment,
} from "../../../../features/adjustment/adjustmentSlice";

const PaymentView = (props) => {
  const dispatch = useDispatch();
  const {
    liquidations,
    isSuccessUpdateLiquidations,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.liquidations);
  const { rss } = useSelector((state) => state.rss);
  const { payments } = useSelector((state) => state.payments);
  const { adjustments } = useSelector((state) => state.adjustments);
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");
  const [add_soa, set_add_soa] = useState(false);

  const [tabs_value, set_tabs_value] = React.useState("1");

  const handleChange_tab = (event, newValue) => {
    set_tabs_value(newValue);
  };

  const handle_open_soa = () => {
    set_add_soa(true);
  };
  const handle_close_soa = () => {
    set_add_soa(false);
  };

  const [add_adjst, set_add_adjst] = useState(false);

  const handle_open_adjst = () => {
    set_add_adjst(true);
  };

  const handle_close_adjst = () => {
    set_add_adjst(false);
  };
  const pays = payments
    .filter((type) => type.receipt._id === props.receipt._id)
    .reduce((total, currentValue) => (total = total + currentValue.amount), 0);

  const adjs = adjustments
    .filter((type) => type.receipt._id === props.receipt._id)
    .reduce((total, currentValue) => (total = total + currentValue.amount), 0);

    console.log(adjs)
  const pay_received = props.receipt.pay_details.map((e) => {
    return e;
  });
  const total_received = pay_received.reduce(
    (total, currentValue) =>
      (total =
        total +
        (currentValue.amount_received -
          currentValue.merch_fee -
          currentValue.wtax)),
    0
  );

  let liq_amount = parseFloat(pays + adjs);

  let unliq_amount = parseFloat(props.receipt.total_amount) - parseFloat(pays) - parseFloat(adjs);

  const onSubmit = (e) => {
    if (unliq_amount === parseFloat(0)) {
      props.dispatch(
        props.updateReceipt({
          _id: props.receipt._id,
          date_issued: props.receipt.date_issued,
          receipt_type: props.receipt.receipt_type,
          receipt_no: props.receipt.receipt_no,
          customer: props.receipt.customer,
          currency: props.receipt.currency,
          pay_info: props.receipt.pay_info,
          total_amount: props.receipt.total_amount,
          liq_amount: liq_amount,
          unliq_amount: unliq_amount,
          status: "DONE",
        })
      );
    } else {
      props.dispatch(
        props.updateReceipt({
          _id: props.receipt._id,
          date_issued: props.receipt.date_issued,
          receipt_type: props.receipt.receipt_type,
          receipt_no: props.receipt.receipt_no,
          customer: props.receipt.customer,
          currency: props.receipt.currency,
          pay_info: props.receipt.pay_info,
          total_amount: props.receipt.total_amount,
          liq_amount: liq_amount,
          unliq_amount: unliq_amount,
          status: props.receipt.status,
        })
      );
    }

    props.handle_close_view_payment();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 4,
    overflow: "hidden",
    overflowY: "scroll",
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getPayment());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAdjustment());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getRs());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccessUpdateLiquidations) {
      setOpenSnack(true);
      setMessage("Sucecssfully Liquidated");
      setAlertTitle("Success");
      setSeverity("info");
    }
    dispatch(getLiquidation());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, isSuccessUpdateLiquidations]);

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

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
              <Grid item xs={16}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1} columns={16}>
                      <Grid item xs={4}>
                        <div className="title_net">
                          <b>LIQ AMOUNT</b>
                        </div>
                        <b>
                          <NumberFormat
                            value={parseFloat(liq_amount).toFixed(2)}
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
                            value={parseFloat(unliq_amount).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={props.receipt.currency + " "}
                          />
                        </b>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={16}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid
                      container
                      spacing={1}
                      columns={16}
                      alignItems="center"
                      justifyContent="center"
                      sx={{ textAlign: "center" }}
                    >
                      <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <div>
                          <b>Payment Details</b>
                        </div>
                      </Grid>
                      <Grid item xs={4} sx={{ textAlign: "left" }}>
                        <div>
                          <b>Bank Deposit Details</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5} sx={{ textAlign: "left" }}>
                        <div>
                          <b>Pay Mode</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>Check #</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>Date Check</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>Matur Date</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>Bank Name</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>Amt Recv/Swpe </b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>Merch Fee </b>
                        </div>
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b>W/H TAX </b>
                        </div>
                      </Grid>
                      <Grid item xs={1.3} sx={{ textAlign: "left" }}>
                        <div>
                          <b>Bank</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.3}>
                        <div>
                          <b>Amount</b>
                        </div>
                      </Grid>
                      <Grid item xs={1.3}>
                        <div>
                          <b>Date Deposit</b>
                        </div>
                      </Grid>

                      {props.receipt?.pay_details.map((e) => {
                        return (
                          <>
                            <Grid item xs={1.5} sx={{ textAlign: "left" }}>
                              <div>{e?.pay_mode}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                              <div>{e?.check_no} </div>
                            </Grid>
                            <Grid item xs={1.5}>
                              <div>{e?.date_check}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                              <div>{e?.maturity_date} </div>
                            </Grid>
                            <Grid item xs={1.5}>
                              <div>{e?.bank_name}</div>
                            </Grid>
                            <Grid item xs={1.5}>
                              <NumberFormat
                                value={parseFloat(e?.amount_received).toFixed(
                                  2
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            <Grid item xs={1.5}>
                              <NumberFormat
                                value={parseFloat(e?.merch_fee).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>

                            <Grid item xs={1.5}>
                              <NumberFormat
                                value={parseFloat(e?.wtax).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            {/* Bank Deposit Detail */}
                            <Grid item xs={1.3} sx={{ textAlign: "left" }}>
                              <div>
                                {e?.bank?.bank_name + " - " + e?.bank?.acct_no}
                              </div>
                            </Grid>
                            <Grid item xs={1.3}>
                              <NumberFormat
                                value={parseFloat(e?.bank_amt).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            <Grid item xs={1.3}>
                              <div>
                                {e?.date_of_deposit === null ? (
                                  <></>
                                ) : (
                                  <>
                                    {moment(e?.date_of_deposit).format("MM-D")}
                                  </>
                                )}
                              </div>
                            </Grid>
                          </>
                        );
                      })}

                      <Grid item xs={16}></Grid>
                      <Grid item xs={16} sx={{ textAlign: "left" }}>
                        <div>
                          <b>Receipt Details</b>
                        </div>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: "left" }}>
                        <div>
                          <b>Recpt Type</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>Recpt #</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>Date Issued</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>Amt Net</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>W/Hold TAX</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>VAT Deduct</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>VAT Income</b>
                        </div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b>Amount to LIQ</b>
                        </div>
                      </Grid>
                      {props.receipt?.receipt_details.map((e) => {
                        return (
                          <>
                            <Grid item xs={2} sx={{ textAlign: "left" }}>
                              <div>{e?.receipt_type}</div>
                            </Grid>
                            <Grid item xs={2}>
                              <div>{e?.receipt_no} </div>
                            </Grid>
                            <Grid item xs={2}>
                              {e?.date_issued === null ? (
                                <></>
                              ) : (
                                <>{moment(e?.date_issued).format("MM-D")}</>
                              )}
                            </Grid>
                            <Grid item xs={2}>
                              <NumberFormat
                                value={parseFloat(e?.amt_net).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <NumberFormat
                                value={parseFloat(e?.bir).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <NumberFormat
                                value={parseFloat(e?.vat_ded).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <NumberFormat
                                value={parseFloat(e?.vat_income).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <NumberFormat
                                value={parseFloat(e?.amount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={props.receipt.currency + " "}
                              />
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1} columns={16}>
                      <Grid item xs={7} sx={{ fontSize: 20 }}>
                        <b>SOA Liquidated</b>
                      </Grid>
                      <Grid item xs={9} sx={{ fontSize: 20 }}>
                        <b>Breakdown</b>
                      </Grid>
                      <Grid item xs={16}></Grid>
                      {/* DETAILS SOA & ADJUSTMENT */}
                      <Grid item xs={7}>
                        <Grid container spacing={1} columns={7}>
                          <Grid item xs={2}>
                            <b>Soa No.</b>
                          </Grid>
                          <Grid item xs={2}>
                            <b>Amount</b>
                          </Grid>
                          <Grid item xs={2}>
                            <b>Type of Transaction</b>
                          </Grid>
                          {payments
                            .filter(
                              (type) => type.receipt._id === props.receipt._id
                            )
                            .map((e) => {
                              return (
                                <>
                                  <Grid item xs={2}>
                                    <div>{e?.booking?.no}</div>
                                  </Grid>

                                  <Grid item xs={2}>
                                    <div>
                                      <NumberFormat
                                        value={parseFloat(e?.amount).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={props.receipt.currency + " "}
                                      />
                                    </div>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <div>{e?.tag}</div>
                                  </Grid>
                                </>
                              );
                            })}
                          <Grid item xs={16}></Grid>
                          {adjustments
                            .filter(
                              (type) => type.receipt._id === props.receipt._id
                            )
                            .map((e) => {
                              return (
                                <>
                                  <Grid item xs={16} sx={{ fontSize: 20 }}>
                                    <b>Adjustment</b>
                                  </Grid>
                                  <Grid item xs={16}></Grid>

                                  <Grid item xs={2}>
                                    <b>Type of Adjust</b>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <b>Amount</b>
                                  </Grid>
                                  <Grid item xs={12}></Grid>
                                  <Grid item xs={2}>
                                    <div>{e.adjustment_type}</div>
                                  </Grid>
                                  <Grid item xs={2}>
                                    <div>
                                      {" "}
                                      <NumberFormat
                                        value={parseFloat(e.amount).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={props.receipt.currency + " "}
                                      />
                                    </div>
                                  </Grid>
                                </>
                              );
                            })}
                        </Grid>
                      </Grid>
                      {/* BREAKDOWN */}
                      <Grid item xs={9}>
                        <Grid container spacing={1} columns={9}>
                          <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={tabs_value}>
                              <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                              >
                                <TabList
                                  onChange={handleChange_tab}
                                  aria-label="lab API tabs example"
                                >
                                  <Tab label="PAYMENT" value="1" />
                                  <Tab label="RECEIPT" value="2" />
                                </TabList>
                              </Box>
                              <TabPanel value="1">
                                <Grid container columns={9}>
                                  <Grid item xs={4}>
                                    Payment
                                  </Grid>
                                  <Grid item xs={5}>
                                    Amount Received/Swipe
                                  </Grid>
                                </Grid>
                                {props.receipt?.pay_details.map((e) => {
                                  return (
                                    <>
                                      <Grid item xs={9}>
                                        <Grid container columns={9}>
                                          {e?.pay_mode === "CASH" ||
                                          e.pay_mode === "SCCCF" ||
                                          e.pay_mode === "CHECK" ||
                                          e.pay_mode === "E-BANKING" ? (
                                            <>
                                              <Grid item xs={4}>
                                                {e?.pay_mode}
                                              </Grid>
                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.amount_received
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                            </>
                                          ) : (
                                            <></>
                                          )}

                                          {e?.pay_mode === "CC CHK" && (
                                            <>
                                              <Grid item xs={4}>
                                                {e?.pay_mode}
                                              </Grid>

                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.amount_received
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={0.5}></Grid>
                                              <Grid item xs={4}>
                                                LESS MERCH FEE:
                                              </Grid>
                                              <Grid item xs={4.5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.merch_fee
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency +
                                                    " -"
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={0.5}></Grid>
                                              <Grid item xs={4}>
                                                LESS W/H TAX:
                                              </Grid>
                                              <Grid item xs={4.5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.wtax
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency +
                                                    " -"
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={4}>
                                                Total Amt Received:
                                              </Grid>
                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.bank_amt
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                            </>
                                          )}
                                          {e?.pay_mode === "CC" ||
                                          e?.pay_mode === "CHKOUT CC" ? (
                                            <>
                                              <Grid item xs={4}>
                                                {e?.pay_mode}
                                              </Grid>

                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.amount_received
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={0.5}></Grid>
                                              <Grid item xs={4}>
                                                LESS MERCH FEE:
                                              </Grid>
                                              <Grid item xs={4.5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.merch_fee
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency +
                                                    " -"
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={4}>
                                                Total Amt Received:
                                              </Grid>
                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.bank_amt
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </>
                                  );
                                })}
                                <Grid item xs={9}>
                                  <Grid container columns={9}>
                                    <Grid item xs={4}>
                                      <b>Grand Total Amt Received:</b>
                                    </Grid>
                                    <Grid item xs={5}>
                                      <b>
                                        <NumberFormat
                                          value={parseFloat(
                                            total_received
                                          ).toFixed(2)}
                                          displayType={"text"}
                                          thousandSeparator={true}
                                          prefix={props.receipt.currency + " "}
                                        />
                                      </b>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </TabPanel>
                              <TabPanel value="2">
                                <Grid container columns={9}>
                                  <Grid item xs={4}>
                                    Receipt
                                  </Grid>
                                  <Grid item xs={5}>
                                    Amount
                                  </Grid>
                                </Grid>
                                {props.receipt?.receipt_details.map((e) => {
                                  return (
                                    <>
                                      <Grid item xs={9}>
                                        <Grid container columns={9}>
                                          {e?.receipt_type === "AR" ||
                                          e?.receipt_type === "PR" ? (
                                            <>
                                              <Grid item xs={4}>
                                                {e?.receipt_type}
                                              </Grid>
                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.amt_net
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                            </>
                                          ) : (
                                            <></>
                                          )}

                                          {e?.receipt_type === "OR" ? (
                                            <>
                                              <Grid item xs={4}>
                                                {e?.receipt_type}
                                              </Grid>
                                              <Grid item xs={5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.amount
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={0.5}></Grid>
                                              <Grid item xs={4}>
                                                LESS W/H TAX:
                                              </Grid>
                                              <Grid item xs={4.5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.bir
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency +
                                                    " -"
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={0.5}></Grid>
                                              <Grid item xs={4}>
                                                LESS VAT DEDUCT:
                                              </Grid>
                                              <Grid item xs={4.5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.vat_ded
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency +
                                                    " -"
                                                  }
                                                />
                                              </Grid>
                                              <Grid item xs={0.5}></Grid>
                                              <Grid item xs={4}>
                                                VAT INCOME:
                                              </Grid>
                                              <Grid item xs={4.5}>
                                                <NumberFormat
                                                  value={parseFloat(
                                                    e?.vat_income
                                                  ).toFixed(2)}
                                                  displayType={"text"}
                                                  thousandSeparator={true}
                                                  prefix={
                                                    props.receipt.currency + " "
                                                  }
                                                />
                                              </Grid>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </Grid>
                                        <Grid item xs={9}></Grid>
                                      </Grid>
                                    </>
                                  );
                                })}
                                <Grid container columns={9}>
                                  <Grid item xs={4}>
                                    <b>Amt SOA to Liquidate:</b>
                                  </Grid>
                                  <Grid item xs={5}>
                                    <b>
                                      <NumberFormat
                                        value={parseFloat(
                                          props.receipt.total_amount
                                        ).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={props.receipt.currency + " "}
                                      />
                                    </b>
                                  </Grid>
                                </Grid>
                              </TabPanel>
                            </TabContext>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={16}></Grid>

              <Box sx={{ flex: "1 1 auto" }}>
                {unliq_amount > 0 ? (<> <Button
                  sx={{ m: 1 }}
                  onClick={handle_open_soa}
                  variant="contained"
                >
                  Liquidate SOA
                </Button>
                <Button onClick={handle_open_adjst} variant="contained">
                  Add Adjustment to Payment
                </Button></>):(<>
                  <Button
                  disabled
                  sx={{ m: 1 }}
                  onClick={handle_open_soa}
                  variant="contained"
                >
                  Liquidate SOA
                </Button>
                <Button disabled onClick={handle_open_adjst} variant="contained">
                  Add Adjustment to Payment
                </Button>
                </>)}
               
              </Box>
            </Grid>
          </>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  onSubmit();
                }}
              >
                Done
              </Button>
            </Box>
          </Box>
          {add_soa && (
            <PaymentAddSoa
            liq_amount={liq_amount}
            unliq_amount={unliq_amount}
              receipt={props.receipt}
              open={add_soa}
              handle_close_soa={handle_close_soa}
              open_adjst={add_adjst}
              handle_open_adjst={handle_open_adjst}
              handle_close_adjst={handle_close_adjst}
              createPayment={createPayment}
              createAdjustment={createAdjustment}
              adjustments={adjustments}
              liquidations={liquidations}
              updateLiquidation={updateLiquidation}
              rss={rss}
              dispatch={dispatch}
            ></PaymentAddSoa>
          )}
          {add_adjst && (
            <PaymentAdjtEntry
              receipt={props.receipt}
              open={add_adjst}
              handle_close_adjst={handle_close_adjst}
              dispatch={dispatch}
              createAdjustment={createAdjustment}
              updateReceipt={props.updateReceipt}
            ></PaymentAdjtEntry>
          )}
          {openSnack && (
            <OpenSnackBar
              severity={severity}
              alertTitle={alertTitle}
              open={openSnack}
              message={messageSnack}
              handleOpenSnack={() => {
                setOpenSnack(false);
              }}
            ></OpenSnackBar>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentView;
