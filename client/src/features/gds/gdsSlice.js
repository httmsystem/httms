import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gdsService from "./gdsService.js";

const initialState = {
  gdss: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createGds = createAsyncThunk(
  "gdss/create",
  async (gdss, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gdsService.createGds(gdss, token);
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

export const getGds = createAsyncThunk("gdss/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await gdsService.getGds(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const gdsSlice = createSlice({
  name: "gdss",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gdss.push(action.payload);
        
      })
      .addCase(createGds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gdss = action.payload;
      })
      .addCase(getGds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = gdsSlice.actions;
export default gdsSlice.reducer;
