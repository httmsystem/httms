import {
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  Backdrop,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DateRangePicker from "@mui/lab/DateRangePicker";
import {
  getSuppliers,
  reset,
} from "../../../../../features/supplier/supplierSlice";
import { getPsd } from "../../../../../features/psd/psdSlice";
import { getRs } from "../../../../../features/rs/rsSlice";
import { useSelector, useDispatch } from "react-redux";

import PayableReportModal from "./PayableReportModal";

const PayableReport = () => {
  const _ = require("lodash");
  const dispatch = useDispatch();

  const { rss } = useSelector((state) => state.rss);

  const { psds, isLoading, isError, message } = useSelector(
    (state) => state.psds
  );
  const { suppliers } = useSelector((state) => state.suppliers);

  const [suppliers_filter, set_suppliers_filter] = useState({
    _id: null,
    name: "",
  });

  //   PRODUCT & SERVICES
  const data_prod = [...psds]
    .map((e) => {
      return rss
        .filter((type) => type.rs_no === e.no)
        .map((ee) => {
          return ee.product_service
            .filter((type) => type.no === e.product_no)
            .map((eee) => {
              return {
                no: e.no,
                supplier_no: e.supplier_no,
                product_no: e.product_no,
                passenger_no: e.passenger_no,
                currency: e.currency,
                gross: eee.costing.gross,
                com_percent: eee.costing.com_percent,
                com_amount: eee.costing.com_amount,
                net: eee.costing.net,
                taxes_total: eee.costing.taxes_total,
                ph_tax: eee.costing.ph_tax,
                cost_in_php: e.cost_in_php,
                cost_in_usd: e.cost_in_usd,
                status: e.status,
                date_issued: ee.acr.date,
              };
            })
            .flat();
        })
        .flat();
    })
    .flat();

  // PASSENGER
  const data_pass = [...data_prod]
    .map((e) => {
      return rss
        .filter((type) => type.rs_no === e.no)
        .map((ee) => {
          return ee.passenger
            .filter((type) => type.no === e.passenger_no)
            .map((eee) => {
              return {
                no: e.no,
                supplier_no: e.supplier_no,
                product_no: e.product_no,
                passenger_no: e.passenger_no,
                currency: e.currency,
                gross: e.gross,
                com_percent: e.com_percent,
                com_amount: e.com_amount,
                net: e.net,
                taxes_total: e.taxes_total,
                ph_tax: e.ph_tax,
                cost_in_php: e.cost_in_php,
                cost_in_usd: e.cost_in_usd,
                status: e.status,
                date_issued: e.date_issued,
                name:
                  eee.last_name +
                  ", " +
                  eee.first_name +
                  " " +
                  eee.suffix +
                  " " +
                  eee.middle_name,
              };
            })
            .flat();
        })
        .flat();
    })
    .flat();
  // data ticket
  const data_ticket = [...data_pass]
    .map((e) => {
      return rss
        .filter((type) => type.rs_no === e.no)
        .map((ee) => {
          return ee.passenger
            .filter((type) => type.no === e.passenger_no)
            .map((eee) => {
              return eee.ticket
                .filter((type) => type.products_services_no === e.product_no)
                .map((eeee) => {
                  return {
                    no: e.no,
                    supplier_no: e.supplier_no,
                    product_no: e.product_no,
                    passenger_no: e.passenger_no,
                    currency: e.currency,
                    gross: e.gross,
                    com_percent: e.com_percent,
                    com_amount: e.com_amount,
                    net: e.net,
                    taxes_total: e.taxes_total,
                    ph_tax: e.ph_tax,
                    cost_in_php: e.cost_in_php,
                    cost_in_usd: e.cost_in_usd,
                    status: e.status,
                    date_issued: e.date_issued,
                    name: e.name,
                    ticket: eeee.ticket_data,
                  };
                });
            })
            .flat();
        })
        .flat();
    })
    .flat();

  const [data_filter, set_data_filter] = useState([]);
  const [value, setValue] = useState([null, null]);
  const [cur, set_cur] = useState("");
  const [stat, set_stat] = useState("");

  const filter_supplier = [...data_ticket].filter(
    (type) => type.supplier_no === suppliers_filter._id
  );

  const filter_cur = [...filter_supplier].filter(
    (type) => type.currency === cur
  );

  const filteredPayableData = () => {
    var _ = require("lodash");
    var startDate = value[0];
    var endDate = value[1];

    return set_data_filter(
      _.filter(filter_cur, function (data) {
        if (_.isNull(startDate) && _.isNull(endDate)) {
          return true;
        } else {
          return (
            new Date(data.date_issued) >= new Date(startDate) &&
            new Date(data.date_issued) <= new Date(endDate)
          );
        }
      })
    );
  };

  console.log(data_filter);

  //   const grand_total_php = [...data_filter]
  //     .filter((type) => type.grand_total_selling.remit_currency === "₱")
  //     .reduce(
  //       (total, currentValue) =>
  //         (total = total + currentValue.payment_detail.balance_php),
  //       0
  //     );
  //   const grand_total_usd = [...data_filter]
  //     .filter((type) => type.grand_total_selling.remit_currency === "$")
  //     .reduce(
  //       (total, currentValue) =>
  //         (total = total + currentValue.payment_detail.balance_usd),
  //       0
  //     );

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
    dispatch(getSuppliers());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getPsd());

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
              PAYABLE REPORT
            </Grid>

            <Grid item xs={16}>
              SUPPLIER TARGET
            </Grid>
            <Grid item xs={16}>
              <Autocomplete
                options={suppliers}
                getOptionLabel={(option) => option.name}
                value={suppliers_filter}
                onChange={(e, new_acct_data) => {
                  set_suppliers_filter(new_acct_data);
                }}
                disablePortal
                renderInput={(params) => (
                  <TextField {...params} label="Suppliers Account" />
                )}
              />
            </Grid>
            <Grid item xs={8}>
              CURRENCY
            </Grid>

            <Grid item xs={8}>
              STATUS
            </Grid>
            {/* CURRENCY */}

            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>CURRENCY</InputLabel>
                <Select
                  label="CURRENCY"
                  value={cur}
                  onChange={(e) => set_cur(e.target.value)}
                >
                  <MenuItem value={"₱"}>₱ - PHP</MenuItem>
                  <MenuItem value={"$"}>$ - USD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* STATUS */}
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>STATUS</InputLabel>
                <Select
                  label="STATUS"
                  value={stat}
                  onChange={(e) => set_stat(e.target.value)}
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"PAID"}>PAID</MenuItem>
                  <MenuItem value={"UNPAID"}>UNPAID</MenuItem>
                </Select>
              </FormControl>
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
                  filteredPayableData();
                  handleOpenRD();
                }}
              >
                GENERATE REPORT
              </Button>
            </Grid>
            <PayableReportModal
              open={open_modal}
              close={handleCloseRD}
              data_filter={data_filter}
              suppliers_filter={suppliers_filter}
              cur={cur}
              stat={stat}
              date={value}
            ></PayableReportModal>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default PayableReport;
