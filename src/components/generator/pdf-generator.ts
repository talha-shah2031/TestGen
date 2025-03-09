//import
import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (
  questions,
  academyName,
  subject,
  chapter,
  mcqsCount,
  sqCount,
  lqCount,
  grade,
  time
) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Grade to class name mapping
  const gradeToClass = {
    grade9: "Matric Part - I (9th Class)",
    grade10: "Matric Part - II (10th Class)",
    grade11: "Intermediate Part - I (11th Class)",
    grade12: "Intermediate Part - II (12th Class)",
  };

  // Set font for header
  pdf.setFont("Algerian", "bold"); // Academy name in Algerian bold
  pdf.setFontSize(16);
  pdf.text(academyName.toUpperCase(), 105, 15, { align: "center" });

  pdf.setFont("helvetica", "normal"); // Reset to Helvetica for other content
  pdf.setFontSize(11);
  pdf.text(gradeToClass[grade] || "Class Not Specified", 105, 22, { align: "center" });

  // Subject and Time in one line, Time fully right-aligned
  pdf.text(`Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)} (LHR Board)`, 14, 30);
  pdf.text(`Time Allowed: ${time || "1 hour"}`, 196, 30, { align: "right" });

  // Syllabus and Marks in one line, Marks fully right-aligned
  pdf.text(`Syllabus: Chapter ${chapter}`, 14, 36);
  pdf.text(`Maximum marks: ${mcqsCount + sqCount * 2 + lqCount * 5}`, 196, 36, { align: "right" });

  // Add a bold double line between header and body
  pdf.setLineWidth(0.4); // Increased thickness for bold effect
  pdf.line(14, 42, 196, 42); // First line
  pdf.line(14, 43, 196, 43); // Second line, 1mm below for clearer separation
  pdf.setLineWidth(0.1); // Reset line width for table

  let yPosition = 50;

  // Function to estimate column width based on content length
  const calculateColumnWidth = (texts) => {
    const charWidth = 0.5; // Approximate width per character in mm
    const minWidth = 10;   // Minimum width in mm
    const maxWidth = 80;   // Maximum width in mm
    const longestText = texts
      .filter((text) => text)
      .reduce((longest, current) => (String(current).length > longest.length ? String(current) : longest), "");
    return Math.max(minWidth, Math.min(maxWidth, longestText.length * charWidth));
  };

  // MCQs
  if (questions.mcqs?.questions) {
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text("Q#1. MULTIPLE CHOICE QUESTIONS", 14, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(`{1×${mcqsCount}= ${mcqsCount} marks}`, 170, yPosition);
    yPosition += 6;

    const mcqTable = [["No", "Question", "A", "B", "C", "D"]];
    questions.mcqs.questions.forEach((q, index) => {
      mcqTable.push([(index + 1).toString(), q.question, q.options[0], q.options[1], q.options[2], q.options[3]]);
    });

    // Calculate dynamic column widths
    const columnWidths = {
      0: calculateColumnWidth(mcqTable.map(row => row[0])), // No
      1: calculateColumnWidth(mcqTable.map(row => row[1])), // Question
      2: calculateColumnWidth(mcqTable.map(row => row[2])), // A
      3: calculateColumnWidth(mcqTable.map(row => row[3])), // B
      4: calculateColumnWidth(mcqTable.map(row => row[4])), // C
      5: calculateColumnWidth(mcqTable.map(row => row[5])), // D
    };

    const totalWidth = Object.values(columnWidths).reduce((sum, width) => sum + width, 0);
    const pageWidth = 190;
    if (totalWidth > pageWidth) {
      const scaleFactor = pageWidth / totalWidth;
      Object.keys(columnWidths).forEach(key => {
        columnWidths[key] = columnWidths[key] * scaleFactor;
      });
    }

    // Explicitly set font to bold for the header row before autoTable
    pdf.setFont("helvetica", "bold");
    pdf.autoTable({
      startY: yPosition,
      head: [mcqTable[0]],
      body: mcqTable.slice(1),
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 2, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1 },
      headStyles: { fillColor: false, textColor: [0, 0, 0], fontSize: 11, lineWidth: 0.1, halign: "center" }, // Style applied with bold font set above
      columnStyles: {
        ...columnWidths,
        0: { ...columnWidths[0], halign: "center", fontStyle: "bold" }, // No column bold
        1: { ...columnWidths[1], halign: "left" },
        2: { ...columnWidths[2], halign: "center" },
        3: { ...columnWidths[3], halign: "center" },
        4: { ...columnWidths[4], halign: "center" },
        5: { ...columnWidths[5], halign: "center" },
      },
      bodyStyles: { fillColor: false, lineWidth: 0.1, fontStyle: "normal" },
      didDrawPage: () => {
        pdf.setFont("helvetica", "normal"); // Reset font to normal after table
      },
    });

    yPosition = pdf.lastAutoTable.finalY + 10;
  }

  // Short Questions
  if (questions.sq?.questions) {
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text("Q#2. GIVE SHORT ANSWERS", 14, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(`{2×${sqCount}=${sqCount * 2} marks}`, 170, yPosition);
    yPosition += 6;

    questions.sq.questions.forEach((q, index) => {
      pdf.text(`${index + 1}. ${q.question}`, 14, yPosition);
      yPosition += 6;
    });

    yPosition += 6; // Extra space before Long Questions
  }

  // Long Questions
  if (questions.lq?.questions) {
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text("Q#3. ATTEMPT ALL QUESTIONS", 14, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(`{${lqCount * 5} marks}`, 196, yPosition, { align: "right" });
    yPosition += 6;

    questions.lq.questions.forEach((q, index) => {
      pdf.text(`${String.fromCharCode(97 + index)}. ${q.question}`, 14, yPosition);
      yPosition += 6;
    });
  }

  pdf.save("generated_test.pdf");
};
