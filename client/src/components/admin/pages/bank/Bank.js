import React, { useEffect } from "react";
import BankCreateModal from "./BankCreateModal";
import BankTable from "./BankTable";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, CircularProgress, Backdrop } from "@mui/material";
import {
  createBank,
  getBank,
  reset,
} from "../../../../features/bank/bankSlice";

const Bank = () => {
  const dispatch = useDispatch();

  const { banks, isLoading, isError, message } = useSelector(
    (state) => state.banks
  );
  useEffect(() => {
    if (isError) {
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
              <BankCreateModal createBank={createBank} dispatch={dispatch} />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
      <BankTable banks={banks} dispatch={dispatch} />
    </div>
  );
};

export default Bank;
