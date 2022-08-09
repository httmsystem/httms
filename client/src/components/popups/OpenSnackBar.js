import React, { useState } from "react";
import { IconButton, Snackbar, AlertTitle } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const OpenSnackBar = ({ ...props }) => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={props.open}
      autoHideDuration={6000}
      onClose={() => {
        props.handleOpenSnack(false);
      }}
    >
      <Alert
        severity={props.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              props.handleOpenSnack(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{props.alertTitle}</AlertTitle>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default OpenSnackBar;
