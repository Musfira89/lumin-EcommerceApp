import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../pages/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const AddtoCart = () => {
  const { cart, updateCartItem, removeCartItem } = useContext(CartContext); // Access cart context
  const [isCartVisible, setIsCartVisible] = useState(true); // State to toggle cart visibility
  const [isCheckout, setIsCheckout] = useState(false); // State for checkout
  const [cartTotal, setCartTotal] = useState(0); // State for total price

  // Calculate total whenever the cart updates
  useEffect(() => {
    const total = cart.reduce(
      (sum, item) =>
        sum + (item.price - (item.price * (item.discount || 0)) / 100) * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cart]);

  // Handle closing the cart
  const closeCart = () => {
    setIsCartVisible(false);
  };

  // Handle checkout button
  const handleCheckout = () => {
    setIsCheckout(true);
  };

  // Handle quantity change
  const updateQuantity = (itemId, quantity) => {
    if (quantity > 0) {
      updateCartItem(itemId, quantity);
    }
  };

  if (!isCartVisible) return null; // Do not render the cart if it's not visible

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start bg-black bg-opacity-50">
      <div className="w-[40%] bg-white text-black shadow-xl p-10 rounded-lg border border-gray-200 mt-10 mr-10">
        {/* Cart Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-2xl text-gray-800">
            {isCheckout ? "Checkout" : "Your Cart"}
          </h2>
          <button
            className="text-gray-600 text-2xl"
            onClick={closeCart}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        {isCheckout ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm total={cartTotal} />
          </Elements>
        ) : cart.length === 0 ? (
          <p className="text-gray-500 text-sm">Your cart is currently empty.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-start gap-6"
                >
                  {/* Product Details */}
                  <div className="flex gap-6">
                    {/* Product Thumbnail */}
                    {item.image ? (
                      <img
                        src={`data:image/png;base64,${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-md">
                        <span className="text-gray-500 text-sm">No Image</span>
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                      <p className="text-sm text-gray-800 font-semibold">
                        {item.discount ? (
                          <div className="mt-2 text-sm">
                            <span className="text-red-500 font-bold">
                              Rs{" "}
                              {(
                                item.price -
                                (item.price * item.discount) / 100
                              ).toLocaleString()}
                            </span>
                            <span className="line-through text-gray-400 ml-2">
                              Rs {item.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-600 text-lg mt-2">
                            Rs {item.price.toLocaleString()}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-sm bg-gray-200 rounded-md"
                      >
                        -
                      </button>
                      <span className="text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-sm bg-gray-200 rounded-md"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-red-500 mt-2 text-sm hover:underline"
                      onClick={() => removeCartItem(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total & Buttons */}
            <div className="mt-8">
              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-semibold text-gray-800 text-lg">
                  Total:
                </span>
                <span className="font-bold text-xl text-gray-800">
                  Rs {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between mt-6">
                <button className="w-[48%] bg-black text-white py-3 rounded-md shadow-md text-lg font-medium hover:bg-gray-800 transition">
                  View Cart
                </button>
                <button
                  className="w-[48%] bg-white text-black py-3 rounded-md shadow-md text-lg font-medium border border-black hover:bg-gray-100 transition"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddtoCart;
