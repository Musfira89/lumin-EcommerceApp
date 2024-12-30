import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "./Components/Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import DetailPage from "./pages/DetailPage";
import AdminForm from "./Admin/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:category/:productId" element={<DetailPage />} />
          <Route path="/admin" element={<AdminForm />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
