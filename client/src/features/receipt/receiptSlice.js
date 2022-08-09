import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import receiptService from "./receiptService.js";

const initialState = {
  receipts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Receipt
export const createReceipt = createAsyncThunk(
  "receipts/create",
  async (receipts, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.createReceipt(receipts, token);
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

// Get Receipt
export const getReceipt = createAsyncThunk("receipts/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await receiptService.getReceipt(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Receipt
export const updateReceipt = createAsyncThunk(
  "receipts/update",
  async (receipts, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await receiptService.updateReceipt(receipts, token);
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

export const receiptSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receipts.push(action.payload);
        
      })
      .addCase(createReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.receipts = action.payload;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateReceipt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessReceiptUpdate = true;
        state.receipts = action.payload;
      })
      .addCase(updateReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = receiptSlice.actions;
export default receiptSlice.reducer;
