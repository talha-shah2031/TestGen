import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TestGenerator from './pages/TestGenerator';
import StudyRoom from './pages/StudyRoom'; // Assuming StudyRoom is in components folder
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generator" element={<TestGenerator />} />
            <Route path="/study-room" element={<StudyRoom />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
