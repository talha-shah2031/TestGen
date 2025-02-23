import jsPDF from "jspdf"
import "jspdf-autotable"

export const generatePDF = (questions, academyName, subject, chapter, mcqsCount, sqCount, lqCount) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  pdf.setFontSize(16)
  pdf.text(academyName.toUpperCase(), 105, 15, { align: "center" })
  pdf.setFontSize(12)
  pdf.text("(Matric part - I)", 105, 22, { align: "center" })
  pdf.text(`Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)} (LHR Board)`, 14, 30)
  pdf.text(`Time Allowed: 1 hour`, 14, 36)
  pdf.text(`Syllabus: Chapter ${chapter}`, 14, 42)
  pdf.text(`Maximum marks: ${mcqsCount + sqCount * 2 + lqCount * 5}`, 140, 36)

  let yPosition = 50

  // MCQs
  if (questions.mcqs?.questions) {
    pdf.setFontSize(14)
    pdf.text("Q#1. MULTIPLE CHOICE QUESTIONS", 14, yPosition)
    pdf.setFontSize(10)
    pdf.text(`{1×${mcqsCount}= ${mcqsCount} marks}`, 170, yPosition)
    yPosition += 10

    const mcqTable = [["No", "Question", "A", "B", "C", "D"]]

    questions.mcqs.questions.forEach((q, index) => {
      mcqTable.push([(index + 1).toString(), q.question, q.options[0], q.options[1], q.options[2], q.options[3]])
    })

    pdf.autoTable({
      startY: yPosition,
      head: [mcqTable[0]],
      body: mcqTable.slice(1),
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 80 } },
    })

    yPosition = pdf.lastAutoTable.finalY + 10
  }

  // Short Questions
  if (questions.sq?.questions) {
    pdf.setFontSize(14)
    pdf.text("Q#2. GIVE SHORT ANSWERS", 14, yPosition)
    pdf.setFontSize(10)
    pdf.text(`{2×${sqCount}=${sqCount * 2} marks}`, 170, yPosition)
    yPosition += 8

    questions.sq.questions.forEach((q, index) => {
      pdf.text(`${index + 1}. ${q.question}`, 14, yPosition)
      yPosition += 6
    })
  }

  // Long Questions
  if (questions.lq?.questions) {
    yPosition += 4
    pdf.setFontSize(14)
    pdf.text("Q#3. ATTEMPT ALL QUESTIONS", 14, yPosition)
    pdf.setFontSize(10)
    pdf.text(`{${lqCount * 5} marks}`, 170, yPosition)
    yPosition += 8

    questions.lq.questions.forEach((q, index) => {
      pdf.text(`${String.fromCharCode(97 + index)}. ${q.question}`, 14, yPosition)
      yPosition += 6
    })
  }

  pdf.save("generated_test.pdf")
}

