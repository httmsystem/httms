import UserTable from "./UserTable";
import UserCreateModal from "./UserCreateModal";
import { Box, Grid, CircularProgress, Backdrop } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser,
  getUser,
  reset,
  createUser,
  deleteUser,
} from "../../../../features/user/userSlice.js";
import OpenSnackBar from "../../../popups/OpenSnackBar";

const User = () => {
  const dispatch = useDispatch();
  const [openSnack, setOpenSnack] = useState(false);
  const [messageSnack, setMessage] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");
  const [severity, setSeverity] = useState("inherit");

  const {
    user,
    isLoading,
    isError,
    message,
    isSuccessAdd,
    isSuccessUser: isSuccessUpdate,
    isSuccessUserDelete,
  } = useSelector((state) => state.users);
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
      setMessage("Successfully added user");
      setAlertTitle("Success");
      setSeverity("info");
    }
    if (isSuccessUpdate) {
      setOpenSnack(true);
      setMessage("Successfully changed user data!");
      setAlertTitle("Success");
      setSeverity("info");
    }
    if (isSuccessUserDelete) {
      setOpenSnack(true);
      setMessage("Successfully remove user");
      setAlertTitle("Success");
      setSeverity("info");
    }
    dispatch(getUser());

    return () => {
      dispatch(reset());
    };
  }, [
    isError,
    message,
    dispatch,
    isSuccessAdd,
    isSuccessUpdate,
    isSuccessUserDelete,
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
        <Box sx={{ flexGrow: 2 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={6}>
              <UserCreateModal createUser={createUser} dispatch={dispatch} />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
      <UserTable
        users={user}
        deleteUser={deleteUser}
        updateUser={updateUser}
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

export default User;
