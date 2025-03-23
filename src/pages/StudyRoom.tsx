import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const StudyRoom: React.FC = () => {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 text-center">
      <div className="space-y-6 max-w-3xl">
        <div className="flex justify-center">
          <div className="relative">
            <motion.div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-600/50 opacity-75 blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
            />
            <div className="relative bg-white rounded-full p-4">
              <BookOpen className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Study Room
        </h1>

        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <Clock className="h-5 w-5" />
          <span className="text-lg">Coming Soon</span>
        </div>

        <p className="mx-auto max-w-prose text-gray-600 text-lg">
          We're working hard to create the perfect study environment for you. Check back soon for interactive study
          materials, practice tests, and more.
        </p>

        <div className="pt-6">
          <Link to="/">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;