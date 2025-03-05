"use client";

import { motion } from "framer-motion";

const TestPreview = ({ questions, subject }) => {
  const urduSubjects = [
    "psychology",
    "tarjamaTulQuran",
    "urdu",
    "islamic studies",
    "history",
    "geography",
  ]; // Add more subjects here
  const isUrdu = urduSubjects.includes(subject);

  if (!questions) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Generated questions will appear here</p>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${isUrdu ? "rtl" : "ltr"}`}>
      {questions.mcqs?.questions && (
        <div>
          <h3
            className={`text-xl font-semibold text-gray-900 mb-4 ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            Multiple Choice Questions
          </h3>
          <div className="space-y-4">
            {questions.mcqs.questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gray-50 p-4 rounded-lg ${
                  isUrdu ? "text-right" : "text-left"
                }`}
              >
                <p className="font-medium text-gray-900 mb-2">
                  {i + 1}. {q.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <span className="text-indigo-600">
                        {String.fromCharCode(65 + j)}.
                      </span>
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
          <h3
            className={`text-xl font-semibold text-gray-900 mb-4 ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            Short Questions
          </h3>
          <div className="space-y-4">
            {questions.sq.questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gray-50 p-4 rounded-lg ${
                  isUrdu ? "text-right" : "text-left"
                }`}
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
          <h3
            className={`text-xl font-semibold text-gray-900 mb-4 ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            Long Questions
          </h3>
          <div className="space-y-4">
            {questions.lq.questions.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gray-50 p-4 rounded-lg ${
                  isUrdu ? "text-right" : "text-left"
                }`}
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
  );
};

export default TestPreview;
