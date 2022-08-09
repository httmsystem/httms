import React, { useState } from "react";
import "../../index.css";
import PropTypes from "prop-types";
import { Edit, Delete, ReportProblem } from "@mui/icons-material";
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
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import EditUserModal from "./UserEditModal";
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
    id: "_id",
    numeric: false,
    label: "Ref No.",
  },
  {
    id: "name",
    label: "Name",
    numeric: false,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
  },
  {
    id: "role",
    label: "Role",
    numeric: false,
  },
  { id: "status", label: "Status", numeric: false },
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

const UserTable = (props) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [title, setTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [userData, setUserData] = useState("");

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

  const handleEditUser = (user) => {
    setOpenEditUser(true);
    setUserData(user);
  };

  const handleDeleteUser = (user) => {
    setOpenDeleteUser(true);
    setTitle("Delete User");
    setUserData(user._id);
    setMessageContent(`Are you sure want to delete ${user.email}`);
  };
  const deleteUserHandler = (e) => {
    e.preventDefault();
    props.dispatch(props.deleteUser(userData));
    handleCloseDelete();
  };
  const handleCloseDelete = () => {
    setOpenDeleteUser(false);
  };
  const handleClose = () => {
    setOpenEditUser(false);
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
                rowCount={props.users.length}
              />
              <TableBody>
                {props.users.length > 0 ? (
                  <>
                    {stableSort(props.users, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                              {row._id}
                            </TableCell>
                            <TableCell align="left">
                              {row.last_name +
                                ", " +
                                row.first_name +
                                " " +
                                row.suffix +
                                " " +
                                row.middle_name +
                                "."}
                            </TableCell>

                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.user_role}</TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">
                              <Tooltip arrow title="Edit" placement="top-start">
                                <IconButton
                                  onClick={() => handleEditUser(row)}
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
                                  onClick={() => handleDeleteUser(row)}
                                  size="small"
                                  color="error"
                                  aria-label="delete"
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
                      NO USER DATA HAS BEEN ADDED
                    </Typography>
                  </div>
                )}

                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              </TableBody>
            </Table>
          </TableContainer>
          {openEditUser && (
            <EditUserModal
              handleClose={handleClose}
              open={openEditUser}
              user={userData}
              updateUser={props.updateUser}
              dispatch={props.dispatch}
            ></EditUserModal>
          )}
          {openDeleteUser && (
            <DeleteModal
              deleteHandler={deleteUserHandler}
              open={openDeleteUser}
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
            count={props.users.length}
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

export default UserTable;
