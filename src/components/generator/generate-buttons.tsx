import { Download, FileText } from "lucide-react"

const GenerateButtons = ({ onGeneratePDF, onGenerateWord }) => {
  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={onGeneratePDF}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition hover:scale-105 flex items-center justify-center space-x-2"
      >
        <Download className="h-5 w-5" />
        <span>Download PDF</span>
      </button>
      <button
        onClick={onGenerateWord}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition hover:scale-105 flex items-center justify-center space-x-2"
      >
        <FileText className="h-5 w-5" />
        <span>Download Word Document</span>
      </button>
    </div>
  )
}

export default GenerateButtons

