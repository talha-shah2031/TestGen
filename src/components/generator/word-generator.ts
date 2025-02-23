import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, AlignmentType, WidthType } from "docx"

export const generateWord = (questions, academyName, subject, chapter, mcqsCount, sqCount, lqCount) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: academyName.toUpperCase(),
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: "(Matric part - I)",
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)} (LHR Board)`,
            spacing: { before: 400 },
          }),
          new Paragraph({
            text: `Time Allowed: 1 hour`,
          }),
          new Paragraph({
            text: `Syllabus: Chapter ${chapter}`,
          }),
          new Paragraph({
            text: `Maximum marks: ${mcqsCount + sqCount * 2 + lqCount * 5}`,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Q#1. MULTIPLE CHOICE QUESTIONS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("No")] }),
                  new TableCell({ children: [new Paragraph("Question")] }),
                  new TableCell({ children: [new Paragraph("A")] }),
                  new TableCell({ children: [new Paragraph("B")] }),
                  new TableCell({ children: [new Paragraph("C")] }),
                  new TableCell({ children: [new Paragraph("D")] }),
                ],
              }),
              ...questions.mcqs.questions.map(
                (q, index) =>
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                      new TableCell({ children: [new Paragraph(q.question)] }),
                      ...q.options.map((option) => new TableCell({ children: [new Paragraph(option)] })),
                    ],
                  }),
              ),
            ],
          }),
          new Paragraph({
            text: "Q#2. GIVE SHORT ANSWERS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...questions.sq.questions.map(
            (q, index) =>
              new Paragraph({
                text: `${index + 1}. ${q.question}`,
                spacing: { after: 200 },
              }),
          ),
          new Paragraph({
            text: "Q#3. ATTEMPT ALL QUESTIONS",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          ...questions.lq.questions.map(
            (q, index) =>
              new Paragraph({
                text: `${String.fromCharCode(97 + index)}. ${q.question}`,
                spacing: { after: 200 },
              }),
          ),
        ],
      },
    ],
  })

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style.display = "none"
    a.href = url
    a.download = "generated_test.docx"
    a.click()
    window.URL.revokeObjectURL(url)
  })
}

