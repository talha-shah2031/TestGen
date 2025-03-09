//import
import { useState } from "react";
import { GraduationCap, AlertCircle, Book, BookIcon as ChapterIcon } from "lucide-react";
import SelectWrapper from "./select-wrapper";

const TestForm = ({
  academyName,
  setAcademyName,
  grade,
  setGrade,
  subject,
  setSubject,
  chapter,
  setChapter,
  mcqsCount,
  setMcqsCount,
  sqCount,
  setSqCount,
  lqCount,
  setLqCount,
  onGenerateTest,
  loading,
  availableGrades,
  availableSubjects,
  availableChapters,
  time,          // New prop
  setTime        // New prop
}) => {
  // State for error messages
  const [error, setError] = useState(null);

  // Handle MCQ count change
  const handleMcqsCountChange = (value) => {
    if (value <= 30) {
      setMcqsCount(value);
      setError(null); // Clear error if valid
    } else {
      setError("MCQs cannot exceed 30.");
    }
  };

  // Handle SQ count change
  const handleSqCountChange = (value) => {
    if (value <= 15) {
      setSqCount(value);
      setError(null); // Clear error if valid
    } else {
      setError("Short Questions cannot exceed 15.");
    }
  };

  // Handle LQ count change
  const handleLqCountChange = (value) => {
    if (value <= 10) {
      setLqCount(value);
      setError(null); // Clear error if valid
    } else {
      setError("Long Questions cannot exceed 10.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Academy Name Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Academy Name
        </label>
        <input
          type="text"
          value={academyName}
          onChange={(e) => setAcademyName(e.target.value)}
          className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          placeholder="Enter academy name"
        />
      </div>

      {/* Grade Selection */}
      <SelectWrapper
        label="Grade"
        icon={GraduationCap}
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        options={availableGrades}
      />

      {/* Subject Selection */}
      <SelectWrapper
        label="Subject"
        icon={Book}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        disabled={!grade} // Disable if no grade is selected
        options={availableSubjects}
      />

      {/* Chapter Selection */}
      <SelectWrapper
        label="Chapter"
        icon={ChapterIcon}
        value={chapter}
        onChange={(e) => setChapter(Number(e.target.value))}
        disabled={!subject} // Disable if no subject is selected
        options={availableChapters}
      />

      {/* Time Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time Allowed
        </label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          placeholder="e.g., 1 hour 30 minutes"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm font-medium flex items-center space-x-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Question Count Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MCQs
          </label>
          <input
            type="number"
            min="0"
            max="30"
            value={mcqsCount}
            onChange={(e) => handleMcqsCountChange(Number(e.target.value))}
            className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Questions
          </label>
          <input
            type="number"
            min="0"
            max="15"
            value={sqCount}
            onChange={(e) => handleSqCountChange(Number(e.target.value))}
            className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Long Questions
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={lqCount}
            onChange={(e) => handleLqCountChange(Number(e.target.value))}
            className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Generate Test Button */}
      <button
        onClick={onGenerateTest}
        disabled={loading || !grade || !subject || !chapter || !time || error}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transform transition hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>{loading ? "Generating..." : "Generate Test"}</span>
      </button>
    </div>
  );
};

export default TestForm;
