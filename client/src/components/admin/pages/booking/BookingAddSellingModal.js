import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import NumberFormat from "react-number-format";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Modal,
  Box,
  IconButton,
  Tooltip,
  Checkbox,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

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
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const BookingAddSellingModal = (props) => {
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

  const [sell_amt, set_sell_amt] = useState(0);
  const [serv_fee, set_serv_fee] = useState(0);
  const [ph_tax, set_ph_tax] = useState(0);

  const [isCheckAll, setIsCheckAll] = useState(false);

  let set_passenger_selling_onChange = (i, e) => {
    let newPassenger = [...props.passengers];
    newPassenger[i]["selling"][e.target.name] = parseFloat(e.target.value);
    props.set_passengers(newPassenger);
  };

  // CHECKBOX FUNCTION SELECT ALL
  const handleSelectAll = (i, e) => {
    const prod_serv_isChecked = e.target.checked;
    let passenger_data_set = [...props.passengers];
    // DEPLOYMENT OF DATA VALUE FOR PRODUCT & SERVICES

    if (props.remit_cur === "$") {
      passenger_data_set[i].selling = {
        remit_currency: props.remit_cur,
        selling_price_in_usd: parseFloat(sell_amt),
        selling_price_in_php: parseFloat(
          parseFloat(sell_amt) * parseFloat(props.acr.rate)
        ).toFixed(3),
        service_fee: parseFloat(serv_fee),
        ph_tax: parseFloat(ph_tax),
      };
      props.set_passengers(passenger_data_set);
    } else if (props.remit_cur === "₱") {
      passenger_data_set[i].selling = {
        remit_currency: props.remit_cur,
        selling_price_in_php: parseFloat(sell_amt),
        selling_price_in_usd: parseFloat(
          parseFloat(sell_amt) / parseFloat(props.acr.rate)
        ),
        service_fee: parseFloat(serv_fee),
        ph_tax: parseFloat(ph_tax),
      };
      props.set_passengers(passenger_data_set);
    }
    if (prod_serv_isChecked) {
      setIsCheckAll(!isCheckAll);
      passenger_data_set[i].product_service_deploy = [];
      passenger_data_set[i].product_service_deploy = props.products_services
        .map((e) => {
          return {
            no: e.no,
            supplier_no: e.supplier._id,
            currency: e.currency,
            travel_tax: e.costing.travel_tax,
            taxes_total_usd: e.costing.taxes_total_usd,
            taxes_total_php: e.costing.taxes_total_php,
            cost_in_php: e.costing.cost_in_php,
            cost_in_usd: e.costing.cost_in_usd,
            qty: 1,
          };
        })
        .flat();
      props.set_passengers(passenger_data_set);
      // COMPUTATION OF TOTAL COST IN PHP
      const prod_serv_total_cost_php = passenger_data_set[
        i
      ].product_service_deploy.reduce(
        (total, passenger) => total + parseFloat(passenger.cost_in_php),
        0
      );
      // COMPUTATION OF TOTAL COST IN USD
      const prod_serv_total_cost_usd = passenger_data_set[
        i
      ].product_service_deploy.reduce(
        (total, passenger) => total + parseFloat(passenger.cost_in_usd),
        0
      );
      passenger_data_set[i]["selling"]["total_cost_in_php"] =
        prod_serv_total_cost_php;
      passenger_data_set[i]["selling"]["total_cost_in_usd"] =
        prod_serv_total_cost_usd;

      // COMPUTATION OF TAXES IN PHP
      const taxes_php = passenger_data_set[i].product_service_deploy.reduce(
        (total, passenger) => total + parseFloat(passenger.taxes_total_php),
        0
      );

      // COMPUTATION OF TAXES IN USD
      const taxes_usd = passenger_data_set[i].product_service_deploy.reduce(
        (total, passenger) => total + parseFloat(passenger.taxes_total_usd),
        0
      );
      passenger_data_set[i]["selling"]["taxes_php"] = taxes_php;
      passenger_data_set[i]["selling"]["taxes_usd"] = taxes_usd;

      var ticket = [];

      ticket.push(
        props.products_services
          .filter((type) => type.prod_serv_type === "FLIGHT")
          .map((e) => {
            return {
              products_services_no: e.no,
              itinerary: e.itinerary,
              ticket_data: [
                {
                  ticket_no: null,
                  ticket_type: "",
                },
              ],
            };
          })
          .flat()
      );

      ticket.push(
        props.products_services
          .filter((type) => type.prod_serv_type === "BAGGAGE")
          .map((e) => {
            return {
              products_services_no: e.no,
              itinerary: e.itinerary,
              ticket_data: [
                {
                  ticket_no: null,
                  ticket_type: "",
                },
              ],
            };
          })
          .flat()
      );
      passenger_data_set[i].ticket = ticket.flat();
      props.set_passengers(passenger_data_set);
    } else {
      passenger_data_set[i].product_service_deploy = [];
      passenger_data_set[i].ticket = [];

      // REMOVE PRODUCT & SERVICES REDUCE TOTAL COST IN PHP
      const prod_serv_total_cost_php = passenger_data_set[
        i
      ].product_service_deploy.reduce(
        (total, passenger) => total + parseFloat(passenger.cost_in_php),
        0
      );
      // REMOVE PRODUCT & SERVICES REDUCE TOTAL COST IN USD
      const prod_serv_total_cost_usd = passenger_data_set[
        i
      ].product_service_deploy.reduce(
        (total, passenger) => total + parseFloat(passenger.cost_in_usd),
        0
      );

      passenger_data_set[i]["selling"]["total_cost_in_php"] =
        prod_serv_total_cost_php;
      passenger_data_set[i]["selling"]["total_cost_in_usd"] =
        prod_serv_total_cost_usd;

      props.set_passengers(passenger_data_set);
    }
  };

  // DELETE PRODUCT AND SERVICE FOR EACH PASSENGER THAT SELECT
  const del_pass_prod_serv = (i, id) => {
    let passenger_data_set = [...props.passengers];

    // REMOVE PRODUCT & SERVICES
    const prod_serv_remove_checked_index = passenger_data_set[
      i
    ].product_service_deploy.findIndex((object) => {
      return object.no === id;
    });
    passenger_data_set[i].product_service_deploy.splice(
      prod_serv_remove_checked_index,
      1
    );
    props.set_passengers(passenger_data_set);

    // REMOVE TICKET
    const prod_serv_remove_checked_index_ticket = passenger_data_set[
      i
    ].ticket.findIndex((object) => {
      return object.no === id;
    });
    passenger_data_set[i].ticket.splice(
      prod_serv_remove_checked_index_ticket,
      1
    );

    props.set_passengers(passenger_data_set);
    // REMOVE PRODUCT & SERVICES REDUCE TOTAL COST IN PHP
    const prod_serv_total_cost_php = passenger_data_set[
      i
    ].product_service_deploy.reduce(
      (total, passenger) => total + parseFloat(passenger.cost_in_php),
      0
    );
    // REMOVE PRODUCT & SERVICES REDUCE TOTAL COST IN USD
    const prod_serv_total_cost_usd = passenger_data_set[
      i
    ].product_service_deploy.reduce(
      (total, passenger) => total + parseFloat(passenger.cost_in_usd),
      0
    );

    passenger_data_set[i]["selling"]["total_cost_in_php"] =
      prod_serv_total_cost_php;
    passenger_data_set[i]["selling"]["total_cost_in_usd"] =
      prod_serv_total_cost_usd;

    // COMPUTATION OF TAXES IN PHP
    const taxes_php = passenger_data_set[i].product_service_deploy.reduce(
      (total, passenger) => total + parseFloat(passenger.taxes_total_php),
      0
    );

    // COMPUTATION OF TAXES IN USD
    const taxes_usd = passenger_data_set[i].product_service_deploy.reduce(
      (total, passenger) => total + parseFloat(passenger.taxes_total_usd),
      0
    );
    passenger_data_set[i]["selling"]["taxes_php"] = taxes_php;
    passenger_data_set[i]["selling"]["taxes_usd"] = taxes_usd;
    props.set_passengers(passenger_data_set);
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
          <Grid container spacing={0.5} columns={16}>
            <Grid item xs={16}>
              GLOBAL OPTIONS
            </Grid>

            <Grid item xs={16}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={1} columns={16}>
                    <Grid item xs={4}>
                      <b>What currency do want to sell?</b>
                      <div>
                        <Select
                          sx={{ mt: 0.5 }}
                          onClick={(e) => e.target.select()}
                          size="small"
                          fullWidth
                          onChange={(e) => props.set_remit_cur(e.target.value)}
                          value={props.remit_cur}
                          id="remit_cur"
                          name="remit_cur"
                        >
                          <MenuItem value={"₱"}>₱ - PHP</MenuItem>
                          <MenuItem value={"$"}>$ - USD</MenuItem>
                        </Select>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <b>PH/PV Tax:</b>

                      <TextField
                        sx={{
                          mt: 0.5,
                        }}
                        size="small"
                        autoComplete="off"
                        fullWidth
                        onClick={(e) => e.target.select()}
                        value={parseFloat(ph_tax).toFixed(2)}
                        name="ph_tax"
                        onChange={(e) => set_ph_tax(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {props.remit_cur}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <b>Selling Amount</b>
                      <div>
                        <TextField
                          sx={{ mt: 0.5 }}
                          autoComplete="off"
                          onClick={(e) => e.target.select()}
                          size="small"
                          onChange={(e) => set_sell_amt(e.target.value)}
                          value={parseFloat(sell_amt).toFixed(2)}
                          fullWidth
                          name="sell_amt"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {props.remit_cur}
                              </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <b>Service Fee</b>

                      <TextField
                        sx={{ mt: 0.5 }}
                        autoComplete="off"
                        size="small"
                        onClick={(e) => e.target.select()}
                        onChange={(e) => set_serv_fee(e.target.value)}
                        value={parseFloat(serv_fee).toFixed(2)}
                        fullWidth
                        name="service_fee"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {props.remit_cur}{" "}
                            </InputAdornment>
                          ),
                          inputComponent: NumberFormatCustom,
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={16}></Grid>
            <Grid item xs={16} sx={{ fontSize: 16 }}>
              <b>PASSENGER LIST</b>
            </Grid>
            <Grid item xs={16}></Grid>
            {props.passengers.map((element, index) => (
              <Grid item xs={16}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={0.5} columns={16}>
                      <Grid item xs={16} sx={{ fontSize: 18 }}>
                        <b>
                          {" "}
                          {element.title +
                            " " +
                            element.last_name +
                            ", " +
                            element.first_name +
                            " " +
                            element.suffix +
                            " " +
                            element.middle_name}
                        </b>
                      </Grid>
                      <Grid item xs={16}>
                        <Divider />
                      </Grid>
                      <Grid item xs={16}>
                        {props.products_services.length < 1 ? (
                          <div>NO PRODUCT HAS BEEN ADDED</div>
                        ) : (
                          <b>Click a box to load product & services</b>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={16}>
                      {props.products_services.length > 0 && (
                        <Grid container columns={16}>
                          <Grid item xs={1}>
                            <Checkbox
                              value={index}
                              onClick={(e) => handleSelectAll(index, e)}
                            />
                          </Grid>

                          <Grid item xs={4} sx={{ mt: 1.5 }}>
                            <b>PRODUCT ITEM</b>
                          </Grid>

                          <Grid item xs={4} sx={{ mt: 1.5 }}>
                            <b>SUPPLIER</b>
                          </Grid>

                          <Grid item xs={4} sx={{ mt: 1.5 }}>
                            <b>COST IN PHP</b>
                          </Grid>
                          <Grid item xs={3} sx={{ mt: 1.5 }}>
                            <b>COST IN USD</b>
                          </Grid>

                          {element.product_service_deploy.map((ee) => {
                            return (
                              <>
                                {props.products_services
                                  .filter((type) => type.no === ee.no)
                                  .map((elements, indexs) => {
                                    return (
                                      <>
                                        <Grid item xs={1}>
                                          <Tooltip
                                            arrow
                                            title="Remove"
                                            placement="top-start"
                                          >
                                            <IconButton
                                              color="error"
                                              aria-label="edit"
                                              onClick={() =>
                                                del_pass_prod_serv(
                                                  index,
                                                  elements.no
                                                )
                                              }
                                            >
                                              <Delete />
                                            </IconButton>
                                          </Tooltip>
                                        </Grid>
                                        <Grid item xs={15}>
                                          <Grid container columns={15}>
                                            {" "}
                                            <Grid item xs={4}>
                                              {elements.prod_serv_type}
                                            </Grid>
                                            <Grid item xs={4}>
                                              {elements.supplier.name}
                                            </Grid>
                                            <Grid item xs={4}>
                                              <NumberFormat
                                                value={parseFloat(
                                                  elements.costing.cost_in_php
                                                ).toFixed(2)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"₱"}
                                              />
                                            </Grid>
                                            <Grid item xs={3}>
                                              <NumberFormat
                                                value={parseFloat(
                                                  elements.costing.cost_in_usd
                                                ).toFixed(2)}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              xs={15}
                                              sx={{ fontSize: 12 }}
                                            >
                                              <b>
                                                ITINERARY: {elements.itinerary}
                                              </b>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item xs={16}></Grid>
                                        <Grid item xs={16}></Grid>
                                      </>
                                    );
                                  })}
                              </>
                            );
                          })}

                          {props.remit_cur === "$" ? (
                            <>
                              <Grid item xs={2.28}>
                                <b>Fare:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    backgroundColor: "#ecf0f1",
                                    mt: 0.5,
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={parseFloat(
                                    parseFloat(
                                      element.selling.total_cost_in_usd
                                    ) -
                                      parseFloat(element.selling.taxes_usd) -
                                      parseFloat(element.selling.ph_tax)
                                  ).toFixed(2)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>Taxes:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={parseFloat(
                                    element.selling.taxes_usd
                                  ).toFixed(2)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>PH/PV Tax:</b>

                                <TextField
                                  onClick={(e) => e.target.select()}
                                  sx={{
                                    mt: 0.5,
                                  }}
                                  size="small"
                                  autoComplete="off"
                                  fullWidth
                                  value={parseFloat(
                                    element.selling.ph_tax
                                  ).toFixed(2)}
                                  name="ph_tax"
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>Total Fare:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={parseFloat(
                                    element.selling.total_cost_in_usd
                                  ).toFixed(2)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>Markup:</b>

                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  fullWidth
                                  disabled
                                  name="markup"
                                  value={parseFloat(
                                    parseFloat(
                                      element.selling.selling_price_in_usd
                                    ) -
                                      parseFloat(
                                        element.selling.total_cost_in_usd
                                      ) -
                                      parseFloat(element.selling.service_fee)
                                  ).toFixed(3)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={2.28}>
                                <b>Fare:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={parseFloat(
                                    parseFloat(
                                      element.selling.total_cost_in_php
                                    ) -
                                      parseFloat(element.selling.taxes_php) -
                                      parseFloat(element.selling.ph_tax)
                                  ).toFixed(2)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>Taxes:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={parseFloat(
                                    element.selling.taxes_php
                                  ).toFixed(2)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>PH/PV Tax:</b>

                                <TextField
                                  onClick={(e) => e.target.select()}
                                  sx={{
                                    mt: 0.5,
                                  }}
                                  size="small"
                                  autoComplete="off"
                                  fullWidth
                                  name="ph_tax"
                                  value={parseFloat(
                                    element.selling.ph_tax
                                  ).toFixed(2)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>Total Fare:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  value={parseFloat(
                                    element.selling.total_cost_in_php
                                  ).toFixed(2)}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                              <Grid item xs={2.28}>
                                <b>Markup:</b>
                                <TextField
                                  sx={{
                                    "& .MuiInputBase-input.Mui-disabled": {
                                      WebkitTextFillColor: "black",
                                    },
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  autoComplete="off"
                                  size="small"
                                  disabled
                                  fullWidth
                                  name="markup"
                                  value={parseFloat(
                                    parseFloat(
                                      element.selling.selling_price_in_php
                                    ) -
                                      parseFloat(
                                        element.selling.total_cost_in_php
                                      ) -
                                      parseFloat(element.selling.service_fee)
                                  ).toFixed(3)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          )}

                          <Grid item xs={2.28}>
                            <b>Service Fee:</b>
                            <TextField
                              sx={{
                                "& .MuiInputBase-input.Mui-disabled": {
                                  WebkitTextFillColor: "black",
                                },
                                mt: 0.5,
                                backgroundColor: "#ecf0f1",
                              }}
                              autoComplete="off"
                              size="small"
                              disabled
                              fullWidth
                              value={parseFloat(
                                element.selling.service_fee
                              ).toFixed(2)}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    {props.remit_cur}
                                  </InputAdornment>
                                ),
                                inputComponent: NumberFormatCustom,
                              }}
                              variant="outlined"
                            />
                          </Grid>

                          {props.remit_cur === "$" ? (
                            <>
                              <Grid item xs={2.28}>
                                <b>Selling Price:</b>

                                <TextField
                                                          onClick={(e) => e.target.select()}

                                  sx={{
                                    mt: 0.5,
                                    backgroundColor: "#ecf0f1",
                                  }}
                                  size="small"
                                  autoComplete="off"
                                  fullWidth
                                  name="selling_price_in_usd"
                                  value={parseFloat(
                                    element.selling.selling_price_in_usd
                                  ).toFixed(2)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>

                              <Grid item xs={2.28} style={{ display: "none" }}>
                                <TextField
                                  size="small"
                                  disabled
                                  fullWidth
                                  name="selling_price_in_php"
                                  value={parseFloat(
                                    parseFloat(
                                      element.selling.selling_price_in_usd
                                    ) * parseFloat(props.acr.rate)
                                  ).toFixed(3)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  label="Selling Price"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {"₱"}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>
                            </>
                          ) : (
                            <>
                              <Grid item xs={2.28}>
                                <b>Selling Price:</b>
                                <TextField
                                                          onClick={(e) => e.target.select()}

                                  sx={{
                                    mt: 0.5,
                                  }}
                                  size="small"
                                  autoComplete="off"
                                  fullWidth
                                  name="selling_price_in_php"
                                  value={parseFloat(
                                    element.selling.selling_price_in_php
                                  ).toFixed(2)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {props.remit_cur}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                />
                              </Grid>

                              <Grid item xs={2.28} style={{ display: "none" }}>
                                <TextField
                                  disabled
                                  fullWidth
                                  name="selling_price_in_usd"
                                  value={parseFloat(
                                    parseFloat(
                                      element.selling.selling_price_in_php
                                    ) / parseFloat(props.acr.rate)
                                  ).toFixed(3)}
                                  onChange={(e) =>
                                    set_passenger_selling_onChange(index, e)
                                  }
                                  label="Selling Price"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {"$"}
                                      </InputAdornment>
                                    ),
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  variant="outlined"
                                  sx={{ mt: 3 }}
                                />
                              </Grid>
                            </>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                props.handleClose();
              }}
              sx={{ mr: 1 }}
            >
              SAVED
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingAddSellingModal;
