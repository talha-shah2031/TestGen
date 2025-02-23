import { GraduationCap, Book, BookIcon as ChapterIcon } from "lucide-react"
import SelectWrapper from "./select-wrapper"

const subjects = [
  { value: "chemistry", label: "Chemistry", enabled: true },
  { value: "physics", label: "Physics", enabled: false },
  { value: "biology", label: "Biology", enabled: false },
  { value: "mathematics", label: "Mathematics", enabled: false },
]

const grades = [
  { value: "grade9", label: "9th Grade", enabled: true },
  { value: "grade10", label: "10th Grade", enabled: false },
  { value: "grade11", label: "11th Grade", enabled: false },
  { value: "grade12", label: "12th Grade", enabled: false },
]

const chapters = Array.from({ length: 15 }, (_, i) => ({
  value: i + 1,
  label: `Chapter ${i + 1}`,
  enabled: i === 0,
}))

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
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Academy Name</label>
        <input
          type="text"
          value={academyName}
          onChange={(e) => setAcademyName(e.target.value)}
          className="block w-full px-3 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm"
          placeholder="Enter academy name"
        />
      </div>

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
        onClick={onGenerateTest}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transform transition hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>Generate Test</span>
      </button>
    </div>
  )
}

export default TestForm

