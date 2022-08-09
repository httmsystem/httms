import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import {
  Box,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
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

const BookingAddOtherModal = (props) => {
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
        open={props.openOther}
        onClose={props.closeOther}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          {props.products_services_data.map((element, index) => (
            <div key={index}>
              {index === 0 ? (
                <div>
                  {" "}
                  <Grid container spacing={1.5} columns={16}>
                    <Grid item xs={5}>
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
                    <Grid item xs={2}>
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
                        <MenuItem size="small" value={"₱"}>
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
                        <Grid item xs={2}>
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

                    <Grid item xs={5}>
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
                        <b> Details:</b>
                      </div>
                      <TextField
                        sx={{ mt: 0.5 }}
                        fullWidth
                        size="small"
                        name="itinerary"
                        id="itinerary"
                        value={element.itinerary}
                        onChange={(e) =>
                          props.set_products_services_data_onChange(e, index)
                        }
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
                  <Grid item xs={16} sx={{ flexGrow: 1, fontSize: 18 }}>
                    <h4>{props.prod_serv_type} COSTING </h4>
                  </Grid>{" "}
                </div>
              ) : null}

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
                    <b>Net</b>
                  </div>
                  <TextField
                    autoComplete="off"
                    size="small"
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                      mt: 0.5,
                      backgroundColor: "#ecf0f1",
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
                    value={parseFloat(element.costing.cost_in_php).toFixed(2)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{"₱"}</InputAdornment>
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
                    value={parseFloat(element.costing.cost_in_usd).toFixed(2)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{"$"}</InputAdornment>
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
          ))}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }}>
              <Button onClick={props.add_product_services} color="success" variant="contained">
                Saved
              </Button>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={props.closeOther}
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

export default BookingAddOtherModal;
