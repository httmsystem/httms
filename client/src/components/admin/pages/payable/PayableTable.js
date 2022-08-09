import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import {
  ReportProblem,
  Visibility,
  CallMade,
  Print,
} from "@mui/icons-material";
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
  Chip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import NumberFormat from "react-number-format";
import PayableCreateRelease from "./PayableCreateRelease";

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
    id: "index",
    numeric: false,
    label: "No.",
  },
  {
    numeric: false,
    label: "Invoice No.",
  },
  {
    numeric: false,
    label: "Description",
  },
  {
    numeric: false,
    label: "Payee",
  },
  {
    numeric: false,
    label: "Amount",
  },
  {
    numeric: false,
    label: "Status",
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
const PayableTable = (props) => {
  const [release_open, set_release_open] = useState(false);
  const [temp_invoice_data, set_temp_invoice_date] = useState(null);
  const handle_release = (invoice) => {
    set_release_open(true);
    set_temp_invoice_date(invoice);
  };
  const handle_close_release = () => {
    set_release_open(false);
  };

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
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={props.invoices.length}
              />
              <TableBody>
                {props.invoices.length > 0 ? (
                  <>
                    {stableSort(props.invoices, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.invoice_no}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.desc}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.payee}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <NumberFormat
                                value={parseFloat(row.amount).toFixed(2)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={row.currency + " "}
                              />
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.status === "OPEN" ? (
                                <Chip label={row.status} color="warning" />
                              ) : (
                                <Chip label={row.status} color="success" />
                              )}
                            </TableCell>

                            <TableCell align="left">
                              <Tooltip
                                arrow
                                title="Release"
                                placement="top-start"
                              >
                                <IconButton
                                  onClick={() => {
                                    handle_release(row);
                                  }}
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                >
                                  <CallMade />
                                </IconButton>
                              </Tooltip>
                              <Tooltip arrow title="View" placement="top-start">
                                <IconButton
                                  onClick={() => {
                                    release_open(row);
                                  }}
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                arrow
                                title="Print"
                                placement="top-start"
                              >
                                <IconButton
                                  onClick={() => {
                                    release_open(row);
                                  }}
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
                    <TableCell align="left">
                      <Typography sx={{ mt: 1.5, mb: 1 }}>
                        <ReportProblem sx={{ mr: 3 }} />
                        NO INVOICE/BILL DATA HAS BEEN ADDED
                      </Typography>
                    </TableCell>
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
            count={props.invoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {release_open && (
            <PayableCreateRelease
              open={release_open}
              invoice={temp_invoice_data}
              handle_close_release={handle_close_release}
              dispatch={props.dispatch}
              updateInvoice={props.updateInvoice}
              createRelease={props.createRelease}
              releases={props.releases}
            ></PayableCreateRelease>
          )}
        </Paper>
      </Box>
    </div>
  );
};

export default PayableTable;
