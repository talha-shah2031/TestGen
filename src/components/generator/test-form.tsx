
import { GraduationCap, Book, BookIcon as ChapterIcon } from "lucide-react";
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
}) => {
  return (
    <div className="space-y-6">
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

      {/* Question Count Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            MCQs
          </label>
          <input
            type="number"
            min="0"
            value={mcqsCount}
            onChange={(e) => setMcqsCount(Number(e.target.value))}
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
            value={sqCount}
            onChange={(e) => setSqCount(Number(e.target.value))}
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
            value={lqCount}
            onChange={(e) => setLqCount(Number(e.target.value))}
            className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Generate Test Button */}
      <button
        onClick={onGenerateTest}
        disabled={loading || !grade || !subject || !chapter}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transform transition hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>{loading ? "Generating..." : "Generate Test"}</span>
      </button>
    </div>
  );
};

export default TestForm;
