import React from "react";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReportProblem } from "@mui/icons-material";
import NumberFormat from "react-number-format";
import BookingAddSellingModal from "./BookingAddSellingModal";

const BookingCreateModalSelling = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Grid container spacing={2} columns={16}>
        {open && (
          <BookingAddSellingModal
            products_services={props.products_services}
            acr={props.acr}
            open={open}
            handleClose={handleClose}
            year={props.year}
            rss_length={props.rss_length}
            passengers={props.passengers}
            set_passengers={props.set_passengers}
            remit_cur={props.remit_cur}
            set_remit_cur={props.set_remit_cur}
          />
        )}

        <Grid item xs={16}>
          <h3>SELLING </h3>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={16} sx={{ mb: 1 }}>
        {/* <Grid item xs={8}>
            <TextField
              fullWidth
              id="outlined-disabled"
              value={props.num_pax}
              onChange={(event) => {
                props.set_num_pax(event.target.value);
              }}
              label="No. of Pax"
              disabled={disable}
            />
          </Grid> */}
        <Grid item xs={8}>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
              // props.add_pax();
              // handleDisable();
            }}
          >
            MAKE SELLING
          </Button>
        </Grid>

        <Grid item xs={16}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NO</TableCell>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">PH TAX</TableCell>
                  <TableCell align="center">AMOUNT</TableCell>
                  <TableCell align="center">MARKUP</TableCell>
                  <TableCell align="center">SERVICE FEE</TableCell>
                  <TableCell align="center">SELLING PRICE</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.passengers.length < 1 && (
                  <div>
                    <Typography sx={{ mt: 2, mb: 3, ml: 3 }}>
                      <ReportProblem sx={{ mr: 3 }} />
                      NO PASSENGER HAS BEEN ADDED
                    </Typography>
                  </div>
                )}
                {props.passengers.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell component="th" scope="row">
                        {row.no}
                      </TableCell>
                      <TableCell align="center">
                        {row.title +
                          " " +
                          row.last_name +
                          ", " +
                          row.first_name +
                          " " +
                          row.suffix +
                          " " +
                          row.middle_name}
                      </TableCell>
                      {/* PH TAX */}
                      <TableCell align="center">
                        <NumberFormat
                            value={parseFloat(
                              row.selling.ph_tax
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={row.selling.remit_currency + " "}
                          />
                      </TableCell>
                      <TableCell align="center">
                        {row.selling.remit_currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(
                              row.selling.total_cost_in_usd
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={row.selling.remit_currency + " "}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(
                              row.selling.total_cost_in_php
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={row.selling.remit_currency + " "}
                          />
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <NumberFormat
                          value={parseFloat(row.selling.markup).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={row.selling.remit_currency + " "}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <NumberFormat
                          value={parseFloat(row.selling.service_fee).toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={row.selling.remit_currency + " "}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {row.selling.remit_currency === "$" ? (
                          <NumberFormat
                            value={parseFloat(
                              row.selling.selling_price_in_usd
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={row.selling.remit_currency + " "}
                          />
                        ) : (
                          <NumberFormat
                            value={parseFloat(
                              row.selling.selling_price_in_php
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={row.selling.remit_currency + " "}
                          />
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}
                        >
                          EDIT
                        </Button>

                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: 16 }}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>{" "}
      </Grid>
    </div>
  );
};

export default BookingCreateModalSelling;
