import React from "react";
import NumberFormat from "react-number-format";
import { Box, Grid, Divider } from "@mui/material";
import moment from "moment";

export const SoaPrint = React.forwardRef((props, ref) => {
  //  FLIGHT DETAILS
  const flight_detail = [...props.booking.product_service]
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
  const hotel_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "HOTEL")
    .map((e) => {
      return e;
    })
    .flat()
    .slice();
  const hotel_detail = [...props.booking.product_service]
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
  const cruise_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "CRUISE")
    .map((e) => {
      return e;
    })
    .flat()
    .slice();
  const cruise_detail = [...props.booking.product_service]
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
  const shorex_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "SHOREX")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  CITY TOUR DETAILS
  const city_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "CITY TOUR")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  THEME PARK DETAILS
  const theme_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "THEME PARK")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  BAGGAGE  DETAILS
  const baggage_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "BAGGAGE")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  DOCUMENTATION  DETAILS
  const doc_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "DOCUMENTATION ")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  SEAT REQUEST  DETAILS
  const seat_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "SEAT REQUEST")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  TRANSFER   DETAILS
  const transfer_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "TRANSFER")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  //  INSURANCE    DETAILS
  const insurance_details = [...props.booking.product_service]
    .filter((type) => type.prod_serv_type === "INSURANCE")
    .map((e) => {
      return e.itinerary;
    })
    .flat();

  return (
    <div ref={ref}>
      <Box sx={{ flexGrow: 1, fontSize: 11.3 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16}></Grid>
          <Grid item xs={10}>
            <div>
              <b style={{ fontSize: 23 }}>HORIZON TRAVEL & TOUR, INC.</b>
            </div>
            <div style={{ fontSize: 20 }}>STATEMENT OF ACCOUNT</div>
          </Grid>
          <Grid item xs={2.5} sx={{ fontSize: 13 }}>
            <div>SOA No: </div>
            <div>Date: </div>
            <div>Ref No: </div>
            <div>ACR:</div>
            <div>Payment Due: </div>
          </Grid>
          <Grid item xs={3.5} sx={{ fontSize: 13 }}>
            <div> {props.booking.rs_no}</div>
            <div>{moment(props.booking.createdAt).format("D-MMM-YYYY")}</div>
            <div>{props.booking.no_booking}</div>
            <div>
              {props.booking.ref_no === "" ? " - " : props.booking.ref_no}{" "}
            </div>
            <div>
              {props.booking.acr.rate +
                " - " +
                moment(props.booking.acr.date).format("D-MMM-YYYY")}
            </div>
            <div>{moment(props.booking.payment_due).format("D-MMM-YYYY")}</div>
          </Grid>

          {props.booking.customer.customer_type === "WALK IN" ? (
            <Grid item xs={16} sx={{ fontSize: 15 }}>
              <div>
                Misc Name: <b> {props.booking.customer.misc_name}</b>
              </div>
            </Grid>
          ) : (
            <Grid item xs={16} sx={{ fontSize: 15 }}>
              <div>
                Account Name:{" "}
                <b>
                  {" "}
                  {props.booking.customer.acct_data !== null
                    ? props.booking.customer.acct_data.acct_name
                    : ""}
                </b>
              </div>
              <div>
                {" "}
                Address:{" "}
                {props.booking.customer.acct_data !== null
                  ? props.booking.customer.acct_data.address
                  : ""}
              </div>
              <div>
                {" "}
                Contact No:{" "}
                {props.booking.customer.acct_data !== null
                  ? props.booking.customer.acct_data.contact_no
                  : ""}
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
              <b>PARTICULARS:</b> TO BILL COST OF {props.booking.particular}
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
            {props.booking.product_service.filter(
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
            {props.booking.product_service.filter(
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
            {props.booking.product_service.filter(
              (type) => type.prod_serv_type === "SHOREX"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"SHOREX DETAILS: " + shorex_details}
                </Grid>
              </>
            )}

            {/* CITY TOUR DETAIL */}
            {props.booking.product_service.filter(
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
            {props.booking.product_service.filter(
              (type) => type.prod_serv_type === "THEME PARK"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"THEME PARK DETAILS: " + theme_details}
                </Grid>
              </>
            )}

            {/*BAGGAGE  DETAIL */}
            {props.booking.product_service.filter(
              (type) => type.prod_serv_type === "BAGGAGE"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"BAGGAGE  DETAILS: " + baggage_details}
                </Grid>
              </>
            )}

            {/*DOCUMENTATION  DETAIL */}
            {props.booking.product_service.filter(
              (type) => type.prod_serv_type === "DOCUMENTATION"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"DOCUMENTATION  DETAILS: " + doc_details}
                </Grid>
              </>
            )}

            {/*SEAT REQUEST  DETAIL */}
            {props.booking.product_service.filter(
              (type) => type.prod_serv_type === "SEAT REQUEST"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"SEAT REQUEST  DETAILS: " + seat_details}
                </Grid>
              </>
            )}

            {/*TRANSFER   DETAIL */}
            {props.booking.product_service.filter(
              (type) => type.prod_serv_type === "TRANSFER"
            ).length > 0 && (
              <>
                <Grid item xs={16}>
                  {"TRANSFER DETAILS: " + transfer_details}
                </Grid>
              </>
            )}

            {/*INSURANCE DETAIL */}
            {props.booking.product_service.filter(
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
          {props.booking.product_service.filter(
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
          {props.booking.passenger.length > 0 && (
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
                  {props.booking.passenger.map((element, index) => {
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
                    {props.booking.grand_total_selling.remit_currency ===
                    "$" ? (
                      <b>
                        <NumberFormat
                          value={parseFloat(
                            props.booking.grand_total_selling
                              .grand_total_selling_in_usd
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
                            props.booking.grand_total_selling
                              .grand_total_selling_in_php
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
          

          <Grid item xs={16} sx={{ fontSize: 13 }}>
            <div>
              As per our record, this statement remains UNPAID. Please settle
              this account as soon as possible. Please notify HORIZON TRAVEL &
              TOUR, INC. for any Discrepancies, otherwise this statement will be
              considered valid. Please make all check payment payable to HORIZON
              TRAVEL & TOUR, INC.
            </div>
          </Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16} sx={{ fontSize: 13 }}>
            <div>Thank you for your continuous patronage</div>
          </Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16} sx={{ fontSize: 13 }}>
            <div>
              <b>Certified Correct</b>
            </div>
            <div>
              <b>Payment not yet received</b>
            </div>
          </Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16}></Grid>
          <Grid item xs={16} sx={{ fontSize: 13 }}>
            <div>
              <b>{"___________________________"}</b>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
});

export default SoaPrint;
