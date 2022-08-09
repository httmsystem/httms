import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import { ReportProblem, Visibility, Search } from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Box,
  Typography,
  TableSortLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";
import PaymentView from "./PaymentView";
import NumberFormat from "react-number-format";

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
    label: "Date Issued",
  },
  {
    numeric: false,
    label: "Customer Type",
  },
  {
    numeric: false,
    label: "Account Name",
  },
  {
    numeric: false,
    label: "Receipt Type",
  },
  {
    numeric: false,
    label: "Receipt No",
  },
  {
    numeric: false,
    label: "Amount",
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

const PaymentTable = (props) => {
  const [view_open, set_view_open] = useState(false);
  const [temp_receipt_data, set_temp_receipt_date] = useState(null);
  const handle_view_payment = (receipt) => {
    set_view_open(true);
    set_temp_receipt_date(receipt);
  };
  const handle_close_view_payment = () => {
    set_view_open(false);
  };
  const [searchedVal, setSearchedVal] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="bookingTable">
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
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={props.receipts.length}
              />
              <TableBody>
                {props.receipts.length > 0 ? (
                  <>
                    {stableSort(props.receipts, getComparator(order, orderBy))
                      .filter(
                        (row) =>
                          !searchedVal.length ||
                          moment(row.date_issued)
                            .format("D-MMM-YYYY")
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer_type
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer?.acct_name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.receipt_details
                            .map((e) => {
                              return e.receipt_type;
                            })
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.receipt_details
                            .map((e) => {
                              return e.receipt_no;
                            })
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.total_amount
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )

                      .map((row, index) => {
                        return (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                              {moment(row.date_issued).format("D-MMM-YYYY")}{" "}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.customer_type}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.customer?.acct_name}
                            </TableCell>
                            <TableCell align="left">
                              {row.receipt_details.map((e) => {
                                return <div>{e.receipt_type}</div>;
                              })}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.receipt_details.map((e) => {
                                return <div>{e.receipt_no}</div>;
                              })}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <NumberFormat
                                value={parseFloat(row.total_amount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={row.currency + " "}
                              />
                            </TableCell>

                            <TableCell align="left">
                              <Tooltip arrow title="View" placement="top-start">
                                <IconButton
                                  onClick={() => {
                                    handle_view_payment(row);
                                  }}
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </>
                ) : (
                  <div>
                    <Typography sx={{ mt: 1.5, mb: 1 }}>
                      <ReportProblem sx={{ mr: 3 }} />
                      NO RECEIPT DATA HAS BEEN ADDED
                    </Typography>
                  </div>
                )}

                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={props.receipts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {view_open && (
            <PaymentView
              open={view_open}
              receipt={temp_receipt_data}
              handle_close_view_payment={handle_close_view_payment}
              updateReceipt={props.updateReceipt}
              dispatch={props.dispatch}
            ></PaymentView>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default PaymentTable;
