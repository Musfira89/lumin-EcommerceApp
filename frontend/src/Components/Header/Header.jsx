import React from 'react';
import glassImage from '../../assets/Skin/skin1.png'; 

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-black text-white flex items-center justify-center">
      <img
        src={glassImage}
        alt="Glass with Glazing Milk"
        className="object-cover w-full h-full opacity-50"
      />
      <div className="absolute text-center">
        <p className="text-lg">A tini splash of Glazing Milk.</p>
      </div>
    </div>
  );
};

export default HeroSection;