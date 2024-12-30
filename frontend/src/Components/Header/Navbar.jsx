import React from 'react';

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">rhode</h1>

        <nav>
          <ul className="flex space-x-6">
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Futures</a></li>
          </ul>
        </nav>

        <div className="flex space-x-4">
          <button>Search</button>
          <button>Account</button>
          <button>Cart (2)</button>
        </div>
      </div>
    </header>
  );
};

export default Header;