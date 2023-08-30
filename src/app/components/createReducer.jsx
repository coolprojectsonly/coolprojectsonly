"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your async thunk with curried function
export const fetchData = createAsyncThunk(
  "/post/fetchdata",
  async ({ code, text }) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", "auto");
    encodedParams.set("target_language", code);
    encodedParams.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "35360dea7cmshdbe7fec6300c773p10ff91jsnf1424cb37790",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    return response.data;
  }
);

const createReducer = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
        state.error = "error";
      });
  },
});

export default createReducer;
