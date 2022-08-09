import React from "react";
import {
  Box,
  Button,
  Grid,
  Select,
  MenuItem,
  TextField,
  Modal,
  Autocomplete,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const BookingAddFlightTicketNoModal = (props) => {
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
  };
  return (
    <div>
      <Modal
        open={props.addOpenTicket}
        onClose={props.handleAddCloseTicket}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        <Box sx={style}>
          <Grid container spacing={0.5} columns={16} sx={{ mb: 1 }}>
            <Grid item xs={16}></Grid>
            {/* {JSON.stringify(props.ticket)} */}
            {props.ticket.map((element, index) => {
              return (
                <>
                  <Grid item xs={16} sx={{ p: 1, border: "1px solid grey" }}>
                    <b>
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

                  {element.ticket.map((elements, indexs) => {
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
                          <div>{elements.products_services_no}</div>
                          <div>{elements.itinerary}</div>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sx={{
                            p: 1,
                            border: "1px solid grey",
                          }}
                        >
                          {elements.ticket_data.map((elementss, indexss) => {
                            return (
                              <>
                                <Grid container>
                                  <Grid
                                    item
                                    xs={6}
                                    sx={{
                                      p: 1,
                                    }}
                                  >
                                    <b>Ticket No.:</b>

                                    <Autocomplete
                                      size="small"
                                      sx={{
                                        mt: 0.5,
                                      }}
                                      options={props.gds_validation}
                                      name="ticket_no"
                                      getOptionLabel={(option) => {
                                        if (option) return option;
                                        if (typeof option === "string")
                                          return option;
                                        return option;
                                      }}
                                      value={elementss.ticket_no}
                                      isOptionEqualToValue={(option, value) =>
                                        option === value
                                      }
                                      onChange={(e, new_ticket_data) => {
                                        props.set_ticket_no_onChange(
                                          index,
                                          indexs,
                                          indexss,
                                          new_ticket_data
                                        );
                                      }}
                                      disablePortal
                                      renderInput={(params) => (
                                        <TextField {...params} />
                                      )}
                                    />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={5.5}
                                    sx={{
                                      p: 1,
                                    }}
                                  >
                                    <b>Ticket Type:</b>

                                    <Select
                                      size="small"
                                      sx={{
                                        mt: 0.5,
                                      }}
                                      fullWidth
                                      value={elementss.ticket_type}
                                      name="ticket_type"
                                      onChange={(e) =>
                                        props.set_ticket_onChange(
                                          index,
                                          indexs,
                                          indexss,
                                          e
                                        )
                                      }
                                    >
                                      <MenuItem value={"E-TICKET"}>
                                        E-TICKET
                                      </MenuItem>
                                      <MenuItem value={"E RE-ISSUE"}>
                                        E RE-ISSUE
                                      </MenuItem>
                                      <MenuItem value={"SCCCF"}>SCCCF</MenuItem>
                                      <MenuItem value={"EMD"}>EMD</MenuItem>
                                      <MenuItem value={"CONJ"}>
                                        CONJUNK
                                      </MenuItem>
                                      <MenuItem value={"VOIDED"}>
                                        VOIDED
                                      </MenuItem>
                                      <MenuItem value={"REVAL"}>REVAL</MenuItem>
                                    </Select>
                                  </Grid>
                                  <Grid item xs={0.5}>
                                    <IconButton
                                      sx={{mt: 4 }}
                                      color="error"
                                      aria-label="delete"
                                      onClick={() =>
                                        props.remove_ticket( index,
                                          indexs,
                                          indexss,)
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </>
                            );
                          })}
                          <div className="button-section">
                            <Button
                              variant="outlined"
                              // startIcon={<AccountBalance />}
                              onClick={() => props.add_ticket(index, indexs)}
                            >
                              Add More Ticket
                            </Button>
                          </div>
                        </Grid>
                      </>
                    );
                  })}
                </>
              );
            })}
          </Grid>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={props.handleAddCloseTicket}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Box sx={{ flex: "1 1 auto" }}>
              <Button
                onClick={() => {
                  props.redeploy_passenger();
                  props.handleAddCloseTicket();
                }}
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingAddFlightTicketNoModal;
