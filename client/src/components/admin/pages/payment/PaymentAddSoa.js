import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import {
  Button,
  Box,
  Modal,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableSortLabel,
  TextField,
  InputAdornment,
} from "@mui/material";

import PropTypes from "prop-types";
import { ReportProblem, Search } from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import PaymentAddSoaLiq from "./PaymentAddSoaLiq";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const columns = [
  {
    numeric: false,
    label: "SOA No.",
  },
  {
    numeric: false,
    label: "Reference No",
  },
  {
    numeric: false,
    label: "Selling Currency",
  },
  {
    numeric: false,
    label: "Amount",
  },
  {
    numeric: false,
    label: "Amount Received",
  },
  {
    numeric: false,
    label: "Balance",
  },
];
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const columnss = [
  {
    numeric: false,
    label: "SOA No.",
  },
  {
    numeric: false,
    label: "Misc. Name",
  },
  {
    numeric: false,
    label: "Selling Currency",
  },
  {
    numeric: false,
    label: "Amount",
  },
  {
    numeric: false,
    label: "Amount Received",
  },
  {
    numeric: false,
    label: "Balance",
  },
];

function EnhancedTableHeads(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columnss.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHeads.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const PaymentAddSoa = (props) => {
  const [liq_open, set_liq_open] = useState(false);
  const [temp_bk_data, set_temp_bk_date] = useState(null);
  const [searchedVal, setSearchedVal] = useState("");
  const handle_liq = (booking) => {
    set_liq_open(true);
    set_temp_bk_date(booking);
  };
  const handle_close_liq = () => {
    set_liq_open(false);
  };

  // LIQUIDATION DATA TABLE SUB-AGENT AND CORPORATE
  // LIQUIDATION DATA TABLE TO GET ANOTHER INFORMATION TO TBL_REQ_SLIP TO TBL_LIQUIDATION
  const data = props.rss
    .map((e) => {
      return props?.liquidations
        .filter((type) => type?.no === e?.rs_no)
        .map((ee) => {
          return {
            no: ee.no,
            ref_no: e.ref_no,
            customer: e.customer,
            acr: e.acr,
            received_php: ee.received_php,
            received_usd: ee.received_usd,
            status: ee.status,
            grand_total_selling: e.grand_total_selling,
          };
        })
        .flat();
    })
    .flat();

  // LIQUIDATION DATA TABLE WALK IN
  // LIQUIDATION DATA TABLE TO GET ANOTHER INFORMATION TO TBL_REQ_SLIP TO TBL_LIQUIDATION
  const data_walk = props.rss
    .filter((type) => type?.customer?.customer_type === "WALK IN")
    .map((e) => {
      return props.liquidations
        .filter((type) => type?.no === e?.rs_no)
        .map((ee) => {
          return {
            no: ee.no,
            ref_no: e.ref_no,
            customer: e.customer,
            acr: e.acr,
            received_php: ee.received_php,
            received_usd: ee.received_usd,
            status: ee.status,
            grand_total_selling: e.grand_total_selling,
          };
        })
        .flat();
    })
    .flat();

  // PASSENGER IN RSS
  // TO GET PASSENGER SELLING PRICE IN TBL_REQ_SLIP
  const datas = props?.rss
    .map((e) => {
      return e.passenger
        .map((ee) => {
          return {
            no: e.rs_no,
            passenger_no: ee.no,
            selling_price_in_php: ee.selling.selling_price_in_php,
            selling_price_in_usd: ee.selling.selling_price_in_usd,
          };
        })
        .flat();
    })
    .flat();

  // PASSENGER IN liquidations
  // TO GET PASSENGER SELLING PRICE IN TBL_LIQUIDATION
  const datass = props?.liquidations
    .map((e) => {
      return e.passenger
        .map((ee) => {
          return {
            no: e.no,
            passenger_no: ee.passenger_no,
            name: ee.name,
            received_php: ee.received_php,
            received_usd: ee.received_usd,
            status: ee.status,
          };
        })
        .flat();
    })
    .flat();

  // MERGED DATAS
  let mergedPass = datas
    .map((e) => {
      return datass
        .filter((type) => type?.passenger_no === e?.passenger_no)
        .map((ee) => {
          return {
            no: e.no,
            passenger_no: ee.passenger_no,
            name: ee.name,
            received_php: ee.received_php,
            received_usd: ee.received_usd,
            status: ee.status,
            selling_price_in_php: e.selling_price_in_php,
            selling_price_in_usd: e.selling_price_in_usd,
          };
        })
        .flat();
    })
    .flat();

  // TO FILTER DATA OF ALL SUB AGENT AND CORPORATE ACCOUNT THAT BASED SET BY TBL_RECEIPT
  const filterCustomer = data
    .filter(
      (type) => type?.customer?.acct_data?._id === props?.receipt?.customer?._id
    )
    .map((e) => {
      return e;
    });

  // TO FILTER DATA OF ALL SUB AGENT AND CORPORATE ACCOUNT THAT NOT PAID
  const paymentUnpaid = filterCustomer
    .filter((type) => type?.status === "UNPAID")
    .map((e) => {
      return e;
    });

  // TO FILTER DATA OF ALL WALK-IN ACCOUNT THAT NOT PAID
  const paymentUnpaid_walk = data_walk
    .filter((type) => type.status === "UNPAID")
    .map((e) => {
      return e;
    });

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    maxHeight: "80vh",
    bgcolor: "background.paper",
    boxShadow: 10,
    p: 4,
    overflow: "hidden",
  };

  useEffect(
    (e) => {
      return e;
    },
    [paymentUnpaid]
  );

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick
      >
        {props?.receipt?.customer_type === "WALK IN" ? (
          <>
            <Box sx={style}>
              <>
                <Grid container spacing={1} columns={16}>
                  <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                      <TableContainer>
                        <TextField
                          autoComplete="off"
                          size="small"
                          label="Search"
                          sx={{ mt: 2.5, mr: 2.5, float: "right" }}
                          onChange={(e) => setSearchedVal(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {" "}
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                        />
                        <Table
                          sx={{ minWidth: 750 }}
                          aria-labelledby="tableTitle"
                        >
                          <EnhancedTableHeads
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={paymentUnpaid_walk.length}
                          />
                          <TableBody>
                            {paymentUnpaid_walk.length > 0 ? (
                              <>
                                {stableSort(
                                  paymentUnpaid_walk,
                                  getComparator(order, orderBy)
                                )
                                  .filter(
                                    (row) =>
                                      !searchedVal.length ||
                                      row?.no
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        ) ||
                                      row?.customer?.misc_name
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        ) ||
                                      row?.grand_total_selling?.grand_total_selling_in_php
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        ) ||
                                      row?.grand_total_selling?.grand_total_selling_in_usd
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        )
                                  )
                                  .map((row, index) => {
                                    return (
                                      <TableRow key={row.rs_no}>
                                        <TableCell component="th" scope="row">
                                          {row?.no}
                                        </TableCell>

                                        <TableCell align="left">
                                          {row?.customer?.misc_name}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <>{"USD"}</>
                                          ) : (
                                            <>{"PHP"}</>
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <NumberFormat
                                              value={parseFloat(
                                                row.grand_total_selling
                                                  .grand_total_selling_in_usd
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"$ "}
                                            />
                                          ) : (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.grand_total_selling
                                                  ?.grand_total_selling_in_php
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₱ "}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          {" "}
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.received_usd
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"$ "}
                                            />
                                          ) : (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.received_php
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₱ "}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.grand_total_selling
                                                  ?.grand_total_selling_in_usd -
                                                  row?.received_usd
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"$ "}
                                            />
                                          ) : (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.grand_total_selling
                                                  ?.grand_total_selling_in_php -
                                                  row?.received_php
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₱ "}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 16 }}
                                            disabled
                                          >
                                            Full
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 16 }}
                                            onClick={() => {
                                              handle_liq(row);
                                            }}
                                          >
                                            Partial
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </>
                            ) : (
                              <div>
                                <Typography sx={{ mt: 1.5, mb: 1 }}>
                                  <ReportProblem sx={{ mr: 3 }} />
                                  NO BOOKING DATA HAS BEEN ADDED
                                </Typography>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Box>
                </Grid>
              </>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      props.handle_close_soa();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
              {liq_open && (
                <PaymentAddSoaLiq
                  open={liq_open}
                  booking={temp_bk_data}
                  result={mergedPass}
                  receipt={props.receipt}
                  liquidations={props.liquidations}
                  handle_close_liq={handle_close_liq}
                  handle_close_soa={props.handle_close_soa}
                  updateRs={props.updateRs}
                  dispatch={props.dispatch}
                  createPayment={props.createPayment}
                  set_booking={set_temp_bk_date}
                  open_adjst={props.add_adjst}
                  handle_close_adjst={props.handle_close_adjst}
                  handle_open_adjst={props.handle_open_adjst}
                  createAdjustment={props.createAdjustment}
                  adjustments={props.adjustments}
                  updateLiquidation={props.updateLiquidation}
                  liq_amount={props.liq_amount}
                  unliq_amount={props.unliq_amount}
                ></PaymentAddSoaLiq>
              )}
            </Box>
          </>
        ) : (
          <>
            <Box sx={style}>
              <>
                <Grid container spacing={1} columns={16}>
                  <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                      <TableContainer>
                        <TextField
                          autoComplete="off"
                          size="small"
                          label="Search"
                          sx={{ mt: 2.5, mr: 2.5, float: "right" }}
                          onChange={(e) => setSearchedVal(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {" "}
                                <Search />
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                        />
                        <Table
                          sx={{ minWidth: 750 }}
                          aria-labelledby="tableTitle"
                        >
                          <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={paymentUnpaid.length}
                          />
                          <TableBody>
                            {paymentUnpaid.length > 0 ? (
                              <>
                                {stableSort(
                                  paymentUnpaid,
                                  getComparator(order, orderBy)
                                )
                                  .filter(
                                    (row) =>
                                      !searchedVal.length ||
                                      row?.no
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        ) ||
                                      row?.ref_no
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        ) ||
                                      row?.grand_total_selling?.grand_total_selling_in_php
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        ) ||
                                      row?.grand_total_selling?.grand_total_selling_in_usd
                                        .toString()
                                        .toLowerCase()
                                        .includes(
                                          searchedVal.toString().toLowerCase()
                                        )
                                  )
                                  .map((row, index) => {
                                    return (
                                      <TableRow key={row.rs_no}>
                                        <TableCell component="th" scope="row">
                                          {row?.no}
                                        </TableCell>

                                        <TableCell align="left">
                                          {row?.ref_no}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <>{"USD"}</>
                                          ) : (
                                            <>{"PHP"}</>
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <NumberFormat
                                              value={parseFloat(
                                                row.grand_total_selling
                                                  .grand_total_selling_in_usd
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"$ "}
                                            />
                                          ) : (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.grand_total_selling
                                                  ?.grand_total_selling_in_php
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₱ "}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          {" "}
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.received_usd
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"$ "}
                                            />
                                          ) : (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.received_php
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₱ "}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          {row?.grand_total_selling
                                            ?.remit_currency === "$" ? (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.grand_total_selling
                                                  ?.grand_total_selling_in_usd -
                                                  row?.received_usd
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"$ "}
                                            />
                                          ) : (
                                            <NumberFormat
                                              value={parseFloat(
                                                row?.grand_total_selling
                                                  ?.grand_total_selling_in_php -
                                                  row?.received_php
                                              ).toFixed(2)}
                                              displayType={"text"}
                                              thousandSeparator={true}
                                              prefix={"₱ "}
                                            />
                                          )}
                                        </TableCell>
                                        <TableCell align="left">
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 16 }}
                                            disabled
                                          >
                                            Full
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{ marginLeft: 16 }}
                                            onClick={() => {
                                              handle_liq(row);
                                            }}
                                          >
                                            Partial
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </>
                            ) : (
                              <div>
                                <Typography sx={{ mt: 1.5, mb: 1 }}>
                                  <ReportProblem sx={{ mr: 3 }} />
                                  NO BOOKING DATA HAS BEEN ADDED
                                </Typography>
                              </div>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Box>
                </Grid>
              </>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      props.handle_close_soa();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
              {liq_open && (
                <PaymentAddSoaLiq
                  open={liq_open}
                  booking={temp_bk_data}
                  result={mergedPass}
                  receipt={props.receipt}
                  liquidations={props.liquidations}
                  handle_close_liq={handle_close_liq}
                  handle_close_soa={props.handle_close_soa}
                  updateRs={props.updateRs}
                  dispatch={props.dispatch}
                  createPayment={props.createPayment}
                  set_booking={set_temp_bk_date}
                  open_adjst={props.add_adjst}
                  handle_close_adjst={props.handle_close_adjst}
                  handle_open_adjst={props.handle_open_adjst}
                  createAdjustment={props.createAdjustment}
                  adjustments={props.adjustments}
                  updateLiquidation={props.updateLiquidation}
                  liq_amount={props.liq_amount}
                  unliq_amount={props.unliq_amount}
                ></PaymentAddSoaLiq>
              )}
            </Box>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PaymentAddSoa;
