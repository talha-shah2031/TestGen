import React from 'react';
import { BookOpen, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">TestGen</span>
            </Link>
            <p className="mt-4 text-gray-500 text-sm">
              Create comprehensive test papers in minutes with our advanced AI-powered generator.
              Perfect for teachers and educational institutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-500 hover:text-indigo-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-base text-gray-500 hover:text-indigo-600">
                  Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="flex items-center text-gray-500 hover:text-indigo-600">
                  <Github className="h-5 w-5 mr-2" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-500 hover:text-indigo-600">
                  <Twitter className="h-5 w-5 mr-2" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-500 hover:text-indigo-600">
                  <Linkedin className="h-5 w-5 mr-2" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} TestGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;