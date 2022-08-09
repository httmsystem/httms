import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const BookingCreateModalParticulars = (props) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16}>
            <h3>PARTICULARS: {props.particular}</h3>
          </Grid>
          <Grid item xs={8}>
            <Select
              fullWidth
              size="small"
              value={props.part2}
              onChange={(e) => {
                props.set_part2(e.target.value);
                props.set_particular(
                  props.prod_serv_class +
                    " " +
                    e.target.value +
                    " " +
                    props.part3
                );
              }}
            >
              <MenuItem value={""}>NONE</MenuItem>
              <MenuItem value={"AIR TICKET"}>AIR TICKET</MenuItem>
              <MenuItem value={"LAND ARRANGEMENT"}>LAND ARRANGEMENT</MenuItem>
              <MenuItem value={"PACKAGE TOUR"}>PACKAGE TOUR</MenuItem>
              <MenuItem value={"CRUISE ONLY"}>CRUISE ONLY</MenuItem>
              <MenuItem value={"CRUISE PACKAGE"}>CRUISE PACKAGE</MenuItem>
              <MenuItem value={"DOCUMENTATION - VISA"}>
                DOCUMENTATION - VISA
              </MenuItem>
              <MenuItem value={"CRUISE SHOREX"}>CRUISE SHOREX</MenuItem>
              <MenuItem value={"CITY TOUR"}>CITY TOUR</MenuItem>
              <MenuItem value={"CRUISE WITH LAND ARRANGEMENT"}>
                CRUISE WITH LAND ARRANGEMENT
              </MenuItem>
              <MenuItem value={"FLY N HTL ACCOMMODATION"}>
                FLY N HTL ACCOMMODATION
              </MenuItem>
              <MenuItem value={"THEME PARKS ONLY"}>THEME PARKS ONLY</MenuItem>
              <MenuItem value={"HOTEL ACCOMMODATION"}>
                HOTEL ACCOMMODATION
              </MenuItem>
              <MenuItem value={"DOCUMENTATION - PASSPORTING"}>
                DOCUMENTATION - PASSPORTING
              </MenuItem>
              <MenuItem value={"DOCUMENTATION - IMMIGRATION"}>
                DOCUMENTATION - IMMIGRATION
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              size="small"
              label="Additional Particular"
              value={props.part3}
              onChange={(e) => {
                props.set_part3(e.target.value);
                props.set_particular(
                  props.prod_serv_class +
                    " " +
                    props.part2 +
                    " " +
                    e.target.value
                );
              }}
            />
          </Grid>
          <Grid item xs={16}>
            <div>
              <b> Remarks:</b>
            </div>
            <TextField
              sx={{ mt: 0.5 }}
              autoComplete="off"
              size="small"
              multiline
              rows={2}
              fullWidth
              name="remarks"
              id="remarks"
              value={props.remarks}
              onChange={(e) => {
                props.set_remarks(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={16}></Grid>
          <Grid item xs={16}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BookingCreateModalParticulars;
