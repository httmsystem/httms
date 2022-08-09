import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const GdsConfirm = (props) => {
  return (
    <div>
      <Dialog open={props.openConfirm}>
        <DialogTitle> GDS Series</DialogTitle>
        <DialogContent>
          <DialogContentText>SUCCESS GENERATE</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" onClick={props.onSubmit}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GdsConfirm;
