import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import releaseService from "./releaseService";

const initialState = {
  releases: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create New Invoice
export const createRelease = createAsyncThunk(
  "releases/create",
  async (releases, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await releaseService.createRelease(releases, token);
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

// Get Invoice
export const getRelease = createAsyncThunk(
  "releases/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await releaseService.getRelease(token);
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

// Update Invoice
export const updateRelease = createAsyncThunk(
  "releases/update",
  async (releases, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await releaseService.updateRelease(releases, token);
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

export const releaseSlice = createSlice({
  name: "releases",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRelease.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRelease.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.releases.push(action.payload);
      })
      .addCase(createRelease.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRelease.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelease.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.releases = action.payload;
      })
      .addCase(getRelease.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRelease.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRelease.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessReleaseUpdate = true;
        state.releases = action.payload;
      })
      .addCase(updateRelease.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = releaseSlice.actions;
export default releaseSlice.reducer;
