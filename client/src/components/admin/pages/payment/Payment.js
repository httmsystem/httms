import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Backdrop, Grid, Box } from "@mui/material";
import PaymentTable from "./PaymentTable";
import PaymentCreateModal from "./PaymentCreateModal";
import OpenSnackBar from "../../../popups/OpenSnackBar";

import {
  createReceipt,
  getReceipt,
  updateReceipt,
  reset,
} from "../../../../features/receipt/receiptSlice";
import { getCustomer } from "../../../../features/customer/customerSlice";
import { getBank } from "../../../../features/bank/bankSlice";
const Payment = () => {
  const dispatch = useDispatch();

  const { receipts, isLoading, isSuccessReceiptUpdate, isError, message } =
    useSelector((state) => state.receipts);

  const { customer } = useSelector((state) => state.customer);
  const { banks } = useSelector((state) => state.banks);
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");

  useEffect(() => {
    if (isError) {
      setOpenSnack(true);
      setMessage(message);
      setAlertTitle("Error");
      setSeverity("error");
      console.log(message);
    }
    if (isSuccessReceiptUpdate) {
      setOpenSnack(true);
      setMessage("Sucecssfully Liquidated");
      setAlertTitle("Success");
      setSeverity("info");
    }
    dispatch(getReceipt());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, isSuccessReceiptUpdate]);

  useEffect(() => {
    if (isError) {
      setOpenSnack(true);
      setMessage(message);
      setAlertTitle("Error");
      setSeverity("error");
      console.log(message);
    }
    dispatch(getCustomer());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      setOpenSnack(true);
      setMessage(message);
      setAlertTitle("Error");
      setSeverity("error");
      console.log(message);
    }
    dispatch(getBank());

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
            <Grid item xs={6}>
              <PaymentCreateModal
                dispatch={dispatch}
                createReceipt={createReceipt}
                customer={customer}
                banks={banks}
              />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
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
      <PaymentTable
        receipts={receipts}
        updateReceipt={updateReceipt}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Payment;
