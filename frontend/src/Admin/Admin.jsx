import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { toast } from "react-toastify";

const AdminForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    rating: "",
    reviews: "",
  });

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("rating", product.rating);
    formData.append("reviews", product.reviews);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8082/api/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      setProduct({
        name: "",
        category: "",
        price: "",
        discount: "",
        rating: "",
        reviews: "",
      });
      setImage(null);
      setImageName("");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "black", fontWeight: "bold" }}>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        >
          <MenuItem value="skin">Skin</MenuItem>
          <MenuItem value="hair">Hair</MenuItem>
          <MenuItem value="body">Body</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Discount"
          name="discount"
          value={product.discount}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Rating"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reviews"
          name="reviews"
          value={product.reviews}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Image (JPG/PNG)
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} required />
        </Button>
        {imageName && <Typography sx={{ mb: 2 }}>Uploaded: {imageName}</Typography>}
        <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: "black", color: "white" }}>
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AdminForm;
