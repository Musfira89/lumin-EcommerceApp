import React, { useState, useEffect } from 'react';
import blackLogo from '../../../public/logo.png'; 
import whiteLogo from '../../../public/logo1.png'; 

const Header = () => {
  const [isDarkBackground, setIsDarkBackground] = useState(true); 
  
  useEffect(() => {
    
    setIsDarkBackground(true); 
  }, []);

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <nav>
          <ul className="flex flex-col space-y-2">
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Futures</a></li>
          </ul>
        </nav>

        
        <img
          src={isDarkBackground ? whiteLogo : blackLogo}
          alt="LUMIN.CO"
          className="h-8"
        />

        
        <div className="flex space-x-4">
          <button className="hover:underline">Search</button>
          <button className="hover:underline">Account</button>
          <button className="hover:underline">Cart (2)</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
