import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">ENCRYPTOWEB</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Navigation Links */}
        <nav
          className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 transition-transform duration-300 ease-in-out ${isOpen ? "block" : "hidden md:block"}`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 items-center md:items-center">
            <li className="py-2 md:py-0">
              <Link to="/" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/ciphertools" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Cipher Tools</Link>
            </li>
            <li className="py-2 md:py-0">
              <Link to="/linuxtools" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Linux Tools</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;