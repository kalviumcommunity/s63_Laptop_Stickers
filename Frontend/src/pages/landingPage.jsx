import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] to-[#111827] text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      
      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        {/* Brand Title */}
        <div className="text-2xl font-bold">
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] font-mono tracking-wider">
            Laptop Stickers
          </span>
        </div>
        
        {/* Center Menu */}
        <div className="hidden md:flex space-x-8 font-semibold">
          <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] cursor-pointer">Home</Link>
          <Link to="/gallery" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] cursor-pointer">Explore</Link>
          <Link to="/add-sticker" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] cursor-pointer">Upload</Link>
          <span className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] cursor-pointer">Leaderboard</span>
        </div>
        
        {/* Right Buttons */}
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-105">
              Sign In
            </button>
          </Link>
          <button className="px-6 py-2 border-2 border-green-400 text-green-400 font-semibold rounded-lg hover:bg-green-400 hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-105">
            Sign Up
          </button>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-7xl md:text-9xl font-bold font-mono leading-none">
            <div className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)] animate-pulse">
              WILDEST
            </div>
            <div className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mt-4">
              LAPTOP
            </div>
            <div className="text-pink-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] animate-pulse mt-4">
              STICKERS
            </div>
          </h1>
        </div>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mb-12 font-light leading-relaxed">
          Discover, share, and vote on the most bizarre laptop stickers from around the world. 
          Join the ultimate laptop customization community.
        </p>
        
        {/* CTA Button */}
        <Link to="/gallery">
          <button className="px-12 py-5 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-xl rounded-xl hover:from-cyan-300 hover:to-green-300 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:scale-110 transform font-mono tracking-wider">
            START EXPLORING
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
