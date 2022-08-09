import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rsService from "./rsService.js";

const initialState = {
  rss: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New RS
export const createRs = createAsyncThunk(
  "rss/create",
  async (rss, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await rsService.createRs(rss, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Customer
export const getRs = createAsyncThunk("rss/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await rsService.getRs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update RS
export const updateRs = createAsyncThunk(
  "rss/update",
  async (rss, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await rsService.updateRs(rss, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const rsSlice = createSlice({
  name: "rss",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rss.push(action.payload);
      })
      .addCase(createRs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rss = action.payload;
      })
      .addCase(getRs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessRsUpdate = true;
        state.rss = action.payload;
      })
      .addCase(updateRs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = rsSlice.actions;
export default rsSlice.reducer;
