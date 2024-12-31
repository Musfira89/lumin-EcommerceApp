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
    return <p>Loading...</p>;
  }
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-md shadow-lg">
        {/* Product Image */}
        <div className="h-64 bg-gray-100 rounded-md flex justify-center items-center overflow-hidden">
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            className="h-full object-contain"
          />
        </div>

        {/* Product Details */}
        <h2 className="mt-6 text-3xl font-bold text-gray-800">{product.name}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 text-xl font-bold text-gray-800">Rs {product.price}</p>
        <button className="mt-6 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default DetailPage;
