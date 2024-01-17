const fs = require('fs');
const crypto = require('crypto');

const fileNames = [
    'm.ppm',
    'i.ppm',
    'h.ppm',
    'a.ppm',
    'i2.ppm',
];

const headers = [
    'P6\n519 340\n255\n',
    'P6\n250 379\n255\n',
    'P6\n248 234\n255\n',
    'P6\n325 264\n255\n',
    'P6\n163 217\n255\n',
]

function encryptWithECB(text, key) {
    const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
    let encrypted = cipher.update(text, 'utf-8');
    return encrypted;
}

function encryptFile(fileName, outputNumber) {
    const inputFilePath = __dirname + '/plain_letters_without_headers/' + fileName;
    const outputFilePath = __dirname + '/encrypted_letters/file' + outputNumber + '.ppm';

    const fileData = fs.readFileSync(inputFilePath, { encoding: 'ascii' });
    const key = crypto.randomBytes(16);
    
    const encryptedData = encryptWithECB(fileData, key);

    fs.writeFileSync(outputFilePath, encryptedData, { encoding: 'ascii' });
    console.log('encryption successful')
}

function createFileWithHeader(fileName, header, outputNumber) {

    fs.readFile(__dirname + '/encrypted_letters/' + fileName, 'ascii', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const newContent = header + data;

        fs.writeFile(__dirname + '/decrypted_letters/file' + outputNumber + '.ppm', newContent, 'ascii', (err) => {
            if (err) {
                console.error('Error writing the file:', err);
            } else {
                console.log('PPM file updated with header successfully.');
            }
        })
    })
}

let outputCounter = 1;
for (let i = 0; i < fileNames.length; ++i) {
    encryptFile(fileNames[i], outputCounter);
    ++outputCounter;
}

for (let i = 0; i < 5; ++i) {
    let fileNumber = i + 1;
    let fileName = 'file' + fileNumber + '.ppm';
    createFileWithHeader(fileName, headers[i], i);
}