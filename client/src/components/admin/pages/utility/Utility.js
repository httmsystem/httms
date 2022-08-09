import React, { useEffect } from "react";
import UtilityCreateModal from "./UtilityCreateModal";
import UtilityTable from "./UtilityTable";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, CircularProgress, Backdrop } from "@mui/material";
import {
  createUtility,
  getUtility,
  reset,
} from "../../../../features/utility/utilitySlice";

const Utility = () => {
  const dispatch = useDispatch();
  const { utilitys, isLoading, isError, message } = useSelector(
    (state) => state.utilitys
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getUtility());

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
              <UtilityCreateModal
                createUtility={createUtility}
                dispatch={dispatch}
              />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
      <UtilityTable utilitys={utilitys} dispatch={dispatch} />
    </div>
  );
};

export default Utility;
