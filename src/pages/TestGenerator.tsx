import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle } from 'lucide-react'
import LoadingAnimation from "../components/LoadingAnimation"
import TestForm from "../components/generator/test-form"
import TestPreview from "../components/generator/test-preview"
import GenerateButtons from "../components/generator/generate-buttons"
import { generatePDF } from "../components/generator/pdf-generator"
import { generateWord } from "../components/generator/word-generator"

const apiUrl = import.meta.env.VITE_SERVER_URL

const TestGenerator = () => {
  const [grade, setGrade] = useState("grade9")
  const [subject, setSubject] = useState("chemistry")
  const [chapter, setChapter] = useState(1)
  const [mcqsCount, setMcqsCount] = useState(5)
  const [sqCount, setSqCount] = useState(3)
  const [lqCount, setLqCount] = useState(2)
  const [questions, setQuestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [academyName, setAcademyName] = useState("ZAHOOR ACADEMY")

  const handleGenerateTest = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = { grade, subject, chapter, mcqsCount, sqCount, lqCount }
      const response = await fetch("http://localhost:3000/api/get-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch questions")
      }

      const data = await response.json()
      setQuestions(data)
    } catch (error) {
      console.error("Error:", error)
      setError(error.message)
      setQuestions(null)
    } finally {
      setLoading(false)
    }
  }

  const handleGeneratePDF = () => {
    if (questions) {
      generatePDF(questions, academyName, subject, chapter, mcqsCount, sqCount, lqCount)
    }
  }

  const handleGenerateWord = () => {
    if (questions) {
      generateWord(questions, academyName, subject, chapter, mcqsCount, sqCount, lqCount)
    }
  }

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
            <TestForm
              academyName={academyName}
              setAcademyName={setAcademyName}
              grade={grade}
              setGrade={setGrade}
              subject={subject}
              setSubject={setSubject}
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
              <GenerateButtons onGeneratePDF={handleGeneratePDF} onGenerateWord={handleGenerateWord} disabled />
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default TestGenerator
