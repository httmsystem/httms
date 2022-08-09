import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import liquidationService from "./liquidationService";

const initialState = {
  liquidations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Liquidation
export const createLiquidation = createAsyncThunk(
  "liquidations/create",
  async (liquidations, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await liquidationService.createLiquidation(liquidations, token);
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

// Get Liquidation
export const getLiquidation = createAsyncThunk(
  "liquidations/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await liquidationService.getLiquidation(token);
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

// Update Liquidations 
export const updateLiquidation = createAsyncThunk(
  "liquidations/update",
  async (liquidations, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await liquidationService.updateLiquidation(liquidations, token);
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

export const liquidationSlice = createSlice({
  name: "liquidations",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLiquidation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLiquidation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.liquidations.push(action.payload);
      })
      .addCase(createLiquidation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLiquidation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLiquidation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.liquidations = action.payload;
      })
      .addCase(getLiquidation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLiquidation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLiquidation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessUpdateLiquidations = true;
        state.liquidations = action.payload;
      })
      .addCase(updateLiquidation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = liquidationSlice.actions;
export default liquidationSlice.reducer;
