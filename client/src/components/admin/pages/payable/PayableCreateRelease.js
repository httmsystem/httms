import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Modal,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { Delete } from "@mui/icons-material";
import PayableReleaseModalPrint from "./PayableReleaseModalPrint";

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

const PayableCreateRelease = (props) => {
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
  const [open_modal, set_open_modal] = useState(false);

  const handleOpenRD = () => {
    set_open_modal(true);
  };

  const handleCloseRD = () => {
    set_open_modal(false);
  };

  // NUMBERING SYSTEM FUNCTION
  const get_releases = [...props.releases];
  const releases_length = get_releases.length + 1;
  const year = new Date().getFullYear();
  // NUMBERING INVOICE NO.
  const no_inv_bill = "RLSE" + year + "0" + releases_length;

  const [part, set_part] = useState("");
  const [release_details, set_release_details] = useState([
    {
      pay_mode: "",
      bank_name: "",
      acct_number: "",
      check_no: "",
      type: "",
      status: "",
      due_date: null,
      amount: 0,
    },
  ]);

  let add_release = () => {
    let new_pay_info = [...release_details];
    new_pay_info.push({
      pay_mode: "",
      bank_name: "",
      acct_number: "",
      check_no: "",
      type: "",
      status: "",
      due_date: null,
      amount: 0,
    });
    set_release_details(new_pay_info);
  };
  let set_release_onChange = (e, i) => {
    let new_set_release_onChange = [...release_details];
    new_set_release_onChange[i][e.target.name] = e.target.value;
    set_release_details(new_set_release_onChange);
  };
  // REMOVE
  let remove_release = (i) => {
    let new_remove_pay_info_onChange = [...release_details];
    new_remove_pay_info_onChange.splice(i, 1);
    set_release_details(new_remove_pay_info_onChange);
  };

  const total_amount = [...release_details].reduce(
    (total, currentValue) =>
      (total = parseFloat(total) + parseFloat(currentValue.amount)),
    0
  );

  const data = {
    no: no_inv_bill,
    invoice_no: props.invoice._id,
    particular: part,
    release_details: release_details,
    total_amount: total_amount,
  };

  const onSubmit = () => {
    handleOpenRD();
    props.dispatch(
      props.updateInvoice({
        _id: props.invoice._id,
        no: props.invoice.no,
        invoice_no: props.invoice.invoice_no,
        desc: props.invoice.desc,
        payment_type: props.invoice.payment_type,
        currency: props.invoice.currency,
        supplier_account: props.invoice.supplier_account,
        payee: props.invoice.payee,
        date_invoice: props.invoice.date_invoice,
        term: props.invoice.term,
        remark: props.invoice.remark,
        amount: props.invoice.amount,
        payable_list: props.invoice.payable_list,
        status: "RELEASE",
      })
    );
    props.dispatch(props.createRelease(data));
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
              <Grid item xs={16}>
                <b>Payment Details</b>
              </Grid>
              <Grid item xs={16}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1} columns={16}>
                      <Grid item xs={3}>
                        <div className="title_net">
                          <b>Invoice No</b>
                        </div>
                        <b>{props.invoice.invoice_no}</b>
                      </Grid>

                      <Grid item xs={5}>
                        <div className="title_net">
                          <b>Description</b>
                        </div>
                        <b>
                          {props.invoice.desc === "" ? (
                            <>{"-"}</>
                          ) : (
                            <>{props.invoice.desc}</>
                          )}
                        </b>
                      </Grid>

                      <Grid item xs={5}>
                        <div className="title_net">
                          <b>Payee</b>
                        </div>
                        <b>{props.invoice.payee}</b>
                      </Grid>

                      <Grid item xs={3}>
                        <div className="title_net">
                          <b>Amount</b>
                        </div>
                        <b>
                          <NumberFormat
                            value={parseFloat(props.invoice.amount).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={props.invoice.currency + " "}
                          />
                        </b>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <TextField
                  id="outlined-multiline-static"
                  label="Particular"
                  multiline
                  rows={4}
                  fullWidth
                  value={part}
                  onChange={(e) => set_part(e.target.value)}
                />
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <b>Release Details</b>
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => add_release()}
                  margin="dense"
                >
                  ADD
                </Button>
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <Grid container spacing={1} columns={16}>
                  {release_details.map((e, i) => (
                    <>
                      <Grid item xs={16}></Grid>
                      <Grid item xs={0.5}>
                        <IconButton
                          color="error"
                          aria-label="delete"
                          onClick={() => remove_release(i)}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>

                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel>Payment Mode</InputLabel>
                          <Select
                            label="Payment Mode"
                            value={e.pay_mode}
                            name={"pay_mode"}
                            onChange={(e) => set_release_onChange(e, i)}
                          >
                            <MenuItem value={"CASH"}>CASH</MenuItem>
                            <MenuItem value={"CHECK"}>CHECK</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {e.pay_mode === "CHECK" && (
                        <>
                          <Grid item xs={4}>
                            <FormControl fullWidth>
                              <InputLabel>Charge To</InputLabel>
                              <Select
                                label="Charge To"
                                value={e.acct_number}
                                name={"acct_number"}
                                onChange={(e) => set_release_onChange(e, i)}
                              >
                                <MenuItem value={"BPI PHP 000001    "}>
                                  BPI PHP 000001
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={2.5}>
                            <TextField
                              name="check_no"
                              label="Check No."
                              value={e.check_no}
                              onChange={(e) => set_release_onChange(e, i)}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={1.5}>
                            <FormControl fullWidth>
                              <InputLabel>Type</InputLabel>
                              <Select
                                label="Type"
                                value={e.type}
                                name={"type"}
                                onChange={(e) => set_release_onChange(e, i)}
                              >
                                <MenuItem value={"CDC"}>CDC</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={1.5}>
                            <FormControl fullWidth>
                              <InputLabel>Status</InputLabel>
                              <Select
                                label="Status"
                                value={e.status}
                                name={"status"}
                                onChange={(e) => set_release_onChange(e, i)}
                              >
                                <MenuItem value={"U"}>U</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={1.5}>
                            <LocalizationProvider
                              dateAdapter={DateAdapter}
                              format="DD-MM-YYYY"
                            >
                              <DatePicker
                                fullWidth
                                type="date"
                                label="Due Date"
                                openTo="day"
                                value={e.due_date}
                                onChange={(value) => {
                                  let new_due_date = [...release_details];
                                  new_due_date[i]["due_date"] = value;
                                  set_release_details(new_due_date);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="date"
                                    fullWidth
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </>
                      )}

                      <Grid item xs={2.5}>
                        <TextField
                          fullWidth
                          name="amount"
                          label="Amount"
                          value={parseFloat(e.amount)}
                          onChange={(e) => set_release_onChange(e, i)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {props.invoice.currency}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={16}>
                <Divider />
              </Grid>
              <Grid item xs={16}></Grid>
              <Grid item xs={10}>
                <b>Total Amount</b>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Total Amount"
                  disabled
                  value={parseFloat(total_amount).toFixed(2)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {props.invoice.currency}
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
                sx={{ mr: 1 }}
                variant="contained"
                color="error"
                onClick={props.handle_close_release}
              >
                Cancel
              </Button>
              {total_amount === props.invoice.amount ? (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      
                      onSubmit();
                    }}
                  >
                    Release
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    disabled
                    variant="contained"
                    color="success"
                    onClick={onSubmit}
                  >
                    Release
                  </Button>
                </>
              )}
            </Box>
          </Box>
          {open_modal && (
            <PayableReleaseModalPrint
              open={open_modal}
              close={handleCloseRD}
            ></PayableReleaseModalPrint>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PayableCreateRelease;
