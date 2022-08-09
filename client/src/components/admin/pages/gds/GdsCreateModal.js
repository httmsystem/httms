import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import GdsConfirm from "./GdsConfirm";

const GdsCreateModal = (props) => {
  const [open, setOpen] = useState(false);

  const [openConfirm, set_open_confirm] = useState(false);

  const handleClickOpenConfirm = () => {
    set_open_confirm(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [disable, set_disable] = useState(true);
  const gen_disable = () => {
    set_disable(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create GDS Series
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> GDS Series</DialogTitle>
        <DialogContent>
          {/* {JSON.stringify(props.gds_data)}
          {JSON.stringify(props.gds_type)}
          {JSON.stringify(props.gds_series_no_start)}
          {JSON.stringify(props.gds)} */}
          <DialogContentText></DialogContentText>
          <FormControl fullWidth margin="dense">
            <InputLabel>GDS Type</InputLabel>
            <Select
              disabled={props.disable}
              value={props.gds_type}
              label="GDS Type"
              onChange={(e) => props.set_gds_type(e.target.value)}
            >
              <MenuItem value={"1A"}>1A - AMADEUS</MenuItem>
              <MenuItem value={"1B"}>1B - SABRE</MenuItem>
              <MenuItem value={"1G"}>1G - GALILEO</MenuItem>
              <MenuItem value={"1B-D"}>1B - DOMESTIC</MenuItem>
              <MenuItem value={"AIRLINE"}>AIRLINE</MenuItem>
            </Select>
          </FormControl>
          {props.gds_type === "AIRLINE" && (
            <>
              <TextField
                disabled={props.disable}
                margin="dense"
                label="Airline"
                fullWidth
                variant="outlined"
                value={props.airline}
                onChange={(e) => props.set_airline(e.target.value)}
              />
            </>
          )}

          <TextField
            disabled={props.disable}
            margin="dense"
            label="Ticket Start"
            fullWidth
            variant="outlined"
            value={props.gds_series_no_start}
            onChange={(e) => props.set_gds_series_no_start(e.target.value)}
          />
          <TextField
            disabled={props.disable}
            margin="dense"
            label="Ticket End"
            fullWidth
            variant="outlined"
            value={props.gds_series_no_end}
            onChange={(e) => props.set_gds_series_no_end(e.target.value)}
          />
          <Button
            disabled={props.disable}
            variant="contained"
            onClick={() => {
              props.set();
              props.setDisable();
              gen_disable();
            }}
          >
            Set
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disable}
            variant="contained"
            onClick={() => {
              props.generate();
              handleClickOpenConfirm();
            }}
          >
            Generate
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <GdsConfirm openConfirm={openConfirm} onSubmit={props.onSubmit} />
    </div>
  );
};

export default GdsCreateModal;
