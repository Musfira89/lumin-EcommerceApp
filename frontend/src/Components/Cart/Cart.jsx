import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 20, quantity: 1 },
    { id: 2, name: 'Product 2', price: 15, quantity: 2 },
    { id: 3, name: 'Product 3', price: 30, quantity: 1 },
  ]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              {/* Product Name */}
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between items-center pt-4">
            <h3 className="text-lg font-medium">Total:</h3>
            <p className="text-xl font-bold">${getTotalPrice().toFixed(2)}</p>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
