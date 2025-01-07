import React from "react";
import BgImg from "../../assets/Skin/bgImg.jpg";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import logo from "../../../public/logo1.png"; // Ensure the path to your logo is correct

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center p-14 m-5 rounded-lg"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 absolute inset-0 rounded-lg"></div>

      <header className="absolute top-0 left-0 w-full">
  <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between py-6">
    {/* Navbar - Left */}
    <div className="flex items-center space-x-8 flex-1">
      <nav className="flex items-center space-x-8">
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-300"
        >
          Home
        </a>
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-300"
        >
          Shop
        </a>
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-300"
        >
          About
        </a>
        <a
          href="#"
          className="text-white text-lg font-semibold hover:text-gray-300"
        >
          Contact
        </a>
      </nav>
    </div>

    {/* Logo - Center */}
    <div className="flex-1 flex justify-center">
      <img src={logo} alt="Logo" className="h-12" />
    </div>

    {/* Icons - Right */}
    <div className="flex items-center justify-end space-x-6 flex-1">
      <FaSearch className="text-white text-xl cursor-pointer hover:text-gray-300" />
      <FaShoppingCart className="text-white text-xl cursor-pointer hover:text-gray-300" />
    </div>
  </div>

  {/* Space Below Navbar */}
  <div className="h-12"></div>
</header>

      {/* Hero Content */}
      <div className="container mx-auto relative z-10 px-6 lg:px-12 flex items-center h-full">
        <div className="text-left max-w-lg pt-32">
          <h1 className="text-white text-5xl md:text-[50px] font-bold mb-6 leading-tight">
            Discover Radiant Skin
            <br /> with Our Premium Care
          </h1>
          <p className="text-white text-lg md:text-lg mb-6">
            Elevate your skincare routine with products tailored to your needs.
            Feel the difference with every use.
          </p>
          <button className="bg-black text-white font-semibold py-3 px-12 rounded-md hover:bg-gray-800 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
