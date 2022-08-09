import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import { Print, ReportProblem, Search } from "@mui/icons-material";
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
import RsPrintModal from "./RsPrintModal";
import SoaPrintModal from "./SoaPrintModal";

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
    label: "RS/SOA No.",
  },
  {
    numeric: false,
    label: "Customer Type",
  },
  {
    numeric: false,
    label: "Account Name",
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

const RsTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
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

  const [booking_data, set_booking_data] = useState(null);
  const [open_print_modal_rs, set_open_print_modal_rs] = useState(false);

  const handlePrintBooking = (booking) => {
    set_open_print_modal_rs(true);
    set_booking_data(booking);
  };

  const handleClosePrint = () => {
    set_open_print_modal_rs(false);
  };

  const [open_print_modal_soa, set_open_print_modal_soa] = useState(false);

  const handlePrintBookingSoa = (booking) => {
    set_open_print_modal_soa(true);
    set_booking_data(booking);
  };

  const handleClosePrintSoa = () => {
    set_open_print_modal_soa(false);
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
                rowCount={props.rss.length}
              />
              <TableBody>
                {props.rss.length > 0 ? (
                  <>
                    {stableSort(props.rss, getComparator(order, orderBy))
                      .filter(
                        (row) =>
                          !searchedVal.length ||
                          row.rs_no
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer.customer_type
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer.acct_data.acct_name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.customer.misc_name
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
                          <TableRow key={row.rs_no}>
                            <TableCell component="th" scope="row">
                              {row.rs_no}
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
                                title="Print RS"
                                placement="top-start"
                                onClick={() => {
                                  handlePrintBooking(row);
                                }}
                              >
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                >
                                  <Print />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                arrow
                                title="Print SOA"
                                placement="top-start"
                                onClick={() => {
                                  handlePrintBookingSoa(row);
                                }}
                              >
                                <IconButton
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                >
                                  <Print />
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
            count={props.rss.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {open_print_modal_rs && (
            <RsPrintModal
              booking={booking_data}
              open={open_print_modal_rs}
              close={handleClosePrint}
            />
          )}
          {open_print_modal_soa && (
            <SoaPrintModal
              booking={booking_data}
              open={open_print_modal_soa}
              close={handleClosePrintSoa}
            />
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default RsTable;
