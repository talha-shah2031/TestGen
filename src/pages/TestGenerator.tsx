
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, AlertCircle, GraduationCap, Book, BookOpen as ChapterIcon } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';

const apiUrl = import.meta.env.VITE_SERVER_URL;
console.log(apiUrl);                 

const TestGenerator = () => {
  const [grade, setGrade] = useState('9');
  const [subject, setSubject] = useState('chemistry');
  const [chapter, setChapter] = useState(1);
  const [mcqsCount, setMcqsCount] = useState(5);
  const [sqCount, setSqCount] = useState(3);
  const [lqCount, setLqCount] = useState(2);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const subjects = [
    { value: 'chemistry', label: 'Chemistry', enabled: true },
    { value: 'physics', label: 'Physics', enabled: false },
    { value: 'biology', label: 'Biology', enabled: false },
    { value: 'mathematics', label: 'Mathematics', enabled: false }
  ];

  const grades = [
    { value: '9', label: '9th Grade', enabled: true },
    { value: '10', label: '10th Grade', enabled: false },
    { value: '11', label: '11th Grade', enabled: false },
    { value: '12', label: '12th Grade', enabled: false }
  ];

  const chapters = Array.from({ length: 15 }, (_, i) => ({
    value: i + 1,
    label: `Chapter ${i + 1}`,
    enabled: i === 0
  }));

  const handleGenerateTest = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}get-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, subject, chapter, mcqsCount, sqCount, lqCount }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      setError(error.message);
      setQuestions(null);
    } finally {
      setLoading(false);
    }
  };

  const SelectWrapper = ({ label, icon: Icon, value, onChange, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="block w-full pl-10 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm bg-white appearance-none"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={!option.enabled}
              className={!option.enabled ? 'text-gray-400' : ''}
            >
              {option.label}
            </option>
          ))}
        </select>
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
            <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading && <LoadingAnimation />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Test Generator</h1>
          <p className="text-base sm:text-lg text-gray-600">Create custom tests with just a few clicks</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <div className="space-y-6">
              <SelectWrapper
                label="Grade"
                icon={GraduationCap}
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                options={grades}
              />

              <SelectWrapper
                label="Subject"
                icon={Book}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                options={subjects}
              />

              <SelectWrapper
                label="Chapter"
                icon={ChapterIcon}
                value={chapter}
                onChange={(e) => setChapter(Number(e.target.value))}
                options={chapters}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MCQs</label>
                  <input
                    type="number"
                    min="0"
                    value={mcqsCount}
                    onChange={(e) => setMcqsCount(Number(e.target.value))}
                    className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Questions</label>
                  <input
                    type="number"
                    min="0"
                    value={sqCount}
                    onChange={(e) => setSqCount(Number(e.target.value))}
                    className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Long Questions</label>
                  <input
                    type="number"
                    min="0"
                    value={lqCount}
                    onChange={(e) => setLqCount(Number(e.target.value))}
                    className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateTest}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transform transition hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Generate Test</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            {error && (
              <div className="flex items-center space-x-2 text-red-600 mb-4">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}

            {questions && (
              <div className="space-y-8">
                {questions.mcqs?.questions && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Multiple Choice Questions</h3>
                    <div className="space-y-4">
                      {questions.mcqs.questions.map((q, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <p className="font-medium text-gray-900 mb-2">
                            {i + 1}. {q.question}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((option, j) => (
                              <div key={j} className="flex items-center space-x-2">
                                <span className="text-indigo-600">{String.fromCharCode(65 + j)}.</span>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {questions.sq?.questions && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Short Questions</h3>
                    <div className="space-y-4">
                      {questions.sq.questions.map((q, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <p className="font-medium text-gray-900">
                            {i + 1}. {q.question}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {questions.lq?.questions && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Long Questions</h3>
                    <div className="space-y-4">
                      {questions.lq.questions.map((q, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <p className="font-medium text-gray-900">
                            {i + 1}. {q.question}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!questions && !error && !loading && (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Generated questions will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TestGenerator;