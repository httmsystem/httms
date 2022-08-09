import utilityService from "./utilityService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  utilitys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createUtility = createAsyncThunk(
  "utilitys/create",
  async (utilitys, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await utilityService.createUtility(utilitys, token);
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

export const getUtility = createAsyncThunk(
  "utilitys/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await utilityService.getUtility(token);
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

export const utilitySlice = createSlice({
  name: "utilitys",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUtility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUtility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.utilitys.push(action.payload);
      })
      .addCase(createUtility.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUtility.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUtility.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.utilitys = action.payload;
      })
      .addCase(getUtility.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = utilitySlice.actions;
export default utilitySlice.reducer;
