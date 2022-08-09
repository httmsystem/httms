import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ReportProblem } from "@mui/icons-material";
import BookingAddFlightTicketNoModal from "./BookingAddFlightTicketNoModal";

const BookingCreateModalFlightTicketNo = (props) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={16}>
            <h3>TICKETS</h3>
          </Grid>

          <BookingAddFlightTicketNoModal
            products_services={props.products_services}
            passengers={props.passengers}
            set_passengers={props.set_passengers}
            gds_validation={props.gds_validation}
            ticket={props.ticket}
            set_ticket={props.set_ticket}
            set_ticket_onChange={props.set_ticket_onChange}
            add_ticket={props.add_ticket}
            addOpenTicket={props.addOpenTicket}
            handleAddOpenTicket={props.handleAddOpenTicket}
            handleAddCloseTicket={props.handleAddCloseTicket}
            redeploy_passenger={props.redeploy_passenger}
            gds_series={props.gds_series}
            set_ticket_no_onChange={props.set_ticket_no_onChange}
            remove_ticket={props.remove_ticket}
          />

          {props.products_services.length < 1 && (
            <Grid item xs={16} sx={{ p: 1, border: "1px solid grey" }}>
              <Typography sx={{ mt: 2, mb: 3, ml: 3 }}>
                <ReportProblem sx={{ mr: 3 }} />
                NO FLIGHT HAS BEEN ADDED PLEASE PROCEED TO NEXT STEP
              </Typography>
            </Grid>
          )}

          {props.products_services.length > 0 && (
            <>
              <Grid item xs={16}>
                <Button
                  variant="contained"
                  onClick={() => {
                    props.handleAddOpenTicket();
                    props.set_ticket_deploy();
                  }}
                >
                  ADD TICKET
                </Button>
              </Grid>
              {props.products_services
                .filter((type) => type.prod_serv_type === "FLIGHT")
                .map((item) => {
                  return (
                    <>
                      <Grid item xs={16}></Grid>
                      <Grid item xs={16}></Grid>
                      <Grid item xs={6} sx={{ p: 1, border: "1px solid grey" }}>
                        <div>
                          ITINERARY: <b> {item.itinerary} </b>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        sx={{ p: 1, border: "1px solid grey" }}
                      ></Grid>

                      <Grid item xs={6} sx={{ p: 1, border: "1px solid grey" }}>
                        <b>PASSENGER NAME</b>
                      </Grid>
                      <Grid item xs={5} sx={{ p: 1, border: "1px solid grey" }}>
                        <b>TICKET NO.</b>
                      </Grid>
                      <Grid item xs={5} sx={{ p: 1, border: "1px solid grey" }}>
                        <b>TICKET TYPE</b>
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
                                    <Grid
                                      item
                                      xs={6}
                                      sx={{
                                        p: 1,
                                        border: "1px solid grey",
                                      }}
                                    >
                                      <div>
                                        {element.title +
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
                                    <Grid
                                      container
                                      xs={7.5}
                                      sx={{
                                        p: 1,
                                        border: "1px solid grey",
                                      }}
                                    >
                                      {elements.ticket_data.map((elementss) => {
                                        return (
                                          <>
                                            <Grid item xs={6}>
                                              {elementss.ticket_no}
                                            </Grid>
                                            <Grid item xs={6}>
                                              {elementss.ticket_type}
                                            </Grid>
                                          </>
                                        );
                                      })}
                                    </Grid>
                                  </>
                                );
                              })}
                          </>
                        );
                      })}

                      <Grid item xs={16}></Grid>
                      <Grid item xs={16}></Grid>
                    </>
                  );
                })}

              {props.products_services
                .filter((type) => type.prod_serv_type === "BAGGAGE")
                .map((item) => {
                  return (
                    <>
                      <Grid item xs={16}></Grid>
                      <Grid item xs={6} sx={{ p: 1, border: "1px solid grey" }}>
                        <div>
                          ITINERARY: <b> {item.itinerary} </b>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        sx={{ p: 1, border: "1px solid grey" }}
                      ></Grid>

                      <Grid item xs={6} sx={{ p: 1, border: "1px solid grey" }}>
                        <b>PASSENGER NAME</b>
                      </Grid>
                      <Grid item xs={5} sx={{ p: 1, border: "1px solid grey" }}>
                        <b>TICKET NO.</b>
                      </Grid>
                      <Grid item xs={5} sx={{ p: 1, border: "1px solid grey" }}>
                        <b>TICKET TYPE</b>
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
                                    <Grid
                                      item
                                      xs={6}
                                      sx={{
                                        p: 1,
                                        border: "1px solid grey",
                                      }}
                                    >
                                      <div>
                                        {element.title +
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
                                    <Grid
                                      container
                                      xs={7.5}
                                      sx={{
                                        p: 1,
                                        border: "1px solid grey",
                                      }}
                                    >
                                      {elements.ticket_data.map((elementss) => {
                                        return (
                                          <>
                                            <Grid item xs={6}>
                                              {elementss.ticket_no}
                                            </Grid>
                                            <Grid item xs={6}>
                                              {elementss.ticket_type}
                                            </Grid>
                                          </>
                                        );
                                      })}
                                    </Grid>
                                  </>
                                );
                              })}
                          </>
                        );
                      })}

                      <Grid item xs={16}></Grid>
                      <Grid item xs={16}></Grid>
                    </>
                  );
                })}
            </>
          )}

          <Grid item xs={16}></Grid>
          <Grid item xs={16}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BookingCreateModalFlightTicketNo;
