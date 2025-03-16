import { Download } from "lucide-react"

const GenerateButtons = ({ onGeneratePDF, disabled }) => {
  return (
    <div className="mt-6 space-y-4">
      <button
        onClick={onGeneratePDF}
        disabled={disabled}
        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition hover:scale-105 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <Download className="h-5 w-5" />
        <span>Download PDF</span>
      </button>
    </div>
  )
}

export default GenerateButtons
