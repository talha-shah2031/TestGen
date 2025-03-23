export const generateEnglishPDF = (
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
  // Grade to class name mapping
  const gradeToClass = {
    grade9: "Matric Part - I (9th Class)",
    grade10: "Matric Part - II (10th Class)",
    grade11: "Intermediate Part - I (11th Class)",
    grade12: "Intermediate Part - II (12th Class)",
  };

  // Convert time to English
  const timeInEnglish = time === "1 hour" ? "1 hour" : time;

  // Build the HTML content with Google Fonts import and MathJax
  let htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>All rights reserved by TestGen</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/js-polyfills/0.1.43/polyfill.min.js" integrity="sha512-lvWiOP+aMKHllm4THsjzNleVuGOh0WGniJ3lgu/nvCbex1LlaQSxySUjAu/LTJw9FhnSL/PVYoQcckg1Q03+fQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
          
          @page {
            size: A4;
            margin: 20mm 10mm 20mm 10mm;
            @top-right {
              content: "All rights reserved by TestGen";
              font-family: 'Poppins', sans-serif;
              opacity: 0.5;
              font-size: 8pt;
            }
            @bottom-center { content: ""; }
          }
          body {
            margin: 0;
            padding: 0;
            direction: ltr;
            font-family: Arial, sans-serif;
          }
          .container {
            width: 190mm;
            margin: 0 auto;
          }
          h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 20pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 2mm;
          }
          h2 {
            font-family: 'Poppins', sans-serif;
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
            text-align: left;
          }
          .question span {
            margin-right: 5mm;
          }
          .section {
            margin-bottom: 8mm;
          }
          .long-section {
            margin-bottom: 15mm;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${academyName.toUpperCase()}</h1>
          <p style="text-align: center;">${gradeToClass[grade] || "Grade Not Specified"}</p>
          <div class="flex-between">
            <p>Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)} (LHR Board)</p>
            <p>Time Allowed: ${timeInEnglish}</p>
          </div>
          <div class="flex-between">
            <p>Syllabus: Chapter ${chapter}</p>
            <p>Total Marks: ${mcqsCount + sqCount * 2 + lqCount * 5}</p>
          </div>
          <hr />
  `;

  // MCQs Section
  if (questions.mcqs?.questions) {
    htmlContent += `
      <div class="section">
        <h2 style="display: flex; justify-content: space-between;">
          <span>Question #1: Multiple Choice Questions</span>
          <span>{${mcqsCount}×1 = ${mcqsCount} marks}</span>
        </h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Question</th>
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
          <td style="text-align: left;">${q.question}</td>
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
        <h2 style="display: flex; justify-content: space-between;">
          <span>Question #2: Give Short Answers</span>
          <span>{${sqCount}×2 = ${sqCount * 2} marks}</span>
        </h2>
        <div style="margin-top: 1mm;">
    `;
    questions.sq.questions.forEach((q, index) => {
      htmlContent += `
        <div class="question">
          <span><strong>${index + 1}.</strong></span> ${q.question}
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
        <h2 style="display: flex; justify-content: space-between;">
          <span>Question #3: Attempt All Questions</span>
          <span>{${lqCount * 5} marks}</span>
        </h2>
        <div style="margin-top: 1mm;">
    `;
    questions.lq.questions.forEach((q, index) => {
      htmlContent += `
        <div class="question">
          <span><strong>${String.fromCharCode(97 + index)}.</strong></span> ${q.question}
        </div>
      `;
    });
    htmlContent += `
        </div>
      </div>
    `;
  }

  // Close HTML
  htmlContent += `
        </div>
      </body>
    </html>
  `;

  // Create a hidden iframe to hold the content
  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.top = "-1000px";
  iframe.style.left = "-1000px";
  document.body.appendChild(iframe);

  // Write the content to the iframe
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(htmlContent);
  iframeDoc.close();

  // Trigger the print dialog
  iframe.onload = () => {
    iframe.contentWindow.print();
    // Optionally remove the iframe after printing
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Wait for print dialog to close
  };
};
