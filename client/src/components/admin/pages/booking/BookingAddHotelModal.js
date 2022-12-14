import React from "react";
import PropTypes from "prop-types";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "@mui/lab/DatePicker";
import NumberFormat from "react-number-format";
import {
  Box,
  Button,
  Typography,
  Grid,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
  Divider,
  Modal,
  Autocomplete,
} from "@mui/material";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const BookingAddHotelModal = (props) => {
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

  return (
    <div>
      <Modal
        open={props.openHotel}
        onClose={props.closeHotel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <Grid container spacing={2} columns={16} sx={{ mb: 1 }}>
            {props.products_services_data.map((element, index) => (
              <div key={index}>
                {index === 0 ? (
                  <div>
                    {" "}
                    <Grid container spacing={1.5} columns={16}>
                      <Grid item xs={4}>
                        <div sx={{ mb: 0.5 }}>
                          <b> Supplier: </b>
                        </div>
                        <div>
                          <Autocomplete
                            sx={{ mt: 0.5 }}
                            size="small"
                            options={props.suppliers}
                            getOptionLabel={(option) => option.name}
                            value={element.supplier}
                            onChange={(e, new_supp_data) => {
                              props.set_products_services_data([
                                {
                                  ...element,
                                  supplier: new_supp_data,
                                },
                              ]);
                            }}
                            disablePortal
                            disableClearable
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                autoComplete="off"
                              />
                            )}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={3}>
                        <div>
                          <b> Currency:</b>
                        </div>
                        <Select
                          sx={{ mt: 0.5 }}
                          fullWidth
                          size="small"
                          id="currency"
                          name="currency"
                          value={element.currency}
                          onChange={(e) =>
                            props.set_products_services_data_onChange(e, index)
                          }
                        >
                          <MenuItem size="small" value={"???"}>
                            PHP
                          </MenuItem>
                          <MenuItem size="small" value={"$"}>
                            USD
                          </MenuItem>
                        </Select>
                      </Grid>

                      <Grid item xs={2}>
                        <div>
                          <b> Payment Mode:</b>
                        </div>

                        <Select
                          sx={{ mt: 0.5 }}
                          fullWidth
                          size="small"
                          id="pay_mode"
                          name="pay_mode"
                          value={element.pay_mode}
                          onChange={(e) =>
                            props.set_products_services_data_onChange(e, index)
                          }
                        >
                          <MenuItem value={"CASH/CHECK"}>CASH/CHECK</MenuItem>
                          <MenuItem value={"CREDIT CARD"}>CREDIT CARD</MenuItem>
                          <MenuItem value={"SCCCF"}>SCCCF</MenuItem>
                          <MenuItem value={"WALLET"}>WALLET</MenuItem>
                        </Select>
                      </Grid>
                      {element.pay_mode === "CREDIT CARD" && (
                        <>
                          <Grid item xs={3}>
                            <div>
                              <b> Bank:</b>
                            </div>
                            <Select
                              sx={{ mt: 0.5 }}
                              fullWidth
                              size="small"
                              id="bank"
                              name="bank"
                              value={element.bank}
                              onChange={(e) =>
                                props.set_products_services_data_onChange(
                                  e,
                                  index
                                )
                              }
                            >
                              <MenuItem value={"BPI"}>BPI</MenuItem>
                            </Select>
                          </Grid>
                        </>
                      )}

                      <Grid item xs={4}>
                        <div>
                          <b> Resa:</b>
                        </div>
                        <Autocomplete
                          sx={{ mt: 0.5 }}
                          fullWidth
                          size="small"
                          options={props.user}
                          getOptionLabel={(option) =>
                            option.first_name + " " + option.last_name
                          }
                          value={element.prep_by}
                          onChange={(e, new_resa_data) => {
                            props.set_products_services_data([
                              {
                                ...element,
                                prep_by: {
                                  _id: new_resa_data._id,
                                  first_name: new_resa_data.first_name,
                                  last_name: new_resa_data.last_name,
                                },
                              },
                            ]);
                          }}
                          disablePortal
                          disableClearable
                          renderInput={(params) => <TextField {...params} />}
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
                          value={element.remarks}
                          onChange={(e) =>
                            props.set_products_services_data_onChange(e, index)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ width: "100%" }}>
                      <Box>
                        <Grid item xs={16} sx={{ flexGrow: 1, fontSize: 18 }}>
                          <h4>HOTEL DETAILS </h4>
                        </Grid>
                      </Box>

                      {element.detail.map((elements, indexs) => (
                        <div className="form-inline" key={indexs}>
                          <Grid container spacing={1.5} columns={16}>
                            <Grid item xs={16}>
                              <div>
                                <b> Name of Hotel:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                fullWidth
                                name="hotel_name"
                                value={elements.hotel_name}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <div>
                                <b> Destination:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                fullWidth
                                name="destination"
                                value={elements.destination}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>

                            <Grid item xs={4}>
                              <div>
                                <b> Date From:</b>
                              </div>
                              <LocalizationProvider
                                dateAdapter={DateAdapter}
                                format="DD-MM-YYYY"
                              >
                                <DatePicker
                                  type="date"
                                  openTo="day"
                                  value={elements.date_from}
                                  onChange={(value) => {
                                    let new_set_products_services_data_onChange =
                                      [...props.products_services_data];
                                    new_set_products_services_data_onChange[
                                      index
                                    ].detail[indexs]["date_from"] = value;
                                    props.set_products_services_data(
                                      new_set_products_services_data_onChange
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      name="date"
                                      fullWidth
                                      size="small"
                                      sx={{ mt: 0.5 }}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </Grid>

                            <Grid item xs={4}>
                              <div>
                                <b> Date To:</b>
                              </div>
                              <LocalizationProvider
                                dateAdapter={DateAdapter}
                                format="DD-MM-YYYY"
                              >
                                <DatePicker
                                  type="date"
                                  disablePast
                                  openTo="day"
                                  value={elements.date_to}
                                  onChange={(value) => {
                                    let new_set_products_services_data_onChange =
                                      [...props.products_services_data];
                                    new_set_products_services_data_onChange[
                                      index
                                    ].detail[indexs]["date_to"] = value;
                                    props.set_products_services_data(
                                      new_set_products_services_data_onChange
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      sx={{ mt: 0.5 }}
                                      size="small"
                                      {...params}
                                      name="date"
                                      fullWidth
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </Grid>

                            <Grid item xs={4}>
                              <div>
                                <b> No of Rooms:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                fullWidth
                                name="num_rooms"
                                value={elements.num_rooms}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={16}>
                              <b>{"ITINERARY: "}</b>

                              {element.itinerary}
                            </Grid>

                            <Grid item xs={16}></Grid>
                          </Grid>
                        </div>
                      ))}
                    </Box>
                    <Grid item xs={16} sx={{ flexGrow: 1, fontSize: 18 }}>
                      <h4>HOTEL COSTING </h4>
                    </Grid>{" "}
                  </div>
                ) : null}

                <div className="form-inline">
                  <Typography sx={{ mt: 1, ml: 5 }}></Typography>
                  <Grid container spacing={2} columns={16}>
                    <Grid item xs={5}>
                      <div>
                        <b>Gross</b>
                      </div>
                      <TextField
                        autoComplete="off"
                        onClick={(e) => e.target.select()}
                        size="small"
                        sx={{ mt: 0.5 }}
                        fullWidth
                        name="gross"
                        value={element.costing.gross}
                        onChange={(e) =>
                          props.set_products_services_data_onChange_costing(
                            index,
                            e
                          )
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {element.currency}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <b>Commision %</b>
                      </div>
                      <OutlinedInput
                        autoComplete="off"
                        fullWidth
                        size="small"
                        sx={{ mt: 0.5 }}
                        onClick={(e) => e.target.select()}
                        name="com_percent"
                        value={element.costing.com_percent}
                        onChange={(e) =>
                          props.set_products_services_data_onChange_costing(
                            index,
                            e
                          )
                        }
                        endAdornment={
                          <InputAdornment position="end">%</InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <b>Commision Amount</b>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          backgroundColor: "#ecf0f1",
                          mt: 0.5,
                        }}
                        name="com_amount"
                        value={parseFloat(
                          element.costing.gross *
                            (element.costing.com_percent / 100)
                        )}
                        onChange={(e) =>
                          props.set_products_services_data_onChange_costing(
                            index,
                            e
                          )
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {element.currency}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <b>Net</b>
                      </div>
                      <TextField
                        autoComplete="off"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          backgroundColor: "#ecf0f1",
                          mt: 0.5,
                        }}
                        onClick={(e) => e.target.select()}
                        fullWidth
                        name="net"
                        value={
                          parseFloat(element.costing.gross) -
                          parseFloat(element.costing.com_amount)
                        }
                        onChange={(e) =>
                          props.set_products_services_data_onChange_costing(
                            index,
                            e
                          )
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {element.currency}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                          readOnly: true,
                        }}
                        disabled
                      />
                    </Grid>

                    <Grid item xs={16}>
                      <Divider />
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <b>Cost in PHP</b>
                      </div>
                      <TextField
                        size="small"
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          mt: 0.5,
                          backgroundColor: "#ecf0f1",
                        }}
                        autoComplete="off"
                        onClick={(e) => e.target.select()}
                        fullWidth
                        id="outlined-read-only-input"
                        name="cost_in_php"
                        value={parseFloat(element.costing.cost_in_php).toFixed(
                          2
                        )}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {"???"}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                          readOnly: true,
                        }}
                        onChange={(e) =>
                          props.set_products_services_data_onChange_costing(
                            index,
                            e
                          )
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        <b>Cost in USD</b>
                      </div>
                      <TextField
                        size="small"
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "black",
                          },
                          mt: 0.5,
                          backgroundColor: "#ecf0f1",
                        }}
                        autoComplete="off"
                        onClick={(e) => e.target.select()}
                        fullWidth
                        id="outlined-read-only-input"
                        name="cost_in_usd"
                        value={parseFloat(element.costing.cost_in_usd).toFixed(
                          2
                        )}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {"$"}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                          readOnly: true,
                        }}
                        onChange={(e) =>
                          props.set_products_services_data_onChange_costing(
                            index,
                            e
                          )
                        }
                        disabled
                      />
                    </Grid>
                    <Grid item xs={5}></Grid>
                  </Grid>
                </div>
              </div>
            ))}
          </Grid>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button
                onClick={props.add_product_services}
                variant="contained"
                color="success"
              >
                Saved
              </Button>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={props.closeHotel}
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

export default BookingAddHotelModal;
