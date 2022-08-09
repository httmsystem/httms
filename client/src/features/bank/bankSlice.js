import bankService from "./bankService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    banks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };
  

  export const createBank = createAsyncThunk(
    "banks/create",
    async (banks, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await bankService.createBank(banks, token);
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

  export const getBank = createAsyncThunk("banks/get", async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bankService.getBank(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });

  export const bankSlice = createSlice({
    name: "banks",
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createBank.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createBank.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.banks.push(action.payload);
        })
        .addCase(createBank.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getBank.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBank.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.banks = action.payload;
        })
        .addCase(getBank.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        });
    },
  });
  
  export const { reset } = bankSlice.actions;
  export default bankSlice.reducer;
  
  