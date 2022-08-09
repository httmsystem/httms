import React, { useEffect, useState } from "react";
import { CircularProgress, Backdrop, Grid, Box } from "@mui/material";
import PayableCreateModal from "./PayableCreateModal";
import { useSelector, useDispatch } from "react-redux";
import {
  createInvoice,
  getInvoice,
  updateInvoice,
  reset,
} from "../../../../features/invoice/invoiceSlice";
import {
  createRelease,
  getRelease,
} from "../../../../features/release/releaseSlice";
import PayableTable from "./PayableTable";
import OpenSnackBar from "../../../popups/OpenSnackBar";

const Payable = () => {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");
  const { invoices, isSuccessInvoiceUpdate, isLoading, isError, message } =
    useSelector((state) => state.invoices);
  const { releases } = useSelector((state) => state.releases);

  useEffect(() => {
    if (isError) {
      setOpenSnack(true);
      setMessage(message);
      setAlertTitle("Error");
      setSeverity("error");
    }

    dispatch(getRelease());

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
    if (isSuccessInvoiceUpdate) {
      setOpenSnack(true);
      setMessage("Sucecssfully Created");
      setAlertTitle("Success");
      setSeverity("info");
    }
    dispatch(getInvoice());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch, isSuccessInvoiceUpdate]);

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
    <div className="booking">
      <div className="dashboardWidgets">
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={6}>
              <PayableCreateModal
                invoices={invoices}
                createInvoice={createInvoice}
                getInvoice={getInvoice}
              />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>

      <PayableTable
        invoices={invoices}
        releases={releases}
        updateInvoice={updateInvoice}
        dispatch={dispatch}
        createRelease={createRelease}
      />
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

export default Payable;
