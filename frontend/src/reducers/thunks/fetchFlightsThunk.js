import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFlightsThunk = createAsyncThunk("flights/fetchFlights", async (payload, thunkAPI) => {
  console.log(payload);
  let params = {};
  //   if (payload.term) {
  //     params.term = payload.term;
  //   }
  if (payload?.term) {
    params.term = payload.term;
  }
  if (payload?.page) {
    params.page = payload.page;
  }
  params.limit = 6;
  try {
    let response = await axios.get("http://127.0.0.1:5000/flight/getAllFlights", {
      params: params,
      // withCredentials: true,
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err?.response?.data || "Something went Wrong");
    return { status: false, message: err?.response?.data || "Something went Wrong" };
  }
});
