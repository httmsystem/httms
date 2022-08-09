import React, { useState, useCallback } from "react";
import "../../index.css";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import MemoTextfield from "../../../component/MemoTextfield";

const BookingAddPassengerModal = (props) => {
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
    fontSize: 13.5,
    flexGrow: 1,
  };
  // NUMBERING PASSENGER
  const no_pass = "PAX" + props.year + "0" + props.rss_length + "-";

  const [passenger_data, set_passenger_data] = useState([]);
  const [num_pax, set_num_pax] = useState(0);

  let add_pax = () => {
    for (var i = 1; i < num_pax; i++) {
      passenger_data.push({
        no: no_pass + i,
        title: "",
        last_name: "",
        first_name: "",
        suffix: "",
        middle_name: "",
        pass_type: "",
        oth_pas_type: "",
        product_service_deploy: [{ no: "" }],
        ticket: [],
        selling: {
          remit_currency: "",
          total_cost_in_php: 0,
          total_cost_in_usd: 0,
          taxes_php: 0,
          taxes_usd: 0,
          ph_tax: 0,
          markup: 0,
          service_fee: 0,
          total_cost_fee: 0,
          selling_price_in_php: 0,
          selling_price_in_usd: 0,
        },
      });
    }
    return set_passenger_data([
      ...passenger_data,
      {
        no: no_pass + i,
        title: "",
        last_name: "",
        first_name: "",
        suffix: "",
        middle_name: "",
        pass_type: "",
        oth_pas_type: "",
        product_service_deploy: [
          {
            no: "",
          },
        ],
        ticket: [],
        selling: {
          remit_currency: "",
          total_cost_in_php: 0,
          total_cost_in_usd: 0,
          taxes_php: 0,
          taxes_usd: 0,
          ph_tax: 0,
          markup: 0,
          service_fee: 0,
          selling_price_in_php: 0,
          selling_price_in_usd: 0,
        },
      },
    ]);
  };

  // FUNCTION ONCHANGE
  let set_passenger_onChange = useCallback(
    (i, e) => {
      let newPassenger = [...passenger_data];
      const newVal = e.target.value;
      const newName = e.target.name;
      newPassenger[i][newName] = newVal;
      set_passenger_data(newPassenger);
    },
    [passenger_data]
  );

  // SET PASSENGER DATA
  // REMOVE PASSENGER DATA
  let remove_passenger_data = (i) => {
    let newFormValues = [...passenger_data];
    newFormValues.splice(i, 1);
    set_passenger_data(newFormValues);
  };

  // ADDING PRODUCT & SERVICES IN LOCAL STORAGE
  let add_passengers = (event) => {
    props.set_passengers([...props.passengers, ...passenger_data]);
  };

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <Grid container spacing={1} columns={16}>
            <Grid item xs={16}>
              OPTIONS
            </Grid>
            <Grid item xs={4}>
              <b>How many passenger do you want to add?</b>
              <div>
                <TextField
                  sx={{ mt: 0.5 }}
                  autoComplete="off"
                  onClick={(e) => e.target.select()}
                  size="small"
                  fullWidth
                  id="outlined-disabled"
                  value={num_pax}
                  onChange={(event) => {
                    set_num_pax(event.target.value);
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={1}>
              <Button
                sx={{ mt: 2.5 }}
                variant="contained"
                onClick={() => {
                  add_pax();
                  // handleDisable();
                }}
              >
                GENERATE
              </Button>
            </Grid>
            <Grid item xs={16}>
              {passenger_data.map((element, index) => (
                <div className="form-inline" key={index}>
                  <Grid container spacing={1} columns={17}>
                    <Grid item xs={1.5}>
                      <b>Title:</b>
                      <Select
                        sx={{ mt: 0.5 }}
                        size="small"
                        name="title"
                        fullWidth
                        value={element.title}
                        onChange={(e) => set_passenger_onChange(index, e)}
                      >
                        <MenuItem value={"MR."}>MR</MenuItem>
                        <MenuItem value={"MS."}>MS</MenuItem>
                        <MenuItem value={"MSTR."}>MSTR</MenuItem>
                        <MenuItem value={"MIST."}>MIST</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={4}>
                      <b>Last Name:</b>
                      <MemoTextfield
                        sx={{ mt: 0.5 }}
                        name="last_name"
                        value={element.last_name}
                        onChange={(e) => set_passenger_onChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <b>First Name:</b>

                      <MemoTextfield
                        sx={{ mt: 0.5 }}
                        name="first_name"
                        value={element.first_name}
                        onChange={(e) => set_passenger_onChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={1.5}>
                      <b>Suffix:</b>

                      <MemoTextfield
                        sx={{ mt: 0.5 }}
                        name="suffix"
                        value={element.suffix}
                        onChange={(e) => set_passenger_onChange(index, e)}
                      />
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>Middle Name:</b>
                      <MemoTextfield
                        sx={{ mt: 0.5 }}
                        name="middle_name"
                        value={element.middle_name}
                        onChange={(e) => set_passenger_onChange(index, e)}
                      />
                    </Grid>

                    <Grid item xs={1.5}>
                      <b>Passenger</b>
                      <Select
                        sx={{ mt: 0.5 }}
                        size="small"
                        fullWidth
                        onChange={(e) => set_passenger_onChange(index, e)}
                        value={element.pass_type}
                        name="pass_type"
                      >
                        <MenuItem value={"ADT"}>ADT</MenuItem>
                        <MenuItem value={"CHD"}>CHD</MenuItem>
                        <MenuItem value={"INF"}>INF</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={1.5}>
                      <b>Type:</b>
                      <Select
                        sx={{ mt: 0.5 }}
                        size="small"
                        fullWidth
                        onChange={(e) => set_passenger_onChange(index, e)}
                        value={element.oth_pas_type}
                        name="oth_pas_type"
                      >
                        <MenuItem value={"TOURIST"}>TOURIST</MenuItem>
                        <MenuItem value={"SRC"}>SRC</MenuItem>
                        <MenuItem value={"EMI"}>EMI</MenuItem>
                        <MenuItem value={"LBR"}>LBR</MenuItem>
                        <MenuItem value={"SEA"}>SEA</MenuItem>
                        <MenuItem value={"DIS"}>DIS</MenuItem>
                        <MenuItem value={"STU"}>STU</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={0.5}>
                      <IconButton
                        sx={{ mr: 1, mt: 2.5 }}
                        color="error"
                        aria-label="delete"
                        onClick={() => remove_passenger_data(index)}
                      >
                        <Delete />
                      </IconButton>
                    
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                add_passengers();
                props.handleClose();
              }}
              sx={{ mr: 1 }}
            >
              ADD PASSENGER
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={props.handleClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default React.memo(BookingAddPassengerModal);
