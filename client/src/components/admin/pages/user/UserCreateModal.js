import React, { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

const UserCreateModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [formData, setUserData] = useState({
    last_name: "",
    first_name: "",
    suffix: "",
    middle_name: "",
    email: "",
    password: "",
    user_role: "",
  });

  const {
    last_name,
    first_name,
    suffix,
    middle_name,
    email,
    password,
    user_role,
  } = formData;

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      last_name,
      first_name,
      suffix,
      middle_name,
      email,
      password,
      user_role,
    };
    props.dispatch(props.createUser(userData));
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create User Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={onSubmit}>
          <DialogTitle>Create User Account</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>

            <TextField
              required
              autoFocus
              margin="dense"
              id="last_name"
              label="Last name"
              fullWidth
              variant="outlined"
              name="last_name"
              value={last_name}
              onChange={onChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="first_name"
              label="First name"
              fullWidth
              variant="outlined"
              name="first_name"
              value={first_name}
              onChange={onChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="suffix"
              label="Suffix"
              fullWidth
              variant="outlined"
              name="suffix"
              value={suffix}
              onChange={onChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="middle_name"
              label="Middle name"
              fullWidth
              variant="outlined"
              name="middle_name"
              value={middle_name}
              onChange={onChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={email}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              margin="dense"
              id="password"
              label="New Password"
              variant="outlined"
              name="password"
              value={password}
              onChange={onChange}
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>User Role</InputLabel>
              <Select
                id="user_role"
                label="User Role"
                name="user_role"
                value={user_role}
                onChange={onChange}
              >
                <MenuItem value={"Administrator"}>Administrator</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="suvmit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UserCreateModal;
