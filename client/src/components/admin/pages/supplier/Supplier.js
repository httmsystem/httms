import SupplierTable from "./SupplierTable";
import SupplierCreateModal from "./SupplierCreateModal";
import { Box, Grid, CircularProgress, Backdrop } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  createSuppliers,
  getSuppliers,
  deleteSuppliers,
  reset,
} from "../../../../features/supplier/supplierSlice.js";

const Supplier = () => {
  const dispatch = useDispatch();

  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.suppliers
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getSuppliers());

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
              <SupplierCreateModal
                createSupplier={createSuppliers}
                dispatch={dispatch}
              />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
      <SupplierTable
        suppliers={suppliers}
        deleteSuppliers={deleteSuppliers}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Supplier;
