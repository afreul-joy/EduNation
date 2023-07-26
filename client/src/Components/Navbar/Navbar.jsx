import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="text-2xl font-bold">
              EDUNATION Bookstore
            </Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/browse" className="hover:text-gray-300">Browse Books</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
