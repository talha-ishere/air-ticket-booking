import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserBookings = createAsyncThunk("bookings/fetchUserBookings", async (payload, thunkAPI) => {
  const token = Cookies.get("jwt");
  console.log(token);

  let params = {};

  try {
    if (token) {
      let response = await axios.get(
        `http://127.0.0.1:5000/bookings/fetchUserBookings`,

        {
          //   params: params,
          withCredentials: true,
          headers: {
            Authorization: `${token}`, // Include your JWT token in the Authorization header
          },
        }
      );
      return response;
    }
  } catch (err) {
    console.log(err?.response?.data || "Something went Wrong");
    return { status: false, message: err?.response?.data || "Something went Wrong" };
  }
});
