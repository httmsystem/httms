import React from "react";
import "../../index.css";
import {
  Grid,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";

const BookingCreateModalSelectCustomer = (props) => {
  return (
    <div>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={16}>
          <h3> </h3>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={16} sx={{ fontSize: 13.5 }}>
        <Grid item xs={5}>
          <b>Customer Type:</b>
          <Select
            fullWidth
            sx={{ mt: 0.5 }}
            size="small"
            required
            name="customer_type"
            value={props.customer_data.customer_type}
            onChange={props.set_customer_data_onChange}
          >
            <MenuItem value="WALK IN">WALK-IN</MenuItem>
            <MenuItem value="SUB-AGENT">SUB-AGENT</MenuItem>
            <MenuItem value="CORPORATE">CORPORATE</MenuItem>
          </Select>
        </Grid>
        {props.customer_data.customer_type === "WALK IN" && (
          <Grid item xs={5}>
            <b>Misc. Name:</b>
            <TextField
              fullWidth
              sx={{ mt: 0.5 }}
              size="small"
              value={props.customer_data.misc_name}
              name="misc_name"
              id="misc_name"
              onChange={props.set_customer_data_onChange}
            />
          </Grid>
        )}
        {props.customer_data.customer_type === "SUB-AGENT" && (
          <Grid item xs={5}>
            <b>Sub-Agent Account</b>

            <Autocomplete
              size="small"
              options={props.customer}
              getOptionLabel={(option) => option.acct_name}
              isOptionEqualToValue={(option, value) =>
                option.acct_name === value.acct_name
              }
              value={props.customer_data.acct_data}
              onChange={(e, new_acct_data) => {
                props.set_customer_data({
                  ...props.customer_data,
                  acct_data: new_acct_data,
                });
              }}
              disableClearable
              disablePortal
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  sx={{ mt: 0.5 }}
                />
              )}
            />
          </Grid>
        )}
        {props.customer_data.customer_type === "CORPORATE" && (
          <Grid item xs={5}>
            <b>Corporate Account</b>

            <Autocomplete
              size="small"
              options={props.customer}
              getOptionLabel={(option) => option.acct_name}
              isOptionEqualToValue={(option, value) =>
                option.acct_name === value.acct_name
              }
              value={props.customer_data.acct_data}
              onChange={(e, new_acct_data) => {
                props.set_customer_data({
                  ...props.customer_data,
                  acct_data: new_acct_data,
                });
              }}
              disablePortal
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  sx={{ mt: 0.5 }}
                />
              )}
            />
          </Grid>
        )}
        <Grid item xs={6}>
          <b>Handler:</b>
          <Autocomplete
            fullWidth
            sx={{ mt: 0.5 }}
            size="small"
            options={props.user}
            getOptionLabel={(option) =>
              option.first_name + " " + option.last_name
            }
            value={props.handler}
            onChange={(e, new_resa_data) => {
              props.set_handler(new_resa_data);
            }}
            disableClearable
            disablePortal
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </Grid>
      </Grid>

      {props.customer_data.customer_type === "SUB-AGENT" && (
        <>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16}>
              <h3>ACCOUNT DETAILS </h3>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            columns={16}
            sx={{ mb: 1, fontSize: 13.5 }}
          >
            <Grid item xs={8}>
              <b> Account Name </b>
              <TextField
              
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                    backgroundColor: "#ecf0f1",
                  },
                 
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.acct_name
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8}>
              <b> Contact Number </b>

              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                    backgroundColor: "#ecf0f1",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.contact_no
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8}>
              <b> Address </b>

              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                    backgroundColor: "#ecf0f1",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.address
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8}>
              <b> Email </b>

              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                    backgroundColor: "#ecf0f1",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.email
                    : ""
                }
              />
            </Grid>
          </Grid>
        </>
      )}
      {props.customer_data.customer_type === "CORPORATE" && (
        <>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={16}>
              <h3>ACCOUNT DETAILS </h3>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            columns={16}
            sx={{ mb: 1, fontSize: 13.5 }}
          >
            <Grid item xs={8}>
              <b> Account Name </b>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.acct_name
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8}>
              <b> Contact Number </b>

              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.contact_no
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8}>
              <b> Address </b>

              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.address
                    : ""
                }
              />
            </Grid>
            <Grid item xs={8}>
              <b> Email </b>

              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                  mt: 0.5,
                }}
                size="small"
                disabled
                value={
                  props.customer_data.acct_data !== null
                    ? props.customer_data.acct_data.email
                    : ""
                }
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default BookingCreateModalSelectCustomer;
