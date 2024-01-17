const fs = require('fs');
const crypto = require('crypto');

const fileNames = [
    'm.ppm',
    'i.ppm',
    'h.ppm',
    'a.ppm',
    'i2.ppm',
];

function encryptFile(fileName, outputNumber) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); 
    const iv = crypto.randomBytes(16);

    const inputFilePath = __dirname + '/plain_letters_without_headers/' + fileName;
    const outputFilePath = __dirname + '/encrypted_letters/file' + outputNumber + '.ppm';
    
    const readStream = fs.createReadStream(inputFilePath);
    const writeStream = fs.createWriteStream(outputFilePath);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    readStream
    .pipe(cipher)
    .pipe(writeStream)
    .on('finish', () => {
        console.log('File has been encrypted.');
    });
}

let outputCounter = 1;
for (let i = 0; i < fileNames.length; ++i) {
    encryptFile(fileNames[i], outputCounter);
    ++outputCounter;
}