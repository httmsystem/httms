import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adjustmentService from "./adjustmentService.js";

const initialState = {
  adjustments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createAdjustment = createAsyncThunk(
  "adjustments/create",
  async (adjustments, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adjustmentService.createAdjustment(adjustments, token);
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

export const getAdjustment = createAsyncThunk(
  "adjustments/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adjustmentService.getAdjustment(token);
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

export const adjustmentSlice = createSlice({
  name: "adjustments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAdjustment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdjustment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adjustments.push(action.payload);
      })
      .addCase(createAdjustment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdjustment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdjustment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adjustments = action.payload;
      })
      .addCase(getAdjustment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adjustmentSlice.actions;
export default adjustmentSlice.reducer;
