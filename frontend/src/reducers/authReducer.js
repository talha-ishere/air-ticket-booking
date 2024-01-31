// import { createSlice } from "@reduxjs/toolkit";
// import { loginUser } from "./thunks/loginThunk";

// const initialState = {
//   token: "",
//   isLoading: false,
//   userProfile: "",
//   error: null,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // saveToken: (state, action) => {
//     //   state.token = action.payload;
//     // },
//   },
//   extraReducers: (builder) => {
//     // builder.addCase(getUserProfile.pending, (state) => {
//     //   state.isLoading = true;
//     //   state.error = null;
//     // });
//     builder.addCase(loginUser.fulfilled, (state, action) => {
//       // console.log(action.payload.status);
//       if (action.payload) {
//       }
//       // state.isLoading = false;
//       // state.userProfile = action.payload;
//     });
//     // builder.addCase(getUserProfile.rejected, (state, action) => {
//     //   state.isLoading = false;
//     //   state.error = action.error.message;
//     // });
//   },
// });

// export const {} = authSlice.actions;

// export default authSlice.reducer;
