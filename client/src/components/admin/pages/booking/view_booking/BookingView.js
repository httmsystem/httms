import React, { useState, useEffect } from "react";

import {
  Button,
  Box,
  Modal,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import NumberFormat from "react-number-format";

const BookingView = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 4,
    overflow: "hidden",
    overflowY: "scroll",
  };
  return (
    <div>
      {" "}
      <Modal
        open={props.open}
        onClose={props.handle_close_view_payment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <>
            <Grid container spacing={1} columns={16}>
              <Grid item xs={16}></Grid>

              <Grid item xs={16}></Grid>
            </Grid>
          </>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button variant="contained" color="success" onClick={() => {}}>
                Done
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingView;
