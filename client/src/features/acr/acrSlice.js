import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import acrService from "./acrService.js";

const initialState = {
  acrs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createAcr = createAsyncThunk(
  "acrs/create",
  async (acrs, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await acrService.createAcr(acrs, token);
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

export const getAcr = createAsyncThunk("acrs/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await acrService.getAcr(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const acrSlice = createSlice({
  name: "acrs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAcr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAcr.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.acrs.push(action.payload);
      })
      .addCase(createAcr.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAcr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcr.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.acrs = action.payload;
      })
      .addCase(getAcr.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = acrSlice.actions;
export default acrSlice.reducer;
