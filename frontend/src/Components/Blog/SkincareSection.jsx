import React from 'react';
import skincareImg from '../../assets/Skin/skin2.jpg';

const SkincareSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 p-10 md:p-16 rounded-lg shadow-xl gap-28">
      {/* Left Image Section */}
      <div className="flex-1 max-w-md md:max-w-lg">
        <img
          src={skincareImg}
          alt="Skincare Product"
          className="rounded-lg shadow-lg transform "
        />
      </div>

      {/* Right Content Section */}
      <div className="flex-1 text-center md:text-left max-w-lg">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
          Revitalize Your Skin Naturally
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
          Discover the secret to glowing, healthy skin with our all-natural
          skincare solutions. Science-backed and enriched with the goodness of
          nature, for a radiant you.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default SkincareSection;
