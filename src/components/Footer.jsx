import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 border-t-2 border-blue-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-white mb-4 md:mb-0">
          ENCRYPTOWEB
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/ciphertools" className="hover:text-blue-400 transition-colors">Cipher Tools</Link>
          <Link to="/linuxtools" className="hover:text-blue-400 transition-colors">Linux Tools</Link>
        </nav>
      </div>

      {/* Social Media Icons */}
      <div className="mt-6 flex justify-center space-x-6">
      {/* <a role="button" className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaFacebook /></a>
      <a role="button" className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaTwitter /></a>
      <a role="button" className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaLinkedin /></a>
      <a role="button" className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaGithub /></a> */}
      <button className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaFacebook /></button>
      <button className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaTwitter /></button>
      <button className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaLinkedin /></button>
      <button className="text-gray-400 hover:text-blue-400 transition-colors text-xl"><FaGithub /></button>

      </div>

      {/* Footer Bottom Section */}
      <div className="mt-6 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} EncryptoWeb. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
