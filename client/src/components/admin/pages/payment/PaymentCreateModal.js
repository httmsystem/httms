import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Button,
  TextField,
  Autocomplete,
  InputAdornment,
  Modal,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
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

const PaymentCreateModal = (props) => {
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
    fontSize: 13.5,
    flexGrow: 1,
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [receipt, set_receipt] = useState({
    customer_type: "",
    customer: null,
    currency: "",
    remarks: "",
  });

  const onChange = (e) => {
    set_receipt((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [pay_info, set_pay_info] = useState([
    {
      pay_mode: "",
      bank_name: "",
      check_no: "",
      date_check: null,
      maturity_date: null,
      amount_received: 0,
      merch_fee: 0,
      wtax: 0,
      bank: { _id: "", bank_name: "", acct_no: "" },
      bank_amt: 0,
      date_of_deposit: null,
    },
  ]);

  let add_pay_info = () => {
    let new_pay_info = [...pay_info];
    new_pay_info.push({
      pay_mode: "",
      bank_name: "",
      check_no: "",
      date_check: null,
      maturity_date: null,
      amount_received: 0,
      merch_fee: 0,
      wtax: 0,
      bank: { _id: "", bank_name: "", acct_no: "" },
      bank_amt: 0,
      date_of_deposit: null,
    });
    set_pay_info(new_pay_info);
  };

  let set_pay_info_onChange = (e, i) => {
    let new_set_pay_info_onChange = [...pay_info];
    new_set_pay_info_onChange[i][e.target.name] = e.target.value;
    set_pay_info(new_set_pay_info_onChange);
  };

  // REMOVE
  let remove_pay_info = (i) => {
    let new_remove_pay_info_onChange = [...pay_info];
    new_remove_pay_info_onChange.splice(i, 1);
    set_pay_info(new_remove_pay_info_onChange);
  };

  const [receipts, set_receipts] = useState([
    {
      receipt_type: "",
      receipt_no: "",
      date_issued: new Date(),
      amount: 0,
      bir: 0,
      vat_ded: 0,
      vat_income: 0,
      amt_net: 0,
    },
  ]);

  let add_receipt_info = () => {
    let new_recpt_info = [...receipts];
    new_recpt_info.push({
      receipt_type: "",
      receipt_no: "",
      date_issued: new Date(),
      amount: 0,
      bir: 0,
      vat_ded: 0,
      vat_income: 0,
      amt_net: 0,
    });
    set_receipts(new_recpt_info);
  };

  let set_receipt_info_onChange = (e, i) => {
    let new_set_recpt_info_onChange = [...receipts];
    new_set_recpt_info_onChange[i][e.target.name] = e.target.value;
    set_receipts(new_set_recpt_info_onChange);
  };

  // REMOVE
  let remove_receipt_info = (i) => {
    let new_remove_recpt_info_onChange = [...receipts];
    new_remove_recpt_info_onChange.splice(i, 1);
    set_receipts(new_remove_recpt_info_onChange);
  };

  var total_remit_receipt = [...receipts].reduce(
    (total, currentValue) =>
      (total = parseFloat(total) + parseFloat(currentValue.amount)),
    0
  );

  const data = {
    currency: receipt.currency,
    customer_type: receipt.customer_type,
    customer: receipt.customer,
    pay_details: pay_info,
    receipt_details: receipts,
    total_amount: parseFloat(total_remit_receipt),
    liq_amount: 0,
    unliq_amount: parseFloat(total_remit_receipt),
    remarks: receipt.remarks,
    status: "UNDONE",
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.dispatch(props.createReceipt(data));
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Payment
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={5}>
                <div>
                  <b> Currency:</b>
                </div>
                <Select
                  sx={{ mt: 0.5 }}
                  fullWidth
                  size="small"
                  id="currency"
                  name="currency"
                  value={receipt.currency}
                  onChange={onChange}
                >
                  <MenuItem size="small" value={"₱"}>
                    PHP
                  </MenuItem>
                  <MenuItem size="small" value={"$"}>
                    USD
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={5}>
                <b>Customer Type:</b>
                <Select
                  fullWidth
                  sx={{ mt: 0.5 }}
                  size="small"
                  required
                  name="customer_type"
                  value={receipt.customer_type}
                  onChange={onChange}
                >
                  <MenuItem value="WALK IN">WALK-IN</MenuItem>
                  <MenuItem value="SUB-AGENT">SUB-AGENT</MenuItem>
                  <MenuItem value="CORPORATE">CORPORATE</MenuItem>
                </Select>
              </Grid>
              {receipt.customer_type === "SUB-AGENT" && (
                <Grid item xs={6}>
                  <b>Customer Account:</b>
                  <Autocomplete
                    fullWidth
                    sx={{ mt: 0.5 }}
                    size="small"
                    options={props.customer}
                    getOptionLabel={(option) => option.acct_name}
                    value={receipt.customer}
                    onChange={(e, new_acct_data) => {
                      set_receipt({
                        ...receipt,
                        customer: new_acct_data,
                      });
                    }}
                    disablePortal
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              )}

              <Grid item xs={16}></Grid>
              <Grid item xs={9.5} sx={{ fontSize: 20 }}>
                <b>Payment Details</b>
              </Grid>
              <Grid item xs={6.5} sx={{ fontSize: 20 }}>
                <b>Deposit Details</b>
              </Grid>

              <Grid item xs={16}>
                {pay_info.map((e, i) => (
                  <div key={i}>
                    <Grid container spacing={2} columns={16}>
                      <Grid item xs={9.5}>
                        <Grid container spacing={2} columns={9.5}>
                          <Grid item xs={1.5}>
                            <b>Payment Mode</b>
                            <Select
                              fullWidth
                              sx={{ mt: 0.5 }}
                              size="small"
                              name="pay_mode"
                              value={e.pay_mode}
                              onChange={(e) => set_pay_info_onChange(e, i)}
                            >
                              <MenuItem value={"CASH"}>CASH</MenuItem>
                              <MenuItem value={"CHECK"}>CHECK</MenuItem>
                              <MenuItem value={"E-BANKING"}>E-BANKING</MenuItem>
                              <MenuItem value={"SCCCF"}>SCCCF</MenuItem>
                              <MenuItem value={"CC"}>
                                CC
                              </MenuItem>
                              <MenuItem value={"CC CHK"}>CC CHK</MenuItem>
                              <MenuItem value={"CHKOUT CC"}>
                                CHKOUT CC
                              </MenuItem>
                            </Select>
                          </Grid>
                          {e.pay_mode === "CHECK" && (
                            <>
                              <Grid item xs={1.5}>
                                <b>Check No.</b>
                                <TextField
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="check_no"
                                  value={e.check_no}
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <b> Date of Check</b>
                                <LocalizationProvider
                                  dateAdapter={DateAdapter}
                                  format="DD-MM-YYYY"
                                >
                                  <DatePicker
                                    type="date"
                                    openTo="day"
                                    value={e.date_check}
                                    onChange={(value) => {
                                      let new_set_pay_info_onChange = [
                                        ...pay_info,
                                      ];
                                      new_set_pay_info_onChange[i][
                                        "date_check"
                                      ] = value;
                                      set_pay_info(new_set_pay_info_onChange);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        name="date"
                                        fullWidth
                                        sx={{ mt: 0.5 }}
                                        size="small"
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </Grid>
                              <Grid item xs={2}>
                                <b> Maturity Date</b>
                                <LocalizationProvider
                                  dateAdapter={DateAdapter}
                                  format="DD-MM-YYYY"
                                >
                                  <DatePicker
                                    type="date"
                                    openTo="day"
                                    value={e.maturity_date}
                                    onChange={(value) => {
                                      let new_set_pay_info_onChange = [
                                        ...pay_info,
                                      ];
                                      new_set_pay_info_onChange[i][
                                        "maturity_date"
                                      ] = value;
                                      set_pay_info(new_set_pay_info_onChange);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        name="date"
                                        fullWidth
                                        sx={{ mt: 0.5 }}
                                        size="small"
                                      />
                                    )}
                                  />
                                </LocalizationProvider>
                              </Grid>
                            </>
                          )}

                          {e.pay_mode === "E-BANKING" && (
                            <>
                              <Grid item xs={1.5}>
                                <b>Bank Name</b>
                                <TextField
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="bank_name"
                                  value={e.bank_name}
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                />
                              </Grid>
                            </>
                          )}

                          {e.pay_mode === "CC CHK" && (
                            <>
                              <Grid item xs={1.5}>
                                <b>Check No.</b>
                                <TextField
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="check_no"
                                  value={e.check_no}
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                />
                              </Grid>
                            </>
                          )}

                          {e.pay_mode === "CC" ||
                          e.pay_mode === "CHKOUT CC" ||
                          e.pay_mode === "SCCCF" ||
                          e.pay_mode === "CC CHK" ? (
                            <Grid item xs={2}>
                              <b> Amount Swipe</b>
                              <TextField
                                onClick={(e) => e.target.select()}
                                fullWidth
                                sx={{ mt: 0.5 }}
                                size="small"
                                name="amount_received"
                                value={parseFloat(e.amount_received)}
                                onChange={(e) => set_pay_info_onChange(e, i)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {receipt.currency}
                                    </InputAdornment>
                                  ),
                                  inputComponent: NumberFormatCustom,
                                }}
                                variant="outlined"
                              />
                            </Grid>
                          ) : (
                            <Grid item xs={2}>
                              <b> Amount Received</b>
                              <TextField
                                onClick={(e) => e.target.select()}
                                fullWidth
                                sx={{ mt: 0.5 }}
                                size="small"
                                name="amount_received"
                                value={parseFloat(e.amount_received)}
                                onChange={(e) => set_pay_info_onChange(e, i)}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      {receipt.currency}
                                    </InputAdornment>
                                  ),
                                  inputComponent: NumberFormatCustom,
                                }}
                                variant="outlined"
                              />
                            </Grid>
                          )}

                          {e.pay_mode === "CC" ||
                          e.pay_mode === "CHKOUT CC" ||
                          e.pay_mode === "CC CHK" ? (
                            <>
                              <Grid item xs={2}>
                                <b>Merchant Fee</b>
                                <TextField
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="merch_fee"
                                  value={e.merch_fee}
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {receipt.currency}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          ) : (
                            <></>
                          )}

                          {e.pay_mode === "CC CHK" && (
                            <>
                              <Grid item xs={1.5}>
                                <b>W/hold TAX</b>
                                <TextField
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="wtax"
                                  value={e.wtax}
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                />
                              </Grid>
                            </>
                          )}

                          <Grid item xs={0.5}></Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={6}>
                        <Grid container spacing={2} columns={6}>
                          <Grid item xs={2}>
                            <b>Bank</b>

                            <Autocomplete
                              fullWidth
                              sx={{ mt: 0.5 }}
                              size="small"
                              options={props.banks}
                              // isOptionEqualToValue={(option, value) => option._id === value._id}
                              getOptionLabel={(option) =>
                                option.bank_name + " - " + option.acct_no
                              }
                              value={e.bank}
                              onChange={(e, new_acct_data) => {
                                let new_set_pay_info_onChange = [...pay_info];
                                new_set_pay_info_onChange[i]["bank"] = {
                                  _id: new_acct_data._id,
                                  bank_name: new_acct_data.bank_name,
                                  acct_no: new_acct_data.acct_no,
                                };
                                set_pay_info(new_set_pay_info_onChange);
                              }}
                              disablePortal
                              disableClearable
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                          </Grid>

                          {e.pay_mode === "CC" ||
                          e.pay_mode === "CHKOUT CC" ||
                          e.pay_mode === "CC CHK" ? (
                            <>
                              <Grid item xs={2}>
                                <b> Amount</b>
                                <TextField
                                  disabled
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="bank_amt"
                                  value={
                                    parseFloat(e.amount_received) -
                                    parseFloat(e.merch_fee) -
                                    parseFloat(e.wtax)
                                  }
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {receipt.currency}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={2}>
                                <b> Amount</b>
                                <TextField
                                  onClick={(e) => e.target.select()}
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="bank_amt"
                                  value={e.bank_amt}
                                  onChange={(e) => set_pay_info_onChange(e, i)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {receipt.currency}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          )}

                          <Grid item xs={2}>
                            <b>Date of Deposit</b>

                            <LocalizationProvider
                              dateAdapter={DateAdapter}
                              format="DD-MM-YYYY"
                            >
                              <DatePicker
                                fullWidth
                                type="date"
                                openTo="day"
                                value={e.date_of_deposit}
                                onChange={(value) => {
                                  let new_set_pay_info_onChange = [...pay_info];
                                  new_set_pay_info_onChange[i][
                                    "date_of_deposit"
                                  ] = value;
                                  set_pay_info(new_set_pay_info_onChange);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="date"
                                    fullWidth
                                    sx={{ mt: 0.5 }}
                                    size="small"
                                  />
                                )}
                              />
                            </LocalizationProvider>
                          </Grid>
                        </Grid>
                      </Grid>

                      {i ? (
                        <Grid item xs={0.5}>
                          <IconButton
                            sx={{ mt: 2.5 }}
                            color="error"
                            aria-label="delete"
                            onClick={() => remove_pay_info(i)}
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      ) : null}
                    </Grid>
                  </div>
                ))}
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => add_pay_info()}
                >
                  ADD MORE PAYMENT
                </Button>
              </Grid>
              <Grid item xs={16} sx={{ fontSize: 20 }}>
                <b>Receipt Details</b>
              </Grid>
              <Grid item xs={16}>
                {receipts.map((e, i) => (
                  <div key={i}>
                    <Grid container spacing={2} columns={16}>
                      <Grid item xs={2}>
                        <b>Receipt Type</b>
                        <Select
                          fullWidth
                          sx={{ mt: 0.5 }}
                          size="small"
                          name="receipt_type"
                          value={e.receipt_type}
                          onChange={(e) => set_receipt_info_onChange(e, i)}
                        >
                          <MenuItem value={"OR"}>OR</MenuItem>
                          <MenuItem value={"AR"}>AR</MenuItem>
                          <MenuItem value={"PR"}>PR</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={2}>
                        <b>Receipt No.</b>
                        <TextField
                          onClick={(e) => e.target.select()}
                          fullWidth
                          sx={{ mt: 0.5 }}
                          size="small"
                          name="receipt_no"
                          value={e.receipt_no}
                          onChange={(e) => set_receipt_info_onChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <b>Date Issued</b>
                        <LocalizationProvider
                          dateAdapter={DateAdapter}
                          format="DD-MM-YYYY"
                        >
                          <DatePicker
                            type="date"
                            openTo="day"
                            value={e.date_issued}
                            onChange={(value) => {
                              let new_set_receipt_info_onChange = [...receipts];
                              new_set_receipt_info_onChange[i]["date_issued"] =
                                value;
                              set_receipts(new_set_receipt_info_onChange);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="date"
                                fullWidth
                                sx={{ mt: 0.5 }}
                                size="small"
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={2}>
                        <b> Amount to liquidate</b>
                        <TextField
                          fullWidth
                          onClick={(e) => e.target.select()}
                          sx={{ mt: 0.5 }}
                          size="small"
                          name="amount"
                          value={e.amount}
                          onChange={(e) => set_receipt_info_onChange(e, i)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {receipt.currency}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </Grid>

                      {e.receipt_type === "OR" && (
                        <>
                          <Grid item xs={2}>
                            <b> W/Hold TAX</b>
                            <TextField
                              onClick={(e) => e.target.select()}
                              fullWidth
                              sx={{ mt: 0.5 }}
                              size="small"
                              name="bir"
                              value={e.bir}
                              onChange={(e) => set_receipt_info_onChange(e, i)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {receipt.currency}
                                  </InputAdornment>
                                ),
                                inputComponent: NumberFormatCustom,
                              }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <b> VAT Deduct </b>
                            <TextField
                              onClick={(e) => e.target.select()}
                              fullWidth
                              sx={{ mt: 0.5 }}
                              size="small"
                              name="vat_ded"
                              value={e.vat_ded}
                              onChange={(e) => set_receipt_info_onChange(e, i)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {receipt.currency}
                                  </InputAdornment>
                                ),
                                inputComponent: NumberFormatCustom,
                              }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <b> VAT Income </b>
                            <TextField
                              onClick={(e) => e.target.select()}
                              fullWidth
                              sx={{ mt: 0.5 }}
                              size="small"
                              name="vat_income"
                              value={e.vat_income}
                              onChange={(e) => set_receipt_info_onChange(e, i)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {receipt.currency}
                                  </InputAdornment>
                                ),
                                inputComponent: NumberFormatCustom,
                              }}
                              variant="outlined"
                            />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={2}>
                        <b> Amount Net </b>
                        <TextField
                          disabled
                          onClick={(e) => e.target.select()}
                          fullWidth
                          sx={{ mt: 0.5 }}
                          size="small"
                          name="amt_net"
                          value={
                            parseFloat(e.amount) -
                            parseFloat(e.bir) -
                            parseFloat(e.vat_ded)
                          }
                          onChange={(e) => set_receipt_info_onChange(e, i)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {receipt.currency}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </Grid>

                      {i ? (
                        <Grid item xs={0.5}>
                          <IconButton
                            sx={{ mt: 2.5 }}
                            color="error"
                            aria-label="delete"
                            onClick={() => remove_receipt_info(i)}
                          >
                            <Delete />
                          </IconButton>
                        </Grid>
                      ) : null}
                    </Grid>
                  </div>
                ))}
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => add_receipt_info()}
                >
                  ADD MORE RECEIPT
                </Button>
              </Grid>

              <Grid item xs={16}>
                <div>
                  <b> Remarks:</b>
                </div>
                <TextField
                  sx={{ mt: 0.5 }}
                  autoComplete="off"
                  size="small"
                  multiline
                  rows={2}
                  fullWidth
                  name="remarks"
                  id="remarks"
                  value={receipt.remarks}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
          </>
          <Box sx={{ display: "flex", mt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button variant="contained" color="success" onClick={onSubmit}>
                Create
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentCreateModal;
