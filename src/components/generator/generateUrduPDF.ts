export const generateUrduPDF = (
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
  const gradeToClass = {
    grade9: "میٹرک پارٹ - I ",
    grade10: "میٹرک پارٹ - II ",
    grade11: "انٹرمیڈیٹ پارٹ - I ",
    grade12: "انٹرمیڈیٹ پارٹ - II ",
  };

  // Convert time to Urdu
  const timeInUrdu = time === "1 hour" ? "1 گھنٹہ" : time;

  // Create a new window for printing
  const printWindow = window.open("", "_blank");

  // Ensure the new window is created successfully
  if (!printWindow) {
    alert("Please allow popups for this site to generate the PDF.");
    return;
  }

  // Build the HTML content with Google Fonts import
  let htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>All rights reserved by TestGen</title> <!-- Set title as requested -->
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400..700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap'); /* Import Poppins font */
          
          @page {
            size: A4;
            margin: 20mm 10mm 20mm 10mm; /* Increased top and bottom margins to 20mm, left and right remain 10mm */
            @top-right {
              content: "All rights reserved by TestGen";
              font-family: 'Poppins', sans-serif; /* Apply Poppins font */
              opacity: 0.5; /* Reduce opacity to 50% */
              font-size: 8pt; /* Match the previous footer font size */
            }
            @bottom-center { content: ""; }
          }
          body {
            margin: 0;
            padding: 0;
            direction: rtl;
          }
          .container {
            width: 190mm;
            margin: 0 auto;
          }
          .noto-nastaliq-urdu-regular {
            font-family: "Noto Nastaliq Urdu", serif;
            font-optical-sizing: auto;
            font-weight: 400;
            font-style: normal;
            font-size: 10pt;
            line-height: 1.5;
          }
          .noto-nastaliq-urdu-bold {
            font-family: "Noto Nastaliq Urdu", serif;
            font-optical-sizing: auto;
            font-weight: 700;
            font-style: normal;
          }
          h1 {
            font-family: 'Algerian';
            font-size: 20pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2mm;
          }
          h2 {
            font-size: 11pt;
            margin-bottom: 1mm;
          }
          p {
            margin: 0;
            padding: 0;
          }
          .flex-between {
            display: flex;
            justify-content: space-between;
            margin-top: 2mm;
          }
          hr {
            border: 0.2mm solid black;
            margin: 2mm 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1mm;
          }
          th, td {
            border: 0.1mm solid black;
            padding: 2mm;
            text-align: center;
          }
          th {
            font-weight: bold;
          }
          .question {
            margin-bottom: 4mm;
            text-align: right;
          }
          .question span {
            margin-left: 5mm;
          }
          .section {
            margin-bottom: 8mm;
          }
          .long-section {
            margin-bottom: 15mm;
          }
          /* Removed .footer class since footer is removed */
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${academyName.toUpperCase()}</h1>
          <p class="noto-nastaliq-urdu-regular" style="text-align: center;">${
            gradeToClass[grade] || "جماعت واضح نہیں"
          }</p>
          <div class="flex-between noto-nastaliq-urdu-regular">
            <p>مضمون: ${
              subject === "psychology" ? "نفسیات" : "ترجمہ القرآن"
            } (لاہور بورڈ)</p>
            <p>وقت: ${timeInUrdu}</p>
          </div>
          <div class="flex-between noto-nastaliq-urdu-regular">
            <p>نصاب: باب ${chapter}</p>
            <p>کل نمبر: ${mcqsCount + sqCount * 2 + lqCount * 5}</p>
          </div>
          <hr />
  `;

  // MCQs Section
  if (questions.mcqs?.questions) {
    htmlContent += `
      <div class="section">
        <h2 class="noto-nastaliq-urdu-bold" style="display: flex; justify-content: space-between;">
          <span>سوال نمبر 1: کثیر الانتخابی سوالات</span>
          <span>{${mcqsCount}×1 = ${mcqsCount} نمبر}</span>
        </h2>
        <table class="noto-nastaliq-urdu-regular">
          <thead>
            <tr>
              <th>نمبر</th>
              <th>سوال</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
            </tr>
          </thead>
          <tbody>
    `;
    questions.mcqs.questions.forEach((q, index) => {
      htmlContent += `
        <tr>
          <td>${index + 1}</td>
          <td style="text-align: right;">${q.question}</td>
          <td>${q.options[0]}</td>
          <td>${q.options[1]}</td>
          <td>${q.options[2]}</td>
          <td>${q.options[3]}</td>
        </tr>
      `;
    });
    htmlContent += `
          </tbody>
        </table>
      </div>
    `;
  }

  // Short Questions Section
  if (questions.sq?.questions) {
    htmlContent += `
      <div class="section">
        <h2 class="noto-nastaliq-urdu-bold" style="display: flex; justify-content: space-between;">
          <span>سوال نمبر 2: مختصر جوابات دیں</span>
          <span>{${sqCount}×2 = ${sqCount * 2} نمبر}</span>
        </h2>
        <div style="margin-top: 1mm;">
    `;
    questions.sq.questions.forEach((q, index) => {
      htmlContent += `
        <div class="question noto-nastaliq-urdu-regular">
          <span class="noto-nastaliq-urdu-bold">${index + 1}.</span> ${
        q.question
      }
        </div>
      `;
    });
    htmlContent += `
        </div>
      </div>
    `;
  }

  // Long Questions Section
  if (questions.lq?.questions) {
    htmlContent += `
      <div class="long-section">
        <h2 class="noto-nastaliq-urdu-bold" style="display: flex; justify-content: space-between;">
          <span>سوال نمبر 3: تمام سوالات حل کریں</span>
          <span>{${lqCount * 5} نمبر}</span>
        </h2>
        <div style="margin-top: 1mm;">
    `;
    questions.lq.questions.forEach((q, index) => {
      htmlContent += `
        <div class="question noto-nastaliq-urdu-regular">
          <span class="noto-nastaliq-urdu-bold">${index + 1}.</span> ${
        q.question
      }
        </div>
      `;
    });
    htmlContent += `
        </div>
      </div>
    `;
  }

  // Close HTML (footer removed)
  htmlContent += `
        </div>
      </body>
    </html>
  `;

  // Write content to the new window and trigger print
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Wait for content to render before printing
  printWindow.onload = () => {
    printWindow.print();
    // Optionally close the window after printing (uncomment if desired)
    // printWindow.close();
  };
};