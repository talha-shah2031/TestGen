"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Utility function to parse raw text into structured questions
const parseQuestions = (rawText) => {
  if (!rawText) return { mcqs: { questions: [] }, sq: { questions: [] }, lq: { questions: [] } };

  const lines = rawText.split('\n').filter(line => line.trim() !== '');
  const mcqs = { questions: [] };
  const sq = { questions: [] };
  const lq = { questions: [] };

  let currentQuestion = null;
  let questionType = 'mcqs'; // Default to MCQs; adjust based on `mcqsCount`, `sqCount`, `lqCount` in a real app

  lines.forEach(line => {
    // Check if the line is a question (starts with a number followed by a dot)
    if (/^\d+\./.test(line.trim())) {
      if (currentQuestion) {
        if (questionType === 'mcqs') mcqs.questions.push(currentQuestion);
        else if (questionType === 'sq') sq.questions.push(currentQuestion);
        else if (questionType === 'lq') lq.questions.push(currentQuestion);
      }

      currentQuestion = { question: line.replace(/^\d+\.\s*/, ''), options: [] };
    }
    // Check if the line is an option (starts with a), b), c), or d))
    else if (/^[a-d]\)/.test(line.trim())) {
      if (currentQuestion) {
        currentQuestion.options.push(line.replace(/^[a-d]\)\s*/, ''));
      }
    }
  });

  // Push the last question
  if (currentQuestion) {
    if (questionType === 'mcqs') mcqs.questions.push(currentQuestion);
    else if (questionType === 'sq') sq.questions.push(currentQuestion);
    else if (questionType === 'lq') lq.questions.push(currentQuestion);
  }

  return { mcqs, sq, lq };
};

const TestPreview = ({ questions: rawQuestions, subject }) => {
  const urduSubjects = [
    "psychology",
    "tarjamaTulQuran",
    "urdu",
    "islamic studies",
    "history",
    "geography",
  ];
  const isUrdu = urduSubjects.includes(subject);

  // Parse raw text into structured questions
  const questions = typeof rawQuestions === 'string' ? parseQuestions(rawQuestions) : rawQuestions;

  // Reference to the container for MathJax reprocessing
  const containerRef = useRef(null);

  // Reprocess MathJax after rendering
  useEffect(() => {
    if (window.MathJax && containerRef.current) {
      window.MathJax.typesetPromise([containerRef.current]).catch(err =>
        console.error("MathJax typesetting error:", err)
      );
    }
  }, [questions]);

  if (!questions || (!questions.mcqs?.questions?.length && !questions.sq?.questions?.length && !questions.lq?.questions?.length)) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Generated questions will appear here</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`space-y-8 ${isUrdu ? "rtl" : "ltr"} font-sans`}>
      {/* MCQs Section */}
      {questions.mcqs?.questions?.length > 0 && (
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
                className={`bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 ${
                  isUrdu ? "text-right" : "text-left"
                }`}
              >
                <p
                  className="font-medium text-gray-900 mb-2 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: `${i + 1}. ${q.question}` }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <span className="text-indigo-600 font-medium">
                        {String.fromCharCode(65 + j)}.
                      </span>
                      <span
                        className="text-gray-800"
                        dangerouslySetInnerHTML={{ __html: option }}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Short Questions Section */}
      {questions.sq?.questions?.length > 0 && (
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
                className={`bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 ${
                  isUrdu ? "text-right" : "text-left"
                }`}
              >
                <p
                  className="font-medium text-gray-900 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: `${i + 1}. ${q.question}` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Long Questions Section */}
      {questions.lq?.questions?.length > 0 && (
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
                className={`bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 ${
                  isUrdu ? "text-right" : "text-left"
                }`}
              >
                <p
                  className="font-medium text-gray-900 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: `${i + 1}. ${q.question}` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPreview;
