import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      console.log("Cart Items:", cart);
      // Create payment intent on the backend
      const { data } = await axios.post("http://localhost:8082/api/payments/checkout", {
        cartItems: cart,
      });
      


      // Confirm payment on the frontend
      const { clientSecret } = data;
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (paymentResult.error) {
        setError(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Payment error:", error.message);
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-4">
      <CardElement className="border p-3 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
