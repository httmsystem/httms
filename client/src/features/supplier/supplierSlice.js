import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supplierService from "./supplierService.js";

const initialState = {
  suppliers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Supplier
export const createSuppliers = createAsyncThunk(
  "suppliers/create",
  async (suppliers, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await supplierService.createSuppliers(suppliers, token);
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

// Get Supplier
export const getSuppliers = createAsyncThunk(
  "suppliers/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await supplierService.getSuppliers(token);
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

// Delete Supplier
export const deleteSuppliers = createAsyncThunk(
  "suppliers/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await supplierService.deleteSuppliers(id, token);
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

export const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers.push(action.payload);
      })
      .addCase(createSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = state.suppliers.filter(
          (suppliers) => suppliers._id !== action.payload.id
        );
      })
      .addCase(deleteSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = supplierSlice.actions;
export default supplierSlice.reducer;
