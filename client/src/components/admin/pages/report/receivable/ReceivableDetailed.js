import {
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { getRs, reset } from "../../../../../features/rs/rsSlice";
import { getCustomer } from "../../../../../features/customer/customerSlice";
import { useSelector, useDispatch } from "react-redux";

import ReceivableDetailedModal from "./ReceivableDetailedModal";

const ReceivableDetailed = () => {
  const _ = require("lodash");
  const dispatch = useDispatch();

  const { rss, isLoading, isError, message } = useSelector(
    (state) => state.rss
  );
  const { customer } = useSelector((state) => state.customer);

  const [customer_filter, set_customer_filter] = useState({
    _id: null,
    acct_name: "",
  });
  const [data_filter, set_data_filter] = useState([]);
  const [value, setValue] = useState([null, null]);
  const [due_date, set_due_date] = useState(null);

  const filter_customer = [...rss].filter(
    (type) => type.customer.acct_data._id === customer_filter._id
  );
  const filter_status = [...filter_customer].filter(
    (type) => type.status === "UNPAID"
  );

  const filteredReservationData = () => {
    var _ = require("lodash");
    var startDate = value[0];
    var endDate = value[1];

    return set_data_filter(
      _.filter(filter_status, function (data) {
        if (_.isNull(startDate) && _.isNull(endDate)) {
          return true;
        } else {
          return (
            new Date(data.acr.date) >= new Date(startDate) &&
            new Date(data.acr.date) <= new Date(endDate)
          );
        }
      })
    );
  };

  const grand_total_php = [...data_filter]
    .filter((type) => type.grand_total_selling.remit_currency === "₱")
    .reduce(
      (total, currentValue) =>
        (total = total + currentValue.payment_detail.balance_php),
      0
    );
  const grand_total_usd = [...data_filter]
    .filter((type) => type.grand_total_selling.remit_currency === "$")
    .reduce(
      (total, currentValue) =>
        (total = total + currentValue.payment_detail.balance_usd),
      0
    );

  const [open_modal, set_open_modal] = useState(false);

  const handleOpenRD = () => {
    set_open_modal(true);
  };

  const handleCloseRD = () => {
    set_open_modal(false);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getCustomer());

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
    <div className="booking">
      <div className="dashboardWidgets">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16}>
              ACCOUNT RECEIVABLE DETAILED REPORT
            </Grid>

            <Grid item xs={16}>
              CUSTOMER TARGET
            </Grid>
            <Grid item xs={16}>
              <Autocomplete
                options={customer}
                getOptionLabel={(option) => option.acct_name}
                value={customer_filter}
                onChange={(e, new_acct_data) => {
                  set_customer_filter(new_acct_data);
                }}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Customer Account" />
                )}
              />
            </Grid>
            <Grid item xs={16}>
              DATE RANGE
            </Grid>
            <Grid item xs={16}>
              <LocalizationProvider
                dateAdapter={DateAdapter}
                format="DD-MM-YYYY"
              >
                <DateRangePicker
                  startText="STARTING DATE"
                  endText="ENDING DATE"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField xs={8} fullWidth {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField xs={8} fullWidth {...endProps} />
                    </>
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={16}>
              DUE DATE
            </Grid>

            <Grid item xs={8}>
              <LocalizationProvider
                dateAdapter={DateAdapter}
                format="DD-MM-YYYY"
              >
                <DatePicker
                  fullWidth
                  type="date"
                  label="DUE DATE"
                  openTo="day"
                  value={due_date}
                  onChange={(value) => {
                    set_due_date(value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} name="date" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={8}></Grid>

            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                margin="dense"
                onClick={() => {
                  filteredReservationData();
                  handleOpenRD();
                }}
              >
                GENERATE REPORT
              </Button>
            </Grid>
            <ReceivableDetailedModal
              open={open_modal}
              close={handleCloseRD}
              customer_filter={customer_filter}
              data_filter={data_filter}
              grand_total_php={grand_total_php}
              grand_total_usd={grand_total_usd}
              date={value}
              due_date={due_date}
            ></ReceivableDetailedModal>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ReceivableDetailed;
