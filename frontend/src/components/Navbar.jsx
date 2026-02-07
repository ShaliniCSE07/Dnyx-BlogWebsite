import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Dnyx<span className="text-gray-800">Blog</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;