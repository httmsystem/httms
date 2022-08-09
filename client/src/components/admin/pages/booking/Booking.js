import React, { useEffect } from "react";
import BookingTable from "./BookingTable";
import BookingCreateModal from "./BookingCreateModal";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomer,
  reset,
} from "../../../../features/customer/customerSlice";
import { getUser } from "../../../../features/user/userSlice.js";
import { getSuppliers } from "../../../../features/supplier/supplierSlice.js";
import { getGds } from "../../../../features/gds/gdsSlice";
import { createRs, getRs } from "../../../../features/rs/rsSlice";
import { createPsd, getPsd } from "../../../../features/psd/psdSlice";
import { createLiquidation, getLiquidation } from "../../../../features/liquidation/liquidationSlice";
import { Box, Grid, CircularProgress, Backdrop } from "@mui/material";

const Booking = () => {
  const dispatch = useDispatch();

  const { customer, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );
  const { rss } = useSelector((state) => state.rss);
  const { acrs } = useSelector((state) => state.acrs);
  const { suppliers } = useSelector((state) => state.suppliers);
  const { user } = useSelector((state) => state.users);
  const { gdss } = useSelector((state) => state.gdss);
  const { psds } = useSelector((state) => state.psds);
  const { liquidations } =  useSelector((state) => state.liquidations);

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

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getCustomer());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getUser());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

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
    dispatch(getGds());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getLiquidation());

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
              <BookingCreateModal
                customer={customer}
                suppliers={suppliers}
                user={user}
                acrs={acrs}
                createRs={createRs}
                rss={rss}
                gdss={gdss}
                psds={psds}
                liquidations={liquidations}
                createPsd={createPsd}
                createLiquidation={createLiquidation}
                dispatch={dispatch}
              />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
      <BookingTable rss={rss} />
    </div>
  );
};

export default Booking;
