import React, { useEffect, useState } from "react";
import AcrTable from "./AcrTable";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Backdrop, CircularProgress } from "@mui/material";

const Acr = (props) => {
  const { acrs, isLoading, isError, message } = useSelector(
    (state) => state.acrs
  );
  
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
        <AcrTable acrs={acrs}/>
      </div>
    </div>
  );
};

export default Acr;
