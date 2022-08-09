import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import { Visibility, ReportProblem, Search } from "@mui/icons-material";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import BookingView from "./view_booking/BookingView";

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

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Booking No.</TableCell>
        <TableCell>Customer Type</TableCell>
        <TableCell>Account Name</TableCell>
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

const BookingTable = (props) => {
  const [view_open, set_view_open] = useState(false);
  const [temp_booking_data, set_temp_booking_data] = useState(null);
  const handle_view_booking = (book) => {
    set_view_open(true);
    set_temp_booking_data(book);
  };
  const handle_close_view_booking = () => {
    set_view_open(false);
  };
  const options = props.rss
    .map((option) => {
      return option;
    })
    .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchedVal, setSearchedVal] = useState("");

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
                rowCount={options.length}
              />
              <TableBody>
                {options.length > 0 ? (
                  <>
                    {stableSort(options, getComparator(order, orderBy))
                      .filter(
                        (row) =>
                          !searchedVal.length ||
                          row.booking_no
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer.customer_type
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer.misc_name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer.acct_data.acct_name
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
                              {row.booking_no}
                            </TableCell>
                            <TableCell align="left">
                              {row.customer.customer_type}
                            </TableCell>
                            {row.customer.customer_type === "WALK IN" ? (
                              <TableCell align="left">
                                {row.customer.misc_name}
                              </TableCell>
                            ) : (
                              <TableCell align="left">
                                {row.customer.acct_data.acct_name !== null
                                  ? row.customer.acct_data.acct_name
                                  : ""}
                              </TableCell>
                            )}

                            <TableCell align="left">
                              <Tooltip
                                arrow
                                title="View Booking"
                                placement="top-start"
                              >
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                  onClick={() => {
                                    handle_view_booking(row);
                                  }}
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
                      NO BOOKING DATA HAS BEEN ADDED
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
            count={options.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {view_open && (
            <BookingView
              open={view_open}
              booking={temp_booking_data}
              handle_close_view_booking={handle_close_view_booking}
            ></BookingView>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default BookingTable;
