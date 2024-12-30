import React, { useState } from "react";
import productData from "./data";

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState("skin");

  return (
    <div className="p-8 flex flex-col items-center">
      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {Object.keys(productData).map((category) => (
          <button
            key={category}
            className={`px-12 py-2 text-white font-semibold rounded-lg transition-all ${activeCategory === category
                ? "bg-black shadow-lg transform scale-105"
                : "bg-gray-400 hover:bg-gray-500 hover:shadow-md"
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-7xl">
        {productData[activeCategory].map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-md shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl w-[94%] relative"
          >
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
                {product.discount}% OFF
              </div>
            )}

            {/* Product Image */}
            <div className="h-56 bg-gray-100 rounded-md flex justify-center items-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <h3 className="mt-4 text-xl font-bold text-gray-800">{product.name}</h3>
            {product.discount ? (
              <div className="mt-2 text-lg">
                <span className="text-red-500 font-bold">
                  Rs {product.price - (product.price * product.discount) / 100}
                </span>
                <span className="line-through text-gray-400 ml-2">
                  Rs {product.price}
                </span>
              </div>
            ) : (
              <p className="text-gray-600 text-lg mt-2">Rs {product.price}</p>
            )}

            {/* Ratings */}
            <div className="flex items-center mt-2">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Action Button */}
            <button className="mt-4 px-5 py-2 w-full bg-black text-white rounded-md transition-all hover:bg-gray-500 ">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
