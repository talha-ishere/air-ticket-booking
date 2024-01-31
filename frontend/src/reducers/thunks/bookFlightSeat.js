import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const bookFlightSeat = createAsyncThunk("book/bookFlightSeat", async (payload, thunkAPI) => {
  console.log(payload);
  const token = Cookies.get("jwt");

  let params = {};
  //   if (payload?.params) {
  //     params = payload.params;
  //   }
  //   console.log(params);

  try {
    let response = await axios.patch(
      `http://127.0.0.1:5000/seats/bookFlightSeat/${payload?.seatId}`,
      {
        payload,
      },
      {
        //   params: params,
        withCredentials: true,
        headers: {
          Authorization: `${token}`, // Include your JWT token in the Authorization header
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err?.response?.data || "Something went Wrong");
    return { status: false, message: err?.response?.data || "Something went Wrong" };
  }
});
