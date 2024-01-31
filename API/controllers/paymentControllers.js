const stripe = require("stripe")(
  "sk_test_51OHAZ0L9GGLZxmilOWYJJb0PC5VsgYK1tco8Vn7SBh8OK1pK9WL9EnKCcYLTXpbwl2bNJx2AaLvktpzcEwtLAuFg00fvDhVz8G"
);
const axios = require("axios");

exports.createPaymentIntent = async (req, res) => {
  let data = req?.body;
  console.log("Hello", data);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Customer Name:" + "  " + (data && data.name), // Added check
            },
            unit_amount: data?.price, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
    });
    /////////////////////////////

    //////////////////////////////////////////
    res.json(session);
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    });
  }
};
