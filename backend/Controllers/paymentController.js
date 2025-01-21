import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller for creating a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Debugging log
    console.log("Received Cart Items:", cartItems);

    if (!Array.isArray(cartItems)) {
      throw new Error("cartItems must be an array");
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to smallest currency unit (cents)
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: error.message });
  }
};
