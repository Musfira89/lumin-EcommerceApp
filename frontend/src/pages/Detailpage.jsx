import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/CartContext";

import { Typography, Box, Divider, IconButton } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RelatedProduct from "./Relatedproduct";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/products/details/${id}`
        );
        setProduct(response.data);
        setSelectedImage(response.data.image); // Set the first image as default
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-xl text-gray-700">Loading product details...</p>
      </div>
    );
  }

  return (
    <Box
      minHeight="100vh"
      bgcolor="white"
      fontFamily="Poppins, sans-serif"
      py={4}
    >
      <Box
        maxWidth="lg"
        mx="auto"
        display="grid"
        gridTemplateColumns={{ xs: "1fr", lg: "2fr 3fr" }}
        gap={4}
        px={2}
      >
        {/* Left Section: Images */}
        <Box display="flex" flexDirection="row" gap={2}>
          {/* Thumbnails */}
          <Box display="flex" flexDirection="column" gap={1}>
            {[product.image, ...(product.additionalImages || [])].map(
              (img, index) => (
                <img
                  key={index}
                  src={`data:image/png;base64,${img}`}
                  alt={`Product Thumbnail ${index + 1}`}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    border:
                      selectedImage === img
                        ? "2px solid #000"
                        : "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedImage(img)}
                />
              )
            )}
          </Box>

          {/* Main Image */}
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid #ccc"
            borderRadius="8px"
            p={2}
            boxShadow={2}
          >
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        {/* Right Section: Product Details */}
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Product Title and Rating */}
          <Box>
            <Typography variant="h4" fontWeight="bold" color="textPrimary">
              {product.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Typography variant="body1" color="secondary">
                ★★★★★
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.reviews || 0} reviews
              </Typography>
            </Box>
          </Box>

          {/* Product Description */}
          <Typography variant="body1" color="textSecondary">
            {product.description}
          </Typography>

          <Divider />

          {/* Price */}
          <Box>
            {product.discount ? (
              <Box display="flex" alignItems="baseline" gap={2}>
                <Typography variant="h5" color="error" fontWeight="bold">
                  Rs {product.price - (product.price * product.discount) / 100}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  Rs {product.price}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5" color="textPrimary" fontWeight="bold">
                Rs {product.price}
              </Typography>
            )}
          </Box>

          {/* Quantity Selector and Buttons */}
          <div className="flex items-center space-x-4 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100">
                -
              </button>
              <input
                type="text"
                className="w-12 text-center border-0 bg-white text-gray-900 focus:ring-0 focus:outline-none"
                value="1"
                readOnly
              />
              <button className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-100">
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="flex items-center px-8 py-3 border border-black text-black bg-white rounded-md hover:bg-black hover:text-white transition"
              onClick={() => {
                console.log("Adding to cart:", product);
                addToCart(product);
              }}
            >
              Add to Cart
            </button>

            <button className="flex items-center px-8 py-3 text-white bg-black rounded-md hover:bg-white hover:text-black border border-black transition">
              {<ShoppingBagIcon />}
              Shop Now
            </button>
          </div>

          <Divider />

          {/* Additional Details */}
          <Box>
            <Typography variant="body2" color="textSecondary">
              Free shipping on orders over Rs 2500.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              365-day returns.{" "}
              <Box
                component="a"
                href="#"
                sx={{ textDecoration: "underline", color: "inherit" }}
              >
                Return Policy
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>
      <RelatedProduct />
    </Box>
  );
};

export default DetailPage;
