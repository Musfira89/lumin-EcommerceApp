import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailPage = () => {
  const { category, id } = useParams(); // Extract both category and id
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("Category from URL:", category);
    console.log("Product ID from URL:", id);

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/products/details/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(data:image/png;base64,${product.image})` }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold tracking-wide">{product.name}</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">{product.description}</p>
          <p className="mt-6 text-4xl font-bold">Rs {product.price}</p>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex justify-center items-center">
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            className="object-contain h-full w-full"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            <p className="mt-4 text-2xl font-bold text-gray-800">Rs {product.price}</p>

            {/* Additional Information */}
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Key Ingredients</h3>
                <p className="mt-2 text-gray-600">{product.ingredients || "Details not available."}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
                <div className="flex items-center mt-2">
                  <div className="text-yellow-500 text-lg">★★★★★</div>
                  <p className="ml-2 text-gray-600">4.5/5 (200 reviews)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200">-</button>
              <input
                type="text"
                className="w-12 text-center border-0 focus:ring-0 focus:outline-none"
                value="1"
                readOnly
              />
              <button className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200">+</button>
            </div>

            {/* Action Buttons */}
            <button className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Placeholder for dynamic products */}
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <div className="h-32 w-32 bg-gray-200 rounded-md mb-4"></div>
              <h4 className="text-lg font-medium text-gray-800">Product {item}</h4>
              <p className="text-gray-600 mt-2">Rs 500</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
