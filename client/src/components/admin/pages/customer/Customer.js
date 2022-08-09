import React, { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable";
import CustomerCreateModal from "./CustomerCreateModal";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  CircularProgress,
  Backdrop,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {
  updateCustomer,
  createCustomer,
  getCustomer,
  deleteCustomer,
  searchCustomer,
  reset,
} from "../../../../features/customer/customerSlice";
import OpenSnackBar from "../../../popups/OpenSnackBar";

const Customer = () => {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");
  const [searchWord, setSearchWord] = useState("");

  const {
    customer,
    isLoading,
    isError,
    message,
    isSuccessAdd,
    isSuccessCustomer: isSuccessUpdate,
    isSuccessCustomerDelete,
  } = useSelector((state) => state.customer);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchCustomer(searchWord));
  };

  useEffect(() => {
    if (isError) {
      setOpenSnack(true);
      setMessage(message);
      setAlertTitle("Error");
      setSeverity("error");
      console.log(message);
    }
    if (isSuccessAdd) {
      setOpenSnack(true);
      setMessage("Successfully added customer");
      setAlertTitle("Success");
      setSeverity("info");
    }
    if (isSuccessUpdate) {
      setOpenSnack(true);
      setMessage("Sucecssfully changed customer data!");
      setAlertTitle("Success");
      setSeverity("info");
    }
    if (isSuccessCustomerDelete) {
      setOpenSnack(true);
      setMessage("Successfully remove customer");
      setAlertTitle("Success");
      setSeverity("info");
    }
    dispatch(getCustomer());

    return () => {
      dispatch(reset());
    };
  }, [
    isError,
    message,
    dispatch,
    isSuccessAdd,
    isSuccessUpdate,
    isSuccessCustomerDelete,
  ]);

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
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 1,
              m: 1,
              borderRadius: 1,
            }}
          >
            <CustomerCreateModal
              createCustomer={createCustomer}
              dispatch={dispatch}
            />
            {/* <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                onChange={(e) => setSearchWord(e.target.value)}
                value={searchWord}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search For Customer Name"
                inputProps={{ "aria-label": "search customer name" }}
              />

              <IconButton
                onClick={handleSearch}
                type="submit"
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper> */}
          </Box>
        </div>
      </div>

      <CustomerTable
        customer={customer}
        deleteCustomer={deleteCustomer}
        updateCustomer={updateCustomer}
        dispatch={dispatch}
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

export default Customer;
