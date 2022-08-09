import React from "react";
import { Delete } from "@mui/icons-material";
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
  Autocomplete,
  TextField,
  OutlinedInput,
  InputAdornment,
  Divider,
  IconButton,
  Tooltip,
  Modal,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

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

const BookingAddFlightModal = (props) => {
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
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          {/* {JSON.stringify(props.products_services_data)} */}
          <Grid container spacing={2} columns={16} sx={{ mb: 1 }}>
            <Grid item xs={16}></Grid>
          </Grid>
          {props.products_services_data.map((element, index) => (
            <div key={index}>
              <Grid container spacing={2} columns={16}>
                {index === 0 ? (
                  <div>
                    <Grid container spacing={1.5} columns={16}>
                      <Grid item xs={3.5}>
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
                      <Grid item xs={1.5}>
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
                          <Grid item xs={1.5}>
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

                      <Grid item xs={2}>
                        <div>
                          <b> Record Locator:</b>
                        </div>
                        <TextField
                          sx={{ mt: 0.5 }}
                          autoComplete="off"
                          onClick={(e) => e.target.select()}
                          fullWidth
                          size="small"
                          variant="outlined"
                          name="rec_loc"
                          id="rec_loc"
                          value={element.rec_loc}
                          onChange={(e) =>
                            props.set_products_services_data_onChange(e, index)
                          }
                        />
                      </Grid>
                      <Grid item xs={1.5}>
                        <div>
                          <b> Journey Type:</b>
                        </div>
                        <Select
                          sx={{ mt: 0.5 }}
                          id="jour_type"
                          name="jour_type"
                          fullWidth
                          size="small"
                          value={element.jour_type}
                          onChange={(e) =>
                            props.set_products_services_data_onChange(e, index)
                          }
                        >
                          <MenuItem value={"OW"}>OW</MenuItem>
                          <MenuItem value={"RT"}>RT</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={2}>
                        <div>
                          <b> Validating Carrier:</b>
                        </div>
                        <TextField
                          sx={{ mt: 0.5 }}
                          size="small"
                          autoComplete="off"
                          onClick={(e) => e.target.select()}
                          fullWidth
                          variant="outlined"
                          name="valid_carrier"
                          id="valid_carrier"
                          value={element.valid_carrier}
                          onChange={(e) =>
                            props.set_products_services_data_onChange(e, index)
                          }
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <div>
                          <b> Ticketed By:</b>
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
                          onChange={(e, new_ticketed_data) => {
                            props.set_products_services_data([
                              {
                                ...element,
                                prep_by: {
                                  _id: new_ticketed_data._id,
                                  first_name: new_ticketed_data.first_name,
                                  last_name: new_ticketed_data.last_name,
                                },
                              },
                            ]);
                          }}
                          disablePortal
                          disableClearable
                          renderInput={(params) => (
                            <TextField {...params} size="small" />
                          )}
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
                          <h4>FLIGHT DETAILS </h4>
                        </Grid>
                      </Box>

                      {element.detail.map((elements, indexs) => (
                        <div className="form-inline" key={indexs}>
                          <Grid container spacing={1} columns={16}>
                            {/* // DO NOT REMOVE */}
                            {/* {indexs ? (
                              <Grid item xs={2}>
                                <div>
                                  <b> Route Class:</b>
                                </div>
                                <Select
                                  fullWidth
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  name="route_class"
                                  value={elements.route_class}
                                  onChange={(e) =>
                                    props.set_products_services_data_onChange_detail(
                                      index,
                                      e,
                                      indexs
                                    )
                                  }
                                >
                                  <MenuItem value={""}>NONE</MenuItem>
                                  <MenuItem value={"VIA"}>VIA</MenuItem>
                                  <MenuItem value={"SURFACE"}>SURFACE</MenuItem>
                                </Select>
                              </Grid>
                            ) : null} */}

                            <Grid item xs={1.5}>
                              <div>
                                <b> Airline Code:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                autoComplete="off"
                                fullWidth
                                name="airline"
                                value={elements.airline}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                                inputProps={{ maxLength: 4 }}
                              />
                            </Grid>

                            <Grid item xs={2}>
                              <div>
                                <b> Flight No:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                autoComplete="off"
                                fullWidth
                                name="flight_no"
                                value={elements.flight_no}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>

                            <Grid item xs={1.5}>
                              <div>
                                <b> Class:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                autoComplete="off"
                                fullWidth
                                name="class"
                                value={elements.class}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <div>
                                <b> Date:</b>
                              </div>
                              <LocalizationProvider
                                dateAdapter={DateAdapter}
                                format="DD-MM-YYYY"
                              >
                                <DatePicker
                                  sx={{ mt: 0.5 }}
                                  size="small"
                                  fullWidth
                                  type="date"
                                  openTo="day"
                                  value={elements.date}
                                  onChange={(value) => {
                                    let new_set_products_services_data_onChange =
                                      [...props.products_services_data];
                                    new_set_products_services_data_onChange[
                                      index
                                    ].detail[indexs]["date"] = value;
                                    props.set_products_services_data(
                                      new_set_products_services_data_onChange
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      sx={{ mt: 0.5 }}
                                      size="small"
                                      {...params}
                                      fullWidth
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2.5}>
                              <div>
                                <b> From:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                autoComplete="off"
                                fullWidth
                                name="route_from"
                                value={elements.route_from}
                                inputProps={{ maxLength: 4 }}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={2.5}>
                              <div>
                                <b> To:</b>
                              </div>
                              <TextField
                                sx={{ mt: 0.5 }}
                                size="small"
                                autoComplete="off"
                                fullWidth
                                name="route_to"
                                value={elements.route_to}
                                inputProps={{ maxLength: 4 }}
                                onChange={(e) =>
                                  props.set_products_services_data_onChange_detail(
                                    index,
                                    e,
                                    indexs
                                  )
                                }
                              />
                            </Grid>

                            {indexs ? (
                              <Grid item xs={1}>
                                <IconButton
                                  sx={{ mr: 1, mt: 2.5 }}
                                  color="error"
                                  aria-label="delete"
                                  onClick={() =>
                                    props.remove_detail(index, indexs)
                                  }
                                >
                                  <Delete />
                                </IconButton>
                              </Grid>
                            ) : null}

                            <Grid item xs={16}></Grid>
                          </Grid>
                        </div>
                      ))}

                      <Grid item xs={2.5}>
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => props.add_detail(index)}
                          margin="dense"
                        >
                          ADD ROUTE
                        </Button>
                      </Grid>
                    </Box>
                    <Grid item xs={16} sx={{ flexGrow: 1, fontSize: 18 }}>
                      <h4>FLIGHT COSTING </h4>
                    </Grid>
                  </div>
                ) : null}

                <div className="form-inline">
                  <Accordion>
                    <AccordionSummary>
                      <Typography style={{ flex: 1 }}>
                        {element.itinerary +
                          " - " +
                          element.costing.travel_tax +
                          " FARE"}
                      </Typography>
                      {index ? (
                        <Tooltip title="Remove Costing">
                          <IconButton
                            color="error"
                            onClick={() => props.remove_cost(index)}
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={2} columns={16}>
                        <Grid item xs={5}>
                          <div>
                            <b>Gross</b>
                          </div>
                          <div>
                            <TextField
                              autoComplete="off"
                              onClick={(e) => e.target.select()}
                              size="small"
                              fullWidth
                              name="gross"
                              sx={{ mt: 0.5 }}
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
                          </div>
                        </Grid>

                        <Grid item xs={5}>
                          <div>
                            <b>Commision %</b>
                          </div>
                          <OutlinedInput
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
                            autoComplete="off"
                            onClick={(e) => e.target.select()}
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
                            id="outlined-read-only-input"
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
                        <Grid item xs={5}>
                          <div>
                            <b>Travel Tax</b>
                          </div>
                          <Select
                            fullWidth
                            size="small"
                            id="travel_tax"
                            name="travel_tax"
                            sx={{ mt: 0.5 }}
                            value={element.costing.travel_tax}
                            onChange={(e) =>
                              props.set_products_services_data_onChange_costing(
                                index,
                                e
                              )
                            }
                          >
                            <MenuItem value={""}>NONE</MenuItem>
                            <MenuItem value={"REG"}>REG</MenuItem>
                            <MenuItem value={"RTT"}>RTT</MenuItem>
                            <MenuItem value={"RTT OFW"}>RTT OFW</MenuItem>
                            <MenuItem value={"TEC"}>TEC</MenuItem>
                            <MenuItem value={"PTA356"}>PTA356</MenuItem>
                            <MenuItem value={"EXEMPT"}>EXEMPT</MenuItem>
                          </Select>
                        </Grid>

                        <Grid item xs={6}>
                          <div>
                            <b>Ph Tax</b>
                          </div>
                          <TextField
                            size="small"
                            sx={{ mt: 0.5 }}
                            autoComplete="off"
                            onClick={(e) => e.target.select()}
                            fullWidth
                            name="ph_tax"
                            id="outlined-read-only-input"
                            value={element.costing.ph_tax}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {element.currency}
                                </InputAdornment>
                              ),
                              inputComponent: NumberFormatCustom,
                            }}
                            onChange={(e) =>
                              props.set_products_services_data_onChange_costing(
                                index,
                                e
                              )
                            }
                          />
                        </Grid>
                        <Grid item xs={5} className="taxesClass">
                          <div className="taxesClass">
                            <div>
                              {" "}
                              <b>Taxes</b>{" "}
                            </div>
                            {element.costing.taxes.map((elementss, indexss) => (
                              <div className="form-inline" key={indexss}>
                                <TextField
                                  size="small"
                                  autoComplete="off"
                                  onClick={(e) => e.target.select()}
                                  name="taxes"
                                  value={elementss.taxes}
                                  onChange={(e) =>
                                    props.set_taxes_onChange(index, e, indexss)
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

                                {indexss ? (
                                  <Tooltip title="Remove">
                                    <IconButton
                                      sx={{ ml: 1 }}
                                      color="error"
                                      aria-label="delete"
                                      onClick={() =>
                                        props.remove_taxes(
                                          index,

                                          indexss
                                        )
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Tooltip>
                                ) : null}
                              </div>
                            ))}

                            <div className="button-section">
                              <Button
                                variant="outlined"
                                // startIcon={<AccountBalance />}
                                onClick={() => props.add_taxes(index)}
                              >
                                Add More Taxes
                              </Button>
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={5}>
                          <div>
                            <b>Total Tax</b>
                          </div>
                          <TextField
                            size="small"
                            sx={{
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "black",
                              },
                              backgroundColor: "#ecf0f1",
                              mt: 0.5,
                            }}
                            autoComplete="off"
                            onClick={(e) => e.target.select()}
                            fullWidth
                            name="total_taxes"
                            value={
                              parseFloat(element.costing.ph_tax) +
                              parseFloat(element.costing.taxes_total)
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
                            onChange={(e) =>
                              props.set_products_services_data_onChange_costing(
                                index,
                                e
                              )
                            }
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
                            value={parseFloat(
                              element.costing.cost_in_php
                            ).toFixed(2)}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {"₱"}
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
                            value={parseFloat(
                              element.costing.cost_in_usd
                            ).toFixed(2)}
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
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </div>
          ))}

          <Grid item xs={5}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => props.add_new_cost()}
            >
              ADD ANOTHER COSTING WITH SAME DETAILS
            </Button>
          </Grid>

          <Box sx={{ display: "flex", mt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button
                color="success"
                onClick={props.add_product_services}
                variant="contained"
              >
                Saved
              </Button>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={props.onClose}
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

export default BookingAddFlightModal;
