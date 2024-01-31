import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const createPaymentIntent = createAsyncThunk("payments/createPaymentIntent", async (payload, thunkAPI) => {
  console.log(payload);
  try {
    let paymentSecret = await axios.post("http://127.0.0.1:5000/payment/create-payment-intent", payload, {
      withCredentials: true,
    });

    return paymentSecret;
  } catch (err) {
    console.log(err?.response?.data || "Something went Wrong");
    return { status: false, message: err?.response?.data || "Something went Wrong" };
  }
});
