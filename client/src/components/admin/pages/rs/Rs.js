import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRs, reset } from "../../../../features/rs/rsSlice";
import { CircularProgress, Backdrop } from "@mui/material";
import RsTable from "./RsTable";

const Rs = () => {
  const dispatch = useDispatch();

  const { rss, isLoading, isError, message } = useSelector(
    (state) => state.rss
  );

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
        <RsTable rss={rss} />
      </div>
    </div>
  );
};

export default Rs;
