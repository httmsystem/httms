import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Booking from "./pages/booking/Booking.js";
import GDS from "./pages/gds/Gds.js";
import User from "./pages/user/User.js";
import Customer from "./pages/customer/Customer.js";
import Supplier from "./pages/supplier/Supplier.js";
import Acr from "./pages/acr/Acr.js";
import Rs from "./pages/rs/Rs.js";
import Payment from "./pages/payment/Payment.js";
import Payable from "./pages/payable/Payable.js";
import ReceivableDetailed from "./pages/report/receivable/ReceivableDetailed.js";
import ReceivableSummary from "./pages/report/receivable/ReceivableSummary.js";
import PayableReport from "./pages/report/payable/PayableReport.js";
import Bank from "./pages/bank/Bank.js";
import Utility from "./pages/utility/Utility.js";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";

import { createAcr, getAcr, reset } from "../../features/acr/acrSlice.js";

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
      prefix="₱ "
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Admin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, message } = useSelector((state) => state.acrs);

  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [acr, set_acr] = React.useState({
    date: new Date(),
    rate: "",
  });

  const handleChange = (e) => {
    set_acr((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createAcr(acr));
    set_acr({
      date: new Date(),
      rate: "",
    });
    setOpen(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getAcr());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

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
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <DialogTitle>Airline Currency Rate</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={DateAdapter} format="DD-MM-YYYY">
              <DatePicker
                type="date"
                label="Date"
                name="date"
                value={acr.date}
                onChange={(value) => {
                  set_acr({
                    ...acr,
                    date: value,
                  });
                }}
                openTo="day"
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="dense" />
                )}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Rate"
              value={acr.rate}
              onChange={handleChange}
              name="rate"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={handleClose}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Header />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/booking/" element={<Booking getAcr={getAcr} />} />
          <Route path="/gds/" element={<GDS />} />
          <Route path="/user/" element={<User />} />
          <Route path="/customer/" element={<Customer />} />
          <Route path="/supplier/" element={<Supplier />} />
          <Route path="/acr/" element={<Acr getAcr={getAcr} />} />
          <Route path="/rss/" element={<Rs />} />
          <Route path="/liquidation/" element={<Payment />} />
          <Route path="/payable/" element={<Payable />} />
          <Route path="/bank/" element={<Bank />} />
          <Route path="/utility/" element={<Utility />} />
          <Route path="/report/ard/" element={<ReceivableDetailed />} />
          <Route path="/report/ars/" element={<ReceivableSummary />} />
          <Route path="/report/pay/" element={<PayableReport />} />
        </Routes>
      </div>
    </>
  );
};

export default Admin;
