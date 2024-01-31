// import React, { useState } from "react";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [amount, setAmount] = useState(1000); // Adjust amount as needed
//   const navigate = useNavigate();
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { data } = await axios.post("http://127.0.0.1:5000/payment/create-payment-intent", {
//         amount,
//       });

//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: "Test User",
//           },
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//       } else {
//         console.log("Payment succeeded:", result.paymentIntent);
//         // Redirect the user to a success page or any desired page
//         navigate("/payment-success");
//       }
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay Now
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
