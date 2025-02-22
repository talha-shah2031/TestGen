import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">TestGen</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
              {location.pathname === '/' && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600"
                  layoutId="navbar-underline"
                />
              )}
            </Link>
            <Link
              to="/generator"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/generator' ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Generator</span>
              {location.pathname === '/generator' && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600"
                  layoutId="navbar-underline"
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;