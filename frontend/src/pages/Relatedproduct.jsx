import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const RelatedProduct = () => {
  const { category, productId } = useParams();  // Get category and productId from the URL
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8082/api/products/${category}`);
        // Filter out the current product from the related products list
        setRelatedProducts(response.data.filter(product => product.id !== parseInt(productId)));
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, productId]);

  return (
    <div className="p-40 mt-24">
      {/* Adjusted to align the heading to the left */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Related Products</h2>
  
      <div className="flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-md shadow-md "
            >
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-md">
                  {product.discount}% OFF
                </div>
        
  
              <div className="h-40 bg-gray-100 rounded-md flex justify-center items-center overflow-hidden">
                <img
                  src={`data:image/png;base64,${product.image}`}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </div>
  
              <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
              {product.discount ? (
                <div className="mt-1 text-sm">
                  <span className="text-red-500 font-bold">
                    Rs {product.price - (product.price * product.discount) / 100}
                  </span>
                  <span className="line-through text-gray-400 ml-2">
                    Rs {product.price}
                  </span>
                </div>
              ) : (
                <p className="text-gray-600 text-sm mt-1">Rs {product.price}</p>
              )}
  
              {/* Rating */}
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
      </div>
    </div>
  );
  
};

export default RelatedProduct;
