import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from '../../../public/logo.png'; // Ensure the path to your logo is correct

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12" />
        </div>
        {/* Navbar */}
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-black font-medium">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-black font-medium">
            Shop
          </a>
          <a href="#" className="text-gray-600 hover:text-black font-medium">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-black font-medium">
            Contact
          </a>
        </nav>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-600 hover:text-black text-lg cursor-pointer" />
          <FaShoppingCart className="text-gray-600 hover:text-black text-lg cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
