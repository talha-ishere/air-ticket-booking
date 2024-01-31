import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk("users/loginUser", async (payload, thunkAPI) => {
  try {
    let user = await axios.post(
      "http://127.0.0.1:5000/user/login",
      {
        email: payload.email,
        password: payload.password,
      },
      {
        withCredentials: true,
      }
    );
    Cookies.remove("*");
    const token = user?.data?.token || "";
    Cookies.set("jwt", token, { expires: 1, secure: true });
    Cookies.set("userName", user.data.data.user.name);

    return user;
  } catch (err) {
    console.log(err?.response?.data || "Something went Wrong");
    return { status: false, message: err?.response?.data || "Something went Wrong" };
  }
});
