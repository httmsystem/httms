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

const UserEditModal = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [formData, setUserData] = useState({
    last_name: props.user.last_name,
    first_name: props.user.first_name,
    suffix: props.user.suffix,
    middle_name: props.user.middle_name,
    email: props.user.email,
    password: props.user.password,
    user_role: props.user.user_role,
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

  const editUserHandler = (e) => {
    e.preventDefault();
    props.dispatch(
      props.updateUser({
        _id: props.user._id,
        last_name: formData.last_name,
        first_name: formData.first_name,
        suffix: formData.suffix,
        middle_name: formData.middle_name,
        email: formData.email,
        password: formData.password,
        user_role: formData.user_role,
      })
    );
    props.handleClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <form onSubmit={editUserHandler}>
          <DialogTitle>Update User Account</DialogTitle>
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
              fullWidth
              margin="dense"
              id="password"
              label="New Password"
              variant="outlined"
              name="password"
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
            <Button
              variant="contained"
              color="error"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update User
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UserEditModal;
