import React from "react";
import NumberFormat from "react-number-format";

import { Box, Typography, Grid, Divider } from "@mui/material";
import { ReportProblem } from "@mui/icons-material";
import moment from "moment";

export const BookingCreateModalPrint = React.forwardRef((props, ref) => {
  //  FLIGHT DETAILS
  const flight_detail = [...props.products_services]
    .filter((type) => type.prod_serv_type === "FLIGHT")
    .map((e) => {
      return e.detail.map((ee) => {
        return ee;
      });
    })
    .flat()
    .slice()
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  const obj_flight = [
    ...new Map(
      flight_detail.map((item) => [JSON.stringify(item), item])
    ).values(),
  ];

  // HOTEL DETAILS
  const hotel_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "HOTEL")
    .map((e) => {
      return e;
    })
    .flat()
    .slice();
  const hotel_detail = [...props.products_services]
    .filter((type) => type.prod_serv_type === "HOTEL")
    .map((e) => {
      return e.detail.map((ee) => {
        return ee;
      });
    })
    .flat()
    .slice();

  const obj_hotel = [
    ...new Map(
      hotel_detail.map((item) => [JSON.stringify(item), item])
    ).values(),
  ];

  // CRUISE DETAILS
  const cruise_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "CRUISE")
    .map((e) => {
      return e;
    })
    .flat()
    .slice();
  const cruise_detail = [...props.products_services]
    .filter((type) => type.prod_serv_type === "CRUISE")
    .map((e) => {
      return e.detail.map((ee) => {
        return ee;
      });
    })
    .flat()
    .slice();

  const obj_cruise = [
    ...new Map(
      cruise_detail.map((item) => [JSON.stringify(item), item])
    ).values(),
  ];

  // SHOREX DETAILS
  const shorex_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "SHOREX")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  CITY TOUR DETAILS
  const city_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "CITY TOUR")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  THEME PARK DETAILS
  const theme_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "THEME PARK")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  BAGGAGE  DETAILS
  const baggage_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "BAGGAGE")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  DOCUMENTATION  DETAILS
  const doc_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "DOCUMENTATION ")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  SEAT REQUEST  DETAILS
  const seat_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "SEAT REQUEST")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  TRANSFER   DETAILS
  const transfer_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "TRANSFER")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  INSURANCE    DETAILS
  const insurance_details = [...props.products_services]
    .filter((type) => type.prod_serv_type === "INSURANCE")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  return (
    <div ref={ref}>
      {/* textTransform: 'uppercase', */}
      <Box sx={{ flexGrow: 1, fontSize: 11.3 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={11}>
            <div>
              <b style={{ fontSize: 23 }}>HORIZON TRAVEL & TOUR, INC.</b>
            </div>
            <div style={{ fontSize: 20 }}>REQUISITION SLIP</div>
          </Grid>
          <Grid item xs={1.5} sx={{ fontSize: 13 }}>
            <div>RS No: </div>
            <div>Date: </div>
            <div>BK No: </div>
            <div>Ref No: </div>
            <div>ACR:</div>
          </Grid>
          <Grid item xs={3.5} sx={{ fontSize: 13 }}>
            <div> {props.no_rs}</div>
            <div>{moment().format("D-MMM-YYYY")}</div>
            <div>{props.no_booking}</div>
            <div>{props.ref_no === "" ? " - " : props.ref_no} </div>
            <div>
              {props.acr.rate +
                " - " +
                moment(props.acr.date).format("D-MMM-YYYY")}
            </div>
          </Grid>

          {props.customer.customer_type === "WALK IN" ? (
            <Grid item xs={16} sx={{ fontSize: 15 }}>
              <div>
                Misc Name: <b> {props.customer.misc_name}</b>
              </div>
            </Grid>
          ) : (
            <Grid item xs={16} sx={{ fontSize: 15 }}>
              <div>
                Account Name:{" "}
                <b>
                  {" "}
                  {props.customer.acct_data !== null
                    ? props.customer.acct_data.acct_name
                    : ""}
                </b>
              </div>
              <div>
                {" "}
                Address:{" "}
                {props.customer.acct_data !== null
                  ? props.customer.acct_data.address
                  : ""}
              </div>
              <div>
                {" "}
                Contact No:{" "}
                {props.customer.acct_data !== null
                  ? props.customer.acct_data.contact_no
                  : ""}
              </div>
              <div>
                {" "}
                Handler: {props.user.first_name + " " + props.user.last_name}
              </div>
              <div>
                {" "}
                Prepared By:{" "}
                {props.handler.first_name + " " + props.handler.last_name}
              </div>
            </Grid>
          )}
          <Grid item xs={16}>
            <Divider
              sx={{ borderBottomWidth: 1.5, borderColor: "text.primary" }}
            />
          </Grid>
          <Grid item xs={16}>
            <div style={{ fontSize: 16 }}>
              {" "}
              <b>PARTICULARS:</b> TO BILL COST OF {props.particular}
            </div>

            <Divider
              sx={{
                borderBottomWidth: 1.5,
                borderColor: "text.primary",
                mb: 1,
                mt: 1,
              }}
            />

            {/* HOTEL DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "HOTEL"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"HOTEL DETAILS: " + hotel_details[0].itinerary}
                  {obj_hotel.map((e) => {
                    return <>{" + " + e.num_rooms}</>;
                  })}
                </Grid>
              </>
            )}

            {/* CRUISE DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "CRUISE"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"CRUISE DETAILS: " + cruise_details[0].itinerary}
                  {obj_cruise.map((e) => {
                    return <>{" + " + e.type_cabin}</>;
                  })}
                </Grid>
              </>
            )}
            {/* SHOREX DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "SHOREX"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"SHOREX DETAILS: " + shorex_details}
                </Grid>
              </>
            )}

            {/* CITY TOUR DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "CITY TOUR"
            ).length > 0 && (
              <>
                {" "}
                <Grid item xs={16}>
                  {"CITY TOUR DETAILS: " + city_details}
                </Grid>
              </>
            )}

            {/*THEME PARK DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "THEME PARK"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"THEME PARK DETAILS: " + theme_details}
                </Grid>
              </>
            )}

            {/*BAGGAGE  DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "BAGGAGE"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"BAGGAGE  DETAILS: " + baggage_details}
                </Grid>
              </>
            )}

            {/*DOCUMENTATION  DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "DOCUMENTATION"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"DOCUMENTATION  DETAILS: " + doc_details}
                </Grid>
              </>
            )}

            {/*SEAT REQUEST  DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "SEAT REQUEST"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"SEAT REQUEST  DETAILS: " + seat_details}
                </Grid>
              </>
            )}

            {/*TRANSFER   DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "TRANSFER"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"TRANSFER DETAILS: " + transfer_details}
                </Grid>
              </>
            )}

            {/*INSURANCE DETAIL */}
            {props.products_services.filter(
              (type) => type.prod_serv_type === "INSURANCE"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"INSURANCE DETAILS: " + insurance_details}
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{ borderBottomWidth: 1.5, borderColor: "text.primary" }}
            />
          </Grid>

          {/* AIRFARE DETAIL */}
          {props.products_services.filter(
            (type) => type.prod_serv_type === "FLIGHT"
          ).length > 0 && (
            <>
              <Grid item xs={16}>
                <div>FLIGHT DETAILS</div>
              </Grid>
              <Grid item xs={16}>
                <Divider
                  sx={{
                    borderBottomWidth: 1.5,
                    borderColor: "text.primary",
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <b>AIRLINE</b>
              </Grid>
              <Grid item xs={2}>
                <b>FLIGHT NO</b>
              </Grid>
              <Grid item xs={2}>
                <b>CLASS</b>
              </Grid>
              <Grid item xs={3}>
                <b>DATE</b>
              </Grid>
              <Grid item xs={3.5}>
                <b>FROM</b>
              </Grid>
              <Grid item xs={3.5}>
                <b>TO</b>
              </Grid>
              <Grid item xs={16}>
                <Divider
                  sx={{
                    borderBottomWidth: 1.5,
                    borderColor: "text.primary",
                  }}
                />
              </Grid>
              {obj_flight
                .sort((a, b) => (a.date > b.date ? 1 : -1))
                .map((elements, indexs) => {
                  return (
                    <>
                      <Grid item xs={2}>
                        <div>{elements.airline}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>{elements.flight_no}</div>
                      </Grid>
                      <Grid item xs={2}>
                        <div>{elements.class}</div>
                      </Grid>
                      <Grid item xs={3}>
                        <div>{moment(elements.date).format("D-MMM-YYYY")}</div>
                      </Grid>
                      <Grid item xs={3.5}>
                        <div>{elements.route_from}</div>
                      </Grid>
                      <Grid item xs={3.5}>
                        <div>{elements.route_to}</div>
                      </Grid>
                    </>
                  );
                })}

            </>
          )}

          <Grid item xs={16}></Grid>
          <Grid item xs={16} sx={{ fontSize: 20 }}>
            <b>SELLING</b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{ borderBottomWidth: 1.5, borderColor: "text.primary" }}
            />
          </Grid>

          {props.passengers.length < 1 && (
            <Grid item xs={16} sx={{ p: 1, border: "1px solid grey" }}>
              <>
                <Typography sx={{ mt: 2, mb: 3, ml: 3 }}>
                  <ReportProblem sx={{ mr: 3 }} />
                  NO PASSENGER HAS BEEN ADDED
                </Typography>
              </>
            </Grid>
          )}
          {props.passengers.length > 0 && (
            <>
             
              <Grid item xs={16}>
                <Grid
                  container
                  spacing={1}
                  columns={16}
                  alignItems="center"
                  justifyContent="center"
                >
                  {" "}
                  <Grid item xs={4.5}>
                    <b>NAME</b>
                  </Grid>
                  <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                    <b>FARE</b>
                  </Grid>
                  <Grid item xs={1.7} sx={{ textAlign: "center" }}>
                    <b>TAXES</b>
                  </Grid>
                  <Grid item xs={2.1} sx={{ textAlign: "center" }}>
                    <b>PH/PV TAX </b>
                  </Grid>
                  <Grid item xs={1.8} sx={{ textAlign: "center" }}>
                    <b>TOTAL FARE </b>
                  </Grid>
                  <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                    <b>SERVICE FEE </b>
                  </Grid>
                  <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                    <b>TOTAL AMOUNT</b>
                  </Grid>
                  <Grid item xs={16}>
                    <Divider
                      sx={{
                        borderBottomWidth: 1.5,
                        borderColor: "text.primary",
                      }}
                    />
                  </Grid>
                  {props.passengers.map((element, index) => {
                    return (
                      <>
                        <Grid item xs={4.5}>
                          <div>
                            {index +
                              1 +
                              ". " +
                              element.title +
                              " " +
                              element.last_name +
                              ", " +
                              element.first_name +
                              " " +
                              element.suffix +
                              " " +
                              element.middle_name}
                          </div>
                        </Grid>
                        {/* FARE */}
                        <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                          {element.selling.remit_currency === "$" ? (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  parseFloat(
                                    element.selling.total_cost_in_usd
                                  ) -
                                    parseFloat(element.selling.taxes_usd) -
                                    parseFloat(element.selling.ph_tax) +
                                    parseFloat(element.selling.markup)
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          ) : (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  parseFloat(
                                    element.selling.total_cost_in_php
                                  ) -
                                    parseFloat(element.selling.taxes_php) -
                                    parseFloat(element.selling.ph_tax) +
                                    parseFloat(element.selling.markup)
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          )}
                        </Grid>
                        {/* TAXES */}
                        <Grid item xs={1.7} sx={{ textAlign: "center" }}>
                          {element.selling.remit_currency === "$" ? (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  element.selling.taxes_usd
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          ) : (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  element.selling.taxes_php
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          )}
                        </Grid>
                        {/* PH/PV TAX */}
                        <Grid item xs={2.1} sx={{ textAlign: "center" }}>
                          <div>
                            {element.selling.remit_currency === "$" ? (
                              <b>
                                <NumberFormat
                                  value={parseFloat(
                                    element.selling.ph_tax
                                  ).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={element.selling.remit_currency}
                                />{" "}
                                | {element.product_service_deploy[0].travel_tax}
                              </b>
                            ) : (
                              <b>
                                <NumberFormat
                                  value={parseFloat(
                                    element.selling.ph_tax
                                  ).toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={element.selling.remit_currency}
                                />
                                {" | " +
                                  element.product_service_deploy[0].travel_tax}
                              </b>
                            )}
                          </div>
                        </Grid>
                        {/* TOTAL FARE */}
                        <Grid item xs={1.8} sx={{ textAlign: "center" }}>
                          {element.selling.remit_currency === "$" ? (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  parseFloat(
                                    element.selling.total_cost_in_usd
                                  ) + parseFloat(element.selling.markup)
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          ) : (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  parseFloat(
                                    element.selling.total_cost_in_php
                                  ) + parseFloat(element.selling.markup)
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          )}
                        </Grid>
                        {/* SERVICE FEE */}
                        <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                          <b>
                            <NumberFormat
                              value={parseFloat(
                                element.selling.service_fee
                              ).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={element.selling.remit_currency}
                            />
                          </b>
                        </Grid>
                        {/* TOTAL AMOUNT */}
                        <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                          {element.selling.remit_currency === "$" ? (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  element.selling.selling_price_in_usd
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          ) : (
                            <b>
                              <NumberFormat
                                value={parseFloat(
                                  element.selling.selling_price_in_php
                                ).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={element.selling.remit_currency}
                              />
                            </b>
                          )}
                        </Grid>
                      </>
                    );
                  })}
                  <Grid item xs={16} sx={{ textAlign: "center" }}>
                    <Divider
                      sx={{
                        borderBottomWidth: 1.5,
                        borderColor: "text.primary",
                      }}
                    />
                  </Grid>
                  <Grid item xs={14}>
                    <b>GRAND TOTAL SELLING</b>
                  </Grid>
                  <Grid item xs={1.9} sx={{ textAlign: "center" }}>
                    {props.total_selling.remit_currency === "$" ? (
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.total_selling.grand_total_selling_in_usd
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </b>
                    ) : (
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.total_selling.grand_total_selling_in_php
                          ).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₱ "}
                        />
                      </b>
                    )}
                  </Grid>
                  <Grid item xs={16}>
                    <Divider
                      sx={{
                        borderBottomWidth: 1.5,
                        borderColor: "text.primary",
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}

          <Grid item xs={16}></Grid>
          <Grid item xs={16} sx={{ fontSize: 20 }}>
            <b>COSTING</b>
          </Grid>

          {props.products_services.length < 1 && (
            <>
              <Grid item xs={16} sx={{ p: 1, border: "1px solid grey" }}>
                <Typography sx={{ mt: 2, mb: 3, ml: 3 }}>
                  <ReportProblem sx={{ mr: 3 }} />
                  NO PRODUCTS & SERVICES HAS BEEN ADDED
                </Typography>
              </Grid>
            </>
          )}

          {/*  DATA */}
          {props.products_services.map((item, index) => {
            return (
              <>
                <Grid item xs={16}>
                  <Divider
                    sx={{
                      borderBottomWidth: 1.5,
                      borderColor: "text.primary",
                    }}
                  />
                </Grid>
                <Grid item xs={0.5}>
                  <b>{index + 1}</b>
                </Grid>
                {/* FLIGHT */}
                {item.prod_serv_type === "FLIGHT" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={2.7}>
                      <div>
                        JOUR TYPE: <b textAlign="right"> {item.jour_type}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3.5}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={6.8}>
                      <div>
                        VALIDATING CARRIER:
                        <b textAlign="right"> {item.valid_carrier}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        REC LOC:
                        <b textAlign="right"> {item.rec_loc}</b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        TICKETED BY:
                        <b textAlign="right">
                          {item.prep_by.first_name +
                            " " +
                            item.prep_by.last_name}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        ITINERARY: <b>{item.itinerary}</b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={0.5}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>NET</b>
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>TAXES</b>
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>PH TAX</b>
                    </Grid>
                    <Grid item xs={2.5}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {/* AMOUNT OF COST */}
                    <Grid item xs={2.5}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={0.5}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.taxes_total).toFixed(
                            2
                          )}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.ph_tax).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.7}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.3}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.3}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>
                    <Grid item xs={16}>
                      <div>TICKETS</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={5}>
                      <b>TICKET NO.</b>
                    </Grid>
                    <Grid item xs={5}>
                      <b>TICKET TYPE</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.ticket
                            .filter(
                              (type) => type.products_services_no === item.no
                            )
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Grid container columns={10}>
                                      {elements.ticket_data.map((elementss) => {
                                        return (
                                          <>
                                            <Grid item xs={5}>
                                              {elementss.ticket_no}
                                            </Grid>
                                            <Grid item xs={5}>
                                              {elementss.ticket_type}
                                            </Grid>
                                          </>
                                        );
                                      })}
                                    </Grid>
                                  </Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* HOTEL */}
                {item.prod_serv_type === "HOTEL" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={6.1}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        ITINERARY: <b>{item.itinerary}</b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* CRUISE */}
                {item.prod_serv_type === "CRUISE" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={3.1}>
                      <div>
                        RESERV NBR: <b>{item.resrv_nbr}</b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        ITINERARY: <b>{item.itinerary}</b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* SHOREX */}
                {item.prod_serv_type === "SHOREX" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* CITY TOUR */}
                {item.prod_serv_type === "CITY TOUR" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* THEME PARK */}
                {item.prod_serv_type === "THEME PARK" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* BAGGAGE */}
                {item.prod_serv_type === "BAGGAGE" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>
                    <Grid item xs={16}>
                      <div>TICKETS</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={5}>
                      <b>TICKET NO.</b>
                    </Grid>
                    <Grid item xs={5}>
                      <b>TICKET TYPE</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.ticket
                            .filter(
                              (type) => type.products_services_no === item.no
                            )
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}>
                                    <Grid container columns={10}>
                                      {elements.ticket_data.map((elementss) => {
                                        return (
                                          <>
                                            <Grid item xs={5}>
                                              {elementss.ticket_no}
                                            </Grid>
                                            <Grid item xs={5}>
                                              {elementss.ticket_type}
                                            </Grid>
                                          </>
                                        );
                                      })}
                                    </Grid>
                                  </Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* DOCUMENTATION */}
                {item.prod_serv_type === "DOCUMENTATION" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* SEAT REQUEST */}
                {item.prod_serv_type === "SEAT REQUEST" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* TRANSFER */}
                {item.prod_serv_type === "TRANSFER" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* INSURANCE */}
                {item.prod_serv_type === "INSURANCE" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                {/* COMMISSION */}
                {item.prod_serv_type === "COMMISSION" && (
                  <>
                    <Grid item xs={6.3}>
                      <div>
                        SUPPLIER: <b>{item.supplier.name}</b>
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <b>{item.prod_serv_class}</b>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        CURRENCY:{" "}
                        <b>
                          {item.currency === "₱" ? <>{"PHP"}</> : <>{"USD"}</>}
                        </b>
                      </div>
                    </Grid>

                    <Grid item xs={6.8}>
                      <div>
                        PAYMENT MODE: <b>{item.pay_mode}</b>
                      </div>
                    </Grid>

                    <Grid item xs={3}>
                      <div>
                        RESA:
                        <b textAlign="right">
                          {item.prep_by !== null
                            ? item.prep_by.first_name +
                              " " +
                              item.prep_by.last_name
                            : ""}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                      <div>
                        ISSUED DATE:
                        <b textAlign="right">
                          {" "}
                          {moment(props.acr.date).format("D-MMM-YYYY")}
                        </b>
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* BREAKDOWN RATE */}
                    <Grid item xs={16}>
                      <div>BREAKDOWN RATE</div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>GROSS</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>%</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>COM AMT</b>
                    </Grid>
                    <Grid item xs={3.2}>
                      <b>NET</b>
                    </Grid>

                    <Grid item xs={3.2}>
                      <b>COST</b>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {/* AMOUNT OF COST */}
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.gross).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>{item.costing.com_percent}</div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.com_amount).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        <NumberFormat
                          value={parseFloat(item.costing.net).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={item.currency}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3.2}>
                      <div>
                        {item.currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_usd).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(item.costing.cost_in_php).toFixed(
                              2
                            )}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={item.currency}
                          />
                        )}
                      </div>
                    </Grid>
                    {/* GRAND TOTAL COST */}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    {props.report
                      .filter((type) => type.no === item.no)
                      .map((e) => {
                        return (
                          <>
                            <Grid item xs={11.5}>
                              <div>
                                QTY: <b> {e.qty}</b>
                              </div>
                            </Grid>
                            {e.currency === "$" ? (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_usd
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            ) : (
                              <Grid item xs={4.5}>
                                <div>
                                  TOTAL COST:{" "}
                                  <b>
                                    <NumberFormat
                                      value={parseFloat(
                                        e.total_cost_in_php
                                      ).toFixed(2)}
                                      displayType={"text"}
                                      thousandSeparator={true}
                                      prefix={e.currency}
                                    />
                                  </b>
                                </div>
                              </Grid>
                            )}
                          </>
                        );
                      })}
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}>
                      <div>
                        {" "}
                        <b>REMARKS:</b> {item.remarks}
                      </div>
                    </Grid>
                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>
                    <Grid item xs={16}></Grid>

                    <Grid item xs={6}>
                      <b>PASSENGER NAME</b>
                    </Grid>
                    <Grid item xs={10}></Grid>

                    <Grid item xs={16}>
                      <Divider
                        sx={{
                          borderBottomWidth: 1.5,
                          borderColor: "text.primary",
                        }}
                      />
                    </Grid>

                    {props.passengers.map((element, index) => {
                      return (
                        <>
                          {element.product_service_deploy
                            .filter((type) => type.no === item.no)
                            .map((elements, indexs) => {
                              return (
                                <>
                                  <Grid item xs={6}>
                                    <div>
                                      {index +
                                        1 +
                                        ". " +
                                        element.title +
                                        " " +
                                        element.last_name +
                                        ", " +
                                        element.first_name +
                                        " " +
                                        element.suffix +
                                        " " +
                                        element.middle_name}
                                    </div>
                                  </Grid>
                                  <Grid item xs={10}></Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                  </>
                )}

                <Grid item xs={16}></Grid>
                <Grid item xs={16}></Grid>
              </>
            );
          })}

          {/* COMMISSION  */}
          {props.products_services.length > 0 && (
            <>
              {props.products_services.filter(
                (type) => type.prod_serv_type === "COMMISSION"
              ).length > 0 && (
                <>
                  {props.products_services
                    .filter((type) => type.prod_serv_type === "COMMISSION")
                    .map((item, index) => {
                      return (
                        <>
                          {props.report
                            .filter((type) => type.no === item.no)
                            .map((e) => {
                              return (
                                <>
                                  <Grid item xs={16}>
                                    <Divider
                                      sx={{
                                        borderBottomWidth: 1.5,
                                        borderColor: "text.primary",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={6}>
                                    <b>COMMISION DEDUCTION: </b>
                                  </Grid>

                                  <Grid
                                    item
                                    xs={10}
                                    style={{ textAlign: "right" }}
                                  >
                                    {" "}
                                    <b>
                                      <NumberFormat
                                        value={parseFloat(
                                          e.total_cost_in_php
                                        ).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"₱ "}
                                      />
                                    </b>
                                    {" | "}
                                    <b>
                                      <NumberFormat
                                        value={parseFloat(
                                          e.total_cost_in_usd
                                        ).toFixed(2)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$ "}
                                      />
                                    </b>
                                  </Grid>
                                </>
                              );
                            })}
                        </>
                      );
                    })}
                </>
              )}
            </>
          )}

          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 1.5,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <b>GRAND TOTAL COSTING: </b>
          </Grid>
          <Grid item xs={10} style={{ textAlign: "right" }}>
            <b>
              <NumberFormat
                value={parseFloat(
                  props.total_cost.grand_total_cost_in_php
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱ "}
              />
              {" | "}
              <NumberFormat
                value={parseFloat(
                  props.total_cost.grand_total_cost_in_usd
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />
            </b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 1.5,
                borderColor: "text.primary",
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <b>PROFIT/LOSS: </b>
          </Grid>

          <Grid item xs={10} style={{ textAlign: "right" }}>
            <b>
              <NumberFormat
                value={parseFloat(
                  props.total_selling.grand_total_selling_in_php -
                    props.total_cost.grand_total_cost_in_php
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₱ "}
              />
              {" | "}
              <NumberFormat
                value={parseFloat(
                  props.total_selling.grand_total_selling_in_usd -
                    props.total_cost.grand_total_cost_in_usd
                ).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />
            </b>
          </Grid>
          <Grid item xs={16}>
            <Divider
              sx={{
                borderBottomWidth: 1.5,
                borderColor: "text.primary",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
});
