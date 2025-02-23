import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Clock, Award } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
      title: 'Comprehensive Coverage',
      description: 'Generate questions from all chapters with varying difficulty levels'
    },
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: 'Smart Generation',
      description: 'Question generation for unique and relevant content'
    },
    {
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      title: 'Time-Saving',
      description: 'Create complete test papers in seconds, not hours'
    },
    {
      icon: <Award className="h-6 w-6 text-indigo-600" />,
      title: 'Quality Assured',
      description: 'Professionally curated questions following educational standards'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
            >
              Generate Perfect
              <span className="text-indigo-600"> Test Papers</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Create comprehensive test papers in minutes with our advanced generator.
              Perfect for teachers and educational institutions.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <button
                onClick={() => navigate('/generator')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transform transition hover:scale-105"
              >
                Start Generating
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Test Generator?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Everything you need to create perfect test papers, faster and better.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="rounded-full bg-indigo-50 p-3">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
