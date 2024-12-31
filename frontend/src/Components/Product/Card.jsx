import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const ProductSection = () => {
  const [category, setCategory] = useState("skin");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShopNow = (product) => {
    navigate(`/${category}/product/${product.id}`); // Include category in the route
  };


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8082/api/products/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="p-8 flex flex-col items-center">
      <div className="flex justify-center gap-4 mb-8">
        {["skin", "hair", "body"].map((cat) => (
          <button
            key={cat}
            className={`px-12 py-2 text-white font-semibold rounded-lg transition-all ${category === cat
              ? "bg-black shadow-lg transform scale-105"
              : "bg-gray-400 hover:bg-gray-500 hover:shadow-md"
              }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full max-w-7xl">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-md shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl w-[94%] relative"
            >
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
                  {product.discount}% OFF
                </div>
              )}

              <div className="h-56 bg-gray-100 rounded-md flex justify-center items-center overflow-hidden">
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt={product.name}
                  className="h-full object-contain"
                />

              </div>

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

              <div className="flex items-center mt-2">
                {"★".repeat(Math.floor(product.rating || 0))}
                {"☆".repeat(5 - Math.floor(product.rating || 0))}
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Shop Now Button */}
              <button
                onClick={() => handleShopNow(product)}
                className="mt-4 px-5 py-2 w-full bg-black text-white rounded-md transition-all hover:bg-gray-500"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSection;
