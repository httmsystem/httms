import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import psdService from "./psdService.js";

const initialState = {
  psds: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPsd = createAsyncThunk(
  "psds/create",
  async (psds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await psdService.createPsd(psds, token);
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

export const getPsd = createAsyncThunk("psds/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await psdService.getPsd(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update RS
export const updatePsd = createAsyncThunk(
  "psds/update",
  async (psds, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await psdService.updatePsd(psds, token);
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

export const psdSlice = createSlice({
  name: "psds",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPsd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPsd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.psds.push(action.payload);
      })
      .addCase(createPsd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPsd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPsd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.psds = action.payload;
      })
      .addCase(getPsd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePsd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePsd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessPsdUpdate = true;
        state.psds = action.payload;
      })
      .addCase(updatePsd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = psdSlice.actions;
export default psdSlice.reducer;
