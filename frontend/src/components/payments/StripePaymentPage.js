import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OHAZ0L9GGLZxmilJ8gWLMq2aaT2qSGpJqE7BDARnA5cZyA6ykWvqKhG2I8IlRTT1Q2WXN7qlGRDLiZVp93q1oBM00WUjunINo"
);

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "pi_3OdtqwL9GGLZxmil0Bmyb5vR_secret_V4h1chAM43TSwOe9UR2shNaeq",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}
