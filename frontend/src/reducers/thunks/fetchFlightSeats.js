import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFlightSeats = createAsyncThunk("seats/fetchFlightSeats", async (payload, thunkAPI) => {
  console.log(payload);
  let params = {};
  if (payload?.params) {
    params = payload.params;
  }
  console.log(params);

  try {
    let response = await axios.get(`http://127.0.0.1:5000/seats/fetchFlightSeats/${payload?.params}`, {
      //   params: params,

      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err?.response?.data || "Something went Wrong");
    return { status: false, message: err?.response?.data || "Something went Wrong" };
  }
});
