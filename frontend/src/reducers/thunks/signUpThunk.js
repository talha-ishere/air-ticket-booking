import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
  "users/signup",
  async (payload, thunkAPI) => {
    try {
      let user = await axios.post(
        "http://127.0.0.1:5000/user/signup",
        {
          name: payload.username,
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
        }
      );
      return user;
    } catch (err) {
      console.log(err?.response?.data || "Something went Wrong");
      return {
        status: false,
        message: err?.response?.data || "Something went Wrong",
      };
    }
  }
);
