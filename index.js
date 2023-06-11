const fullName = document.getElementById("full-name");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(fullName.value);

  //check if the text is empty or not
  if (val.trim() !== "" && fullName.checkValidity()) {
    generatePDF(val);
  } else {
    firstName.reportValidity();
  }
});

const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./cert.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./GreatVibes.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const GreatVibesFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 300,
    y: 330,
    size: 37.5,
    font: GreatVibesFont,
    color: rgb(4/255, 29/255, 41/255),
});

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  var file = new File(
    [pdfBytes],
    "Certificate of Achievement.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
  saveAs(file);
};

// init();
