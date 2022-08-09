import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import { ReportProblem } from "@mui/icons-material";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  TextField,
  Autocomplete,
  Modal,
  Box,
  Grid,
  InputAdornment,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  Backdrop,
} from "@mui/material";

import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";

import { getPsd, updatePsd, reset } from "../../../../features/psd/psdSlice";
import { getSuppliers } from "../../../../features/supplier/supplierSlice.js";
import { getRs } from "../../../../features/rs/rsSlice";
import OpenSnackBar from "../../../popups/OpenSnackBar";

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

const PayableCreateModal = (props) => {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { suppliers } = useSelector((state) => state.suppliers);
  const { rss } = useSelector((state) => state.rss);
  const { psds, isLoading, isError, message, isSuccessPsdUpdate } = useSelector(
    (state) => state.psds
  );

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

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [inv_no, set_inv_no] = useState("");
  const [desc, set_desc] = useState("");
  const [pay_type, set_pay_type] = useState("");
  const [cur, set_cur] = useState("");
  const [sup_act, set_sup_act] = useState({
    _id: "",
    name: "",
  });
  const [date_inv, set_date_inv] = useState(null);
  const [term, set_term] = useState("");
  const [due_date, set_due_date] = useState(null);
  const [remark, set_remark] = useState("");
  const [payee, set_payee] = useState("");
  const [payable_list, set_payable_list] = useState([]);
  const [amt, set_amt] = useState(0);
  // NUMBERING SYSTEM FUNCTION
  var get_invoices;
  var invoices_length;
  try {
    get_invoices = [...props.invoices, []];
    invoices_length = get_invoices.length;
  } catch (error) {
    console.log(error);
  }

  const year = new Date().getFullYear();
  // NUMBERING INVOICE NO.
  const no_inv_bill = "INV" + year + "0" + invoices_length;

  
  const grand_total_php = [...payable_list]
    .filter((type) => type.currency === "₱")
    .reduce(
      (total, currentValue) => (total = total + currentValue.cost_in_php),
      0
    );

  const grand_total_usd = [...payable_list]
    .filter((type) => type.currency === "$")
    .reduce(
      (total, currentValue) => (total = total + currentValue.cost_in_usd),
      0
    );

  const data = {
    no: no_inv_bill,
    invoice_no: inv_no,
    desc: desc,
    payment_type: pay_type,
    currency: cur,
    supplier_account: sup_act,
    date_invoice: date_inv,
    term: term,
    remark: due_date,
    amount: amt,
    payable_list: payable_list,
    status: "OPEN",
  };

  const add = (e) => {
    dispatch(
      updatePsd({
        _id: e._id,
        supplier_no: e.supplier_no,
        product_no: e.product_no,
        passenger_no: e.passenger_no,
        currency: e.currency,
        cost_in_php: e.cost_in_php,
        cost_in_usd: e.cost_in_usd,
        status: "PAID",
      })
    );

    let pay_list = [...payable_list];
    pay_list.push(e);
    set_payable_list(pay_list);
  };

  const remove = (e, key) => {
    dispatch(
      updatePsd({
        _id: e._id,
        supplier_no: e.supplier_no,
        product_no: e.product_no,
        passenger_no: e.passenger_no,
        currency: e.currency,
        cost_in_php: e.cost_in_php,
        cost_in_usd: e.cost_in_usd,
        status: "UNPAID",
      })
    );
    let newArray = [...payable_list];
    newArray.splice(key, 1);
    set_payable_list(newArray);

    console.log(key);
    console.log("key index: ", key);
  };

  const onSubmit = () => {
    if (pay_type === "SUPPLIER") {
      if (cur === "₱") {
        dispatch(
          props.createInvoice({
            no: no_inv_bill,
            invoice_no: inv_no,
            desc: desc,
            payment_type: pay_type,
            currency: cur,
            supplier_account: sup_act,
            payee: sup_act.name,
            date_invoice: date_inv,
            term: term,
            remark: due_date,
            amount: grand_total_php,
            payable_list: payable_list,
            status: "OPEN",
          })
        );
      } else {
        dispatch(
          props.createInvoice({
            no: no_inv_bill,
            invoice_no: inv_no,
            desc: desc,
            payment_type: pay_type,
            currency: cur,
            supplier_account: sup_act,
            payee: sup_act.name,
            date_invoice: date_inv,
            term: term,
            remark: due_date,
            amount: grand_total_usd,
            payable_list: payable_list,
            status: "OPEN",
          })
        );
      }
    } else {
      dispatch(
        props.createInvoice({
          no: no_inv_bill,
          invoice_no: inv_no,
          desc: desc,
          payment_type: pay_type,
          currency: cur,
          supplier_account: sup_act,
          payee: payee,
          date_invoice: date_inv,
          term: term,
          remark: due_date,
          amount: amt,
          payable_list: payable_list,
          status: "OPEN",
        })
      );
    }

    handleClose();
  };

  useEffect(() => {
    if (isError) {
      setOpenSnack(true);
      setMessage(message);
      setAlertTitle("Error");
      setSeverity("error");
      console.log(message);
    }
    if (isSuccessPsdUpdate) {
      setOpenSnack(true);
      setMessage("Successfully Added");
      setAlertTitle("Success");
      setSeverity("info");
      console.log(message);
    }
    dispatch(getPsd());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, isSuccessPsdUpdate]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getSuppliers());

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

  // if (isLoading) {
  //   return (
  //     <Backdrop
  //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={true}
  //     >
  //       <CircularProgress color="inherit" />
  //     </Backdrop>
  //   );
  // }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Invoice/Bill
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={8}>
              <TextField
                label="Invoice No."
                fullWidth
                value={inv_no}
                onChange={(e) => set_inv_no(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Description"
                fullWidth
                value={desc}
                onChange={(e) => set_desc(e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Payment Type</InputLabel>
                <Select
                  label="Payment Type"
                  value={pay_type}
                  onChange={(e) => set_pay_type(e.target.value)}
                >
                  <MenuItem value={"SUPPLIER"}>SUPPLIER</MenuItem>
                  <MenuItem value={"OTHER"}>OTHER</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  label="Currency"
                  value={cur}
                  onChange={(e) => set_cur(e.target.value)}
                >
                  <MenuItem value={"₱"}>₱ - PHP</MenuItem>
                  <MenuItem value={"$"}>$ - USD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {pay_type === "SUPPLIER" ? (
              <></>
            ) : (
              <>
                <Grid item xs={16}>
                  <TextField
                    label="Payee"
                    onChange={(e) => set_payee(e.target.value)}
                    fullWidth
                    value={payee}
                  />
                </Grid>
              </>
            )}

            {pay_type === "SUPPLIER" && (
              <>
                <Grid item xs={8}>
                  <Autocomplete
                    options={suppliers}
                    getOptionLabel={(option) => option.name}
                    value={sup_act}
                    onChange={(e, new_acct_data) => {
                      set_sup_act(new_acct_data);
                    }}
                    disablePortal
                    renderInput={(params) => (
                      <TextField {...params} label="Supplier Account" />
                    )}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label="Payee"
                    fullWidth
                    value={sup_act.name}
                    onChange={(e) => set_payee(e.target.value)}
                    disabled
                  />
                </Grid>
              </>
            )}

            <Grid item xs={5}>
              <LocalizationProvider
                dateAdapter={DateAdapter}
                format="DD-MM-YYYY"
              >
                <DatePicker
                  fullWidth
                  value={date_inv}
                  onChange={(e) => {
                    set_date_inv(e);
                  }}
                  type="date"
                  label="Invoice/Bill Date"
                  openTo="day"
                  renderInput={(params) => (
                    <TextField {...params} name="date" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Terms</InputLabel>
                <Select
                  label="Terms"
                  value={term}
                  onChange={(e) => set_term(e.target.value)}
                >
                  <MenuItem value={"OR"}>OR</MenuItem>
                  <MenuItem value={"AR"}>AR</MenuItem>
                  <MenuItem value={"PR"}>PR</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <LocalizationProvider
                dateAdapter={DateAdapter}
                format="DD-MM-YYYY"
              >
                <DatePicker
                  fullWidth
                  type="date"
                  label="Due Date"
                  value={due_date}
                  onChange={(e) => {
                    set_due_date(e);
                  }}
                  openTo="day"
                  renderInput={(params) => (
                    <TextField {...params} name="date" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            {pay_type === "SUPPLIER" ? (
              <></>
            ) : (
              <>
                <Grid item xs={16}>
                  <div>
                    {" "}
                    <Grid item xs={16}>
                      <TextField
                        margin="dense"
                        fullWidth
                        name="amount"
                        label="Amount Payment"
                        value={amt}
                        onChange={(e) => set_amt(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {cur + " "}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </div>
                </Grid>
              </>
            )}
            <Grid item xs={16}>
              <TextField
                label="Remarks"
                fullWidth
                value={remark}
                onChange={(e) => {
                  set_remark(e.target.value);
                }}
              />
            </Grid>

            {pay_type === "SUPPLIER" && (
              <>
                {" "}
                <Grid item xs={16}>
                  <div className="title_net">
                    <b>List of Payable</b>
                  </div>
                </Grid>
                <Grid item xs={16}>
                  <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%" }}>
                      <TableContainer>
                        <Table
                          sx={{ minWidth: 550 }}
                          aria-labelledby="tableTitle"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>RS #</TableCell>
                              <TableCell>Passenger Name</TableCell>
                              <TableCell>Cost Amount</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {psds.length > 0 ? (
                              <>
                                {psds
                                  .filter(
                                    (type) =>
                                      type.supplier_no === sup_act._id &&
                                      type.currency === cur &&
                                      type.status === "UNPAID"
                                  )
                                  .map((row) => {
                                    return (
                                      <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                          {row.no}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {rss
                                            .filter(
                                              (type) => type.rs_no === row.no
                                            )
                                            .map((e) => {
                                              return (
                                                <>
                                                  {e.passenger
                                                    .filter(
                                                      (type) =>
                                                        type.no ===
                                                        row.passenger_no
                                                    )
                                                    .map((ee) => {
                                                      return (
                                                        <>
                                                          {ee.title +
                                                            " " +
                                                            ee.last_name +
                                                            ", " +
                                                            ee.first_name +
                                                            " " +
                                                            ee.suffix +
                                                            " " +
                                                            ee.middle_name}
                                                        </>
                                                      );
                                                    })}
                                                </>
                                              );
                                            })}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {row.currency === "$" ? (
                                            <>
                                              <NumberFormat
                                                value={row.cost_in_usd}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={row.currency + " "}
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <NumberFormat
                                                value={row.cost_in_php}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={row.currency + " "}
                                              />
                                            </>
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => add(row)}
                                          >
                                            Add
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </>
                            ) : (
                              <div>
                                <Typography sx={{ mt: 1.5, mb: 1 }}>
                                  <ReportProblem sx={{ mr: 3 }} />
                                  NO RECEIPT DATA HAS BEEN ADDED
                                </Typography>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        component="div"
                        count={psds.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Box>
                </Grid>
                <Grid item xs={16}>
                  <div className="title_net">
                    <b>Added Payable to Invoice/Bill</b>{" "}
                  </div>
                </Grid>
                <Grid item xs={16}>
                  <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%" }}>
                      <TableContainer>
                        <Table
                          sx={{ minWidth: 550 }}
                          aria-labelledby="tableTitle"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>RS #</TableCell>
                              <TableCell>Passenger Name</TableCell>
                              <TableCell>Cost Amount</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>

                          <TableBody>
                            {payable_list.length > 0 ? (
                              <>
                                {payable_list
                                  .filter(
                                    (type) =>
                                      type.supplier_no === sup_act._id &&
                                      type.currency === cur
                                  )
                                  .map((row, index) => {
                                    return (
                                      <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                          {row.no}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {rss
                                            .filter(
                                              (type) => type.rs_no === row.no
                                            )
                                            .map((e) => {
                                              return (
                                                <>
                                                  {e.passenger
                                                    .filter(
                                                      (type) =>
                                                        type.no ===
                                                        row.passenger_no
                                                    )
                                                    .map((ee) => {
                                                      return (
                                                        <>
                                                          {ee.title +
                                                            " " +
                                                            ee.last_name +
                                                            ", " +
                                                            ee.first_name +
                                                            " " +
                                                            ee.suffix +
                                                            " " +
                                                            ee.middle_name}
                                                        </>
                                                      );
                                                    })}
                                                </>
                                              );
                                            })}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                          {row.currency === "$" ? (
                                            <>
                                              <NumberFormat
                                                value={row.cost_in_usd}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={row.currency + " "}
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <NumberFormat
                                                value={row.cost_in_php}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={row.currency + " "}
                                              />
                                            </>
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          <div>
                                            <Button
                                              variant="contained"
                                              color="error"
                                              onClick={() => remove(row, index)}
                                              key={index}
                                            >
                                              Remove
                                            </Button>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </>
                            ) : (
                              <TableCell component="th" scope="row">
                                <div>
                                  <Typography sx={{ mt: 1.5, mb: 1 }}>
                                    <ReportProblem sx={{ mr: 3 }} />
                                    NO PAYABLE HAS BEEN ADDED
                                  </Typography>
                                </div>
                              </TableCell>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        component="div"
                        count={payable_list.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
                  </Box>
                </Grid>
              </>
            )}

            {pay_type === "SUPPLIER" && (
              <>
                {cur === "$" ? (
                  <>
                    <Grid item xs={16}>
                      <b>
                        <TextField
                          disable
                          margin="dense"
                          fullWidth
                          name="amount"
                          label="Amount Payment"
                          value={parseFloat(grand_total_usd).toFixed(2)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {cur + " "}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </b>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={16}>
                      <b>
                        <TextField
                          disable
                          margin="dense"
                          fullWidth
                          name="amount"
                          label="Amount Payment"
                          value={parseFloat(grand_total_php).toFixed(2)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {cur + " "}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </b>
                    </Grid>
                  </>
                )}
              </>
            )}

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }}>
                {payable_list.length > 0 ? (
                  <Button
                    disabled
                    variant="contained"
                    sx={{ mr: 1 }}
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    color="error"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                )}

                <Button variant="contained" sx={{ mr: 1 }} onClick={onSubmit}>
                  Create
                </Button>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Modal>

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
    </div>
  );
};

export default PayableCreateModal;
