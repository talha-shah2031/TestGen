import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import LoadingAnimation from "../components/LoadingAnimation";
import TestForm from "../components/generator/test-form";
import TestPreview from "../components/generator/test-preview";
import GenerateButtons from "../components/generator/generate-buttons";
import { generateEnglishPDF } from "../components/generator/pdf-generator";
import { generateUrduPDF } from "../components/generator/generateUrduPDF";

const apiUrl = import.meta.env.VITE_SERVER_URL;

const gradeData = {
  grade9: {
    chemistry: {
      chapters: [{ id: 1, name: "Introduction to Chemistry", value: null }],
    },
  },
  grade10: {
    chemistry: {},
    biology: {},
  },
  grade11: {
    psychology: {
      chapters: [
        { id: 1, name: "نفسیات کا تعارف", value: null },
        { id: 2, name: "اسالیب تحقیق", value: null },
        { id: 3, name: " اعصابی نظام اور کردار", value: null },
        { id: 4, name: "حواس اور ادراک", value: null },
        { id: 5, name: " اموزش اور یاد", value: null },
      ],
    },
    tarjamaTulQuran: {
      chapters: [
        { id: 1, name: "سورۃ البقرہ", value: null },
        { id: 2, name: "سورۃ آل عمران", value: null },
        { id: 3, name: "سورۃ انفال", value: null },
        { id: 4, name: "سورۃ التوبہ", value: null },
      ],
    },
  },
  grade12: {
    chemistry: {},
    physics: {},
  },
};

const TestGenerator = () => {
  const [grade, setGrade] = useState(""); // Default: empty string
  const [subject, setSubject] = useState(""); // Default: empty string
  const [chapter, setChapter] = useState(""); // Default: empty string
  const [mcqsCount, setMcqsCount] = useState(5);
  const [sqCount, setSqCount] = useState(3);
  const [lqCount, setLqCount] = useState(2);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [academyName, setAcademyName] = useState("YOUR ACADEMY");
  const [time, setTime] = useState("1 hour"); // Added time state

  // Define available grades with a placeholder option
  const availableGrades = [
    { value: "", label: "Select Grade", disabled: true }, // Placeholder option
    { value: "grade9", label: "9th Grade", enabled: true },
    { value: "grade10", label: "10th Grade", enabled: false },
    { value: "grade11", label: "11th Grade", enabled: true },
    { value: "grade12", label: "12th Grade", enabled: false },
  ];

  const availableSubjects = grade
    ? [
        { value: "", label: "Select Subject", disabled: true }, // Placeholder option
        ...Object.keys(gradeData[grade]).map((sub) => ({
          value: sub,
          label:
            gradeData[grade][sub].displayName ||
            sub.charAt(0).toUpperCase() + sub.slice(1),
          enabled: true,
        })),
      ]
    : [{ value: "", label: "Select Subject", disabled: true }];

  const availableChapters =
    grade && subject
      ? [
          { value: "", label: "Select Chapter", disabled: true }, // Placeholder option
          ...gradeData[grade][subject].chapters.map((chap) => ({
            value: chap.id,
            label: chap.name,
            enabled: true,
          })),
        ]
      : [{ value: "", label: "Select Chapter", disabled: true }];

  // Handle grade change
  const handleGradeChange = (selectedGrade) => {
    setGrade(selectedGrade);
    setSubject(""); // Reset subject
    setChapter(""); // Reset chapter
  };

  // Handle subject change
  const handleSubjectChange = (selectedSubject) => {
    setSubject(selectedSubject);
    setChapter(""); // Reset chapter
  };

  const handleGenerateTest = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = { grade, subject, chapter, mcqsCount, sqCount, lqCount };
      const response = await fetch(`${apiUrl}get-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setQuestions(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    if (questions) {
      if (subject === "psychology" || subject === "tarjamaTulQuran") {
        generateUrduPDF(
          questions,
          academyName,
          subject,
          chapter,
          mcqsCount,
          sqCount,
          lqCount,
          grade,
          time
        );
      } else {
        generateEnglishPDF(
          questions,
          academyName,
          subject,
          chapter,
          mcqsCount,
          sqCount,
          lqCount,
          grade,
          time
        );
      }
    }
  };

  return (
    <>
      {loading && <LoadingAnimation />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Test Generator
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Create custom tests with just a few clicks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <TestForm
              academyName={academyName}
              setAcademyName={setAcademyName}
              grade={grade}
              setGrade={handleGradeChange}
              subject={subject}
              setSubject={handleSubjectChange}
              chapter={chapter}
              setChapter={setChapter}
              mcqsCount={mcqsCount}
              setMcqsCount={setMcqsCount}
              sqCount={sqCount}
              setSqCount={setSqCount}
              lqCount={lqCount}
              setLqCount={setLqCount}
              onGenerateTest={handleGenerateTest}
              loading={loading}
              availableGrades={availableGrades}
              availableSubjects={availableSubjects}
              availableChapters={availableChapters}
              time={time} // Pass time
              setTime={setTime} // Pass setTime
            />
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

            <TestPreview questions={questions} subject={subject} />

            {questions && (
              <GenerateButtons
                onGeneratePDF={handleGeneratePDF}
                disabled={!questions}
              />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};
export default TestGenerator;
