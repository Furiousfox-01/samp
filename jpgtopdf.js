const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");

async function convertImageToPdf(imagePath, pdfPath) {
  const image = await fs.promises.readFile(imagePath);
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 400]);
  const imageEmbed = await pdfDoc.embedJpg(image);
  const { width, height } = imageEmbed.scaleToFit(
    page.getWidth(),
    page.getHeight()
  );
  page.drawImage(imageEmbed, {
    x: page.getWidth() / 2 - width / 2,
    y: page.getHeight() / 2 - height / 2,
    width,
    height,
    color: rgb(0, 0, 0),
  });
  const pdfBytes = await pdfDoc.save();
  await fs.promises.writeFile(pdfPath, pdfBytes);
}

convertImageToPdf("./MADHUBALAN M-Photo.jpg", "output.pdf")
  .then(() => {
    console.log("Image converted to PDF successfully!");
  })
  .catch((error) => {
    console.error("Error converting image to PDF:", error);
  });
