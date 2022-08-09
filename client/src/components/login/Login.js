import React, { useState, useEffect } from "react";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [formData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/admin/");
    } else {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(formData));
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className="container">
      <Box
        className="form"
        sx={{
          width: 300,
          height: 300,
        }}
      >
        <form onSubmit={onSubmit}>
          <h3>Log in</h3>
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
            required
            fullWidth
            margin="dense"
            id="password"
            label="Password"
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

          <Button
            sx={{
              mt: "10px",
            }}
            fullWidth
            type="suvmit"
            variant="contained"
          >
            LOGIN
          </Button>
          <p className="forgot-password text-right"></p>
        </form>
      </Box>
    </div>
  );
};

export default Login;
