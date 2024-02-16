const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function compressPdf(inputPath, outputPath, quality) {
 const settings = {
    'low': '/screen',
    'medium': '/ebook',
    'high': '/printer'
 };

 const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${settings[quality]} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

 try {
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
 } catch (err) {
    console.error('Error:', err);
 }
}

// Usage
const inputPath = "./marksheet-original.pdf"; // Path to the input PDF file
const outputPath = './output.pdf'; // Path to save the compressed PDF file
const quality = 'medium'; // Quality setting: 'low', 'medium', or 'high'

compressPdf(inputPath, outputPath, quality);
