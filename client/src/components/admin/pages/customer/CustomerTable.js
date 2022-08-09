import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../index.css";
import { Edit, Delete, ReportProblem, Visibility, Search } from "@mui/icons-material";
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
import EditCustomerModal from "./CustomerEditModal";
import DeleteModal from "../../../popups/DeleteModal";

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
    id: "acct_name",
    numeric: false,
    label: "Account Name",
  },
  {
    id: "contact_person",
    label: "Contact Person",
    numeric: false,
  },
  {
    id: "contact_no",
    label: "Contact No",
    numeric: false,
  },
  { id: "status", label: "Status", numeric: false, disablePadding: true },
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

const CustomerTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("acct_name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [openDeleteCustomer, setOpenDeleteCustomer] = useState(false);
  const [title, setTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [userData, setUserData] = useState("");
  const [searchedVal, setSearchedVal] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleEditCustomer = (customer) => {
    setOpenEditCustomer(true);
    setCustomerData(customer);
  };
  const handleDeleteCustomer = (customer) => {
    setOpenDeleteCustomer(true);
    setTitle("Delete Customer");
    setUserData(customer._id);
    setMessageContent(`Are you sure want to delete ${customer.acct_name}`);
  };
  const deleteCustomerHandler = (e) => {
    e.preventDefault();
    props.dispatch(props.deleteCustomer(userData));
    handleCloseDelete();
  };
  const handleCloseDelete = () => {
    setOpenDeleteCustomer(false);
  };
  const handleClose = () => {
    setOpenEditCustomer(false);
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
                rowCount={props.customer.length}
              />
              <TableBody>
                {props.customer.length > 0 ? (
                  <>
                    {stableSort(props.customer, getComparator(order, orderBy))
                      .filter(
                        (row) =>
                          !searchedVal.length ||
                          row.acct_name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) ||
                          row.contact_person
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
                              {row.acct_name}
                            </TableCell>
                            <TableCell align="left">
                              {row.contact_person}
                            </TableCell>
                            <TableCell align="left">{row.contact_no}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">
                              <Tooltip
                                arrow
                                title="View Account"
                                placement="top-start"
                              >
                                <IconButton
                                  onClick={() => {
                                    handleEditCustomer(row);
                                  }}
                                  size="small"
                                  color="success"
                                  aria-label="edit"
                                >
                                  <Visibility />
                                </IconButton>
                              </Tooltip>
                              <Tooltip arrow title="Edit" placement="top-start">
                                <IconButton
                                  onClick={() => {
                                    handleEditCustomer(row);
                                  }}
                                  size="small"
                                  color="warning"
                                  aria-label="edit"
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>

                              <Tooltip
                                arrow
                                title="Delete"
                                placement="top-start"
                              >
                                <IconButton
                                  size="small"
                                  color="error"
                                  aria-label="delete"
                                  onClick={() => handleDeleteCustomer(row)}
                                >
                                  <Delete />
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
                      NO CUSTOMER DATA HAS BEEN ADDED
                    </Typography>
                  </div>
                )}

                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              </TableBody>
            </Table>
          </TableContainer>
          {openEditCustomer && (
            <EditCustomerModal
              handleClose={handleClose}
              open={openEditCustomer}
              customer={customerData}
              updateCustomer={props.updateCustomer}
              dispatch={props.dispatch}
            ></EditCustomerModal>
          )}
          {openDeleteCustomer && (
            <DeleteModal
              deleteHandler={deleteCustomerHandler}
              open={openDeleteCustomer}
              user={userData}
              title={title}
              dispatch={props.deleteUser}
              messageContent={messageContent}
              handleClose={handleCloseDelete}
            ></DeleteModal>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={props.customer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default CustomerTable;
