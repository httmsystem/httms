import React, { memo } from "react";
import { TextField } from "@mui/material";

export default memo(function BookingMemoTextfield(props) {
  return (
    <div data-tempid={props.id}>
      <TextField
        sx={{ mt: 0.5 }}
        size="small"
        autoComplete="off"
        fullWidth
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
});
