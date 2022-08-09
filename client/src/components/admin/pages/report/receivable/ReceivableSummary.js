import {
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { getRs, reset } from "../../../../../features/rs/rsSlice";
import { useSelector, useDispatch } from "react-redux";
import ReceivableSummaryModal from "./ReceivableSummaryModal";

const ReceivableSummary = () => {
  const _ = require("lodash");
  const dispatch = useDispatch();

  const { rss, isLoading, isError, message } = useSelector(
    (state) => state.rss
  );

  const [value, setValue] = useState([null, null]);
 
  const [data_filter, set_data_filter] = useState([]);

  const filter_status = [...rss].filter((type) => type.status === "UNPAID");

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

  // PHP REPORT SUMMARY
  var report_php = [];
  const pass_report_php = [...data_filter].filter(
    (type) => type.grand_total_selling.remit_currency === "₱"
  );
  pass_report_php.reduce(function (res, value) {
    if (!res[value.customer.acct_data._id]) {
      res[value.customer.acct_data._id] = {
        no: value.customer.acct_data._id,
        acct_name: value.customer.acct_data.acct_name,
        php: 0,
        usd: 0,
      };
      report_php.push(res[value.customer.acct_data._id]);
    }
    res[value.customer.acct_data._id].php =
      res[value.customer.acct_data._id].php + value.payment_detail.balance_php;

    return res;
  }, {});

  // USD REPORT SUMMARY
  var report_usd = [];
  const pass_report_usd = [...data_filter].filter(
    (type) => type.grand_total_selling.remit_currency === "$"
  );
  pass_report_usd.reduce(function (res, value) {
    if (!res[value.customer.acct_data._id]) {
      res[value.customer.acct_data._id] = {
        no: value.customer.acct_data._id,
        acct_name: value.customer.acct_data.acct_name,
        usd: 0,
        php: 0,
      };
      report_usd.push(res[value.customer.acct_data._id]);
    }
    res[value.customer.acct_data._id].usd =
      res[value.customer.acct_data._id].usd + value.payment_detail.balance_usd;

    return res;
  }, {});

  const grand_total_php = [...report_php].reduce(
    (total, currentValue) => (total = total + currentValue.php),
    0
  );

  const grand_total_usd = [...report_usd].reduce(
    (total, currentValue) => (total = total + currentValue.usd),
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
              ACCOUNT RECEIVABLE SUMMARY REPORT
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
            <ReceivableSummaryModal
              open={open_modal}
              close={handleCloseRD}
              date={value}
              report_php={report_php}
              report_usd={report_usd}
              grand_total_php={grand_total_php}
              grand_total_usd={grand_total_usd}
            ></ReceivableSummaryModal>

            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default ReceivableSummary;
