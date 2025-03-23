import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">
        Welcome to <span className="text-blue-400">ENCRYPTOWEB</span>
      </h1>
      <p className="text-base md:text-lg text-gray-300 mb-6 text-center px-4 md:px-0">
        Explore various encryption and Linux tools to enhance security and efficiency.
      </p>

      {/* AI Chatbot Card - Positioned Centered */}
      <div className="w-full max-w-lg mb-6 flex justify-center">
        <Link
          to="/chatbot"
          className="group block w-full bg-gradient-to-r from-purple-700 to-indigo-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-purple-600 hover:border-indigo-400 relative overflow-hidden text-center"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-800 via-indigo-600 to-purple-800 blur-xl opacity-30"></div>
          <h2 className="relative text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-yellow-300">
            AI Chatbot
          </h2>
          <p className="relative text-gray-200 text-sm md:text-base">
            Ask about ciphers, Linux commands, and CTF challenges with our AI-powered assistant.
          </p>
        </Link>
      </div>

      {/* Responsive Grid Layout for Other Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Cipher Tools Card */}
        <Link
          to="/ciphertools"
          className="group block bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-gray-700 hover:border-blue-400"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-blue-400">
            Cipher Tools
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Encrypt, decrypt, and analyze ciphers with our powerful tools.
          </p>
        </Link>

        {/* Linux Tools Card */}
        <Link
          to="/linuxtools"
          className="group block bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-gray-700 hover:border-green-400"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-green-400">
            Linux Tools
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Essential Linux tools for system administration and security.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default Home;
