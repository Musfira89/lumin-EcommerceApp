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
    description: "",
    how_to_use: "",
  });

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG and PNG files are allowed.");
      return;
    }
    setImage(file);
    setImageName(file ? file.name : "");
  };

  const handleAdditionalImagesUpload = (e) => {
    const files = Array.from(e.target.files);
  
    if (files.length > 5) {
      toast.error("You can upload a maximum of 5 additional images.");
      return;
    }
  
    const invalidFiles = files.filter(
      (file) => !["image/jpeg", "image/png"].includes(file.type)
    );
  
    if (invalidFiles.length > 0) {
      toast.error("Only JPG and PNG files are allowed for additional images.");
      return;
    }
  
    setAdditionalImages((prevImages) => [...prevImages, ...files]);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      toast.error("Main image is required.");
      return;
    }
  
    const formData = new FormData();
    
    // Append product details
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });
  
    // Append main image
    formData.append("mainImage", image);
  
    // Append additional images
    additionalImages.forEach((file, index) => {
      formData.append(`additionalImages`, file);
    });
  
    // Debugging: Check FormData content
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
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
        description: "",
        how_to_use: "",
      });
      setImage(null);
      setImageName("");
      setAdditionalImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
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
      <Typography
        variant="h4"
        sx={{ textAlign: "center", mb: 3, color: "black", fontWeight: "bold" }}
      >
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
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={product.description}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="How to Use"
          name="how_to_use"
          value={product.how_to_use}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Main Image (JPG/PNG)
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
            required
          />
        </Button>
        {imageName && (
          <Typography sx={{ mb: 2 }}>Uploaded: {imageName}</Typography>
        )}
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Additional Images (Max 5)
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleAdditionalImagesUpload}
          />
        </Button>
        {additionalImages.length > 0 && (
          <Typography sx={{ mb: 2 }}>
            Additional Images:{" "}
            {additionalImages.map((file) => file.name).join(", ")}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "black", color: "white" }}
        >
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AdminForm;
