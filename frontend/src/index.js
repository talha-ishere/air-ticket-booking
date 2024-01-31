import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/loginView/LoginPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MyBookings from "./components/flightsView/MyBookings";
import StripePaymentPage from "./components/payments/StripePaymentPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/myBookings",
    element: <MyBookings />,
  },
  // {
  //   path: "stripe-payment",
  //   element: <StripePaymentPage />,
  // },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
