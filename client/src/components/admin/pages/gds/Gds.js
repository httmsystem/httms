import GdsTable from "./GdsTable";
import GdsCreateModal from "./GdsCreateModal";
import { Box, Grid, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { createGds, getGds, reset } from "../../../../features/gds/gdsSlice";

const Gds = () => {
  const dispatch = useDispatch();
  const { gdss, isLoading, isError, message } = useSelector(
    (state) => state.gdss
  );
  const [gds, set_gds] = useState({
    header: "",
    gds_type: "",
    airline: "",
    series: [],
  });

  const [gds_data, set_gds_data] = useState([]);
  const [gds_type, set_gds_type] = useState("");
  const [airline, set_airline] = useState("");
  const [gds_series_no_start, set_gds_series_no_start] = useState(0);
  const [gds_series_no_end, set_gds_series_no_end] = useState(0);

  const [disable, set_disable] = useState(false);

  const setDisable = () => set_disable(true);
  let gds_loop = () => {
    for (var i = gds_series_no_start; i < gds_series_no_end; i++) {
      gds_data.push({
        ticket_no: i,
     
      });
    }

    return set_gds_data([
      ...gds_data,
      {
        ticket_no: i,
      },
    ]);
  };

  let set = () => {
    gds_loop();
  };

  let generate = () => {
    set_gds({
      header: gds_series_no_start + "-" + gds_series_no_end,
      gds_type: gds_type,
      airline: airline,
      series: [...gds_data],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGds(gds));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getGds());

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
              <GdsCreateModal
                createGds={createGds}
                gds_data={gds_data}
                gds={gds}
                set_gds={set_gds}
                gds_type={gds_type}
                set_gds_type={set_gds_type}
                gds_series_no_start={gds_series_no_start}
                set_gds_series_no_start={set_gds_series_no_start}
                gds_series_no_end={gds_series_no_end}
                set_gds_series_no_end={set_gds_series_no_end}
                gds_loop={gds_loop}
                onSubmit={onSubmit}
                generate={generate}
                set={set}
                disable={disable}
                setDisable={setDisable}
                airline={airline}
                set_airline={set_airline}
              />
            </Grid>
            <Grid item xs={10}></Grid>
          </Grid>
        </Box>
      </div>
      <GdsTable gdss={gdss} />
    </div>
  );
};

export default Gds;
