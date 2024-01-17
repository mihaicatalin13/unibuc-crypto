const fs = require('fs');

const headers = [
    'P6\n400 433\n255\n',
    'P6\n465 464\n255\n',
    'P6\n512 512\n255\n',
    'P6\n513 613\n255\n',
    'P6\n525 489\n255\n',
    'P6\n559 530\n255\n',
    'P6\n585 577\n255\n',
    'P6\n598 605\n255\n',
]

const fileNames = [
    'File1_encr.ppm',
    'File2_encr.ppm',
    'File3_encr.ppm',
    'File4_encr.ppm',
    'File5_encr.ppm',
    'File6_encr.ppm',
    'File7_encr.ppm',
    'File8_encr.ppm',
];

function createFileWithHeader(fileName, header, outputNumber) {

    fs.readFile(__dirname + '/encrypted_files/' + fileName, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const newContent = header + data;
        fs.writeFile(__dirname + '/files_with_headers/file' + outputNumber + '.ppm', newContent, 'utf-8', (err) => {
            if (err) {
                console.error('Error writing the file:', err);
            } else {
                console.log('PPM file updated with header successfully.');
            }
        })
    })
}

let outputCounter = 0;

for (let i = 0; i < fileNames.length; ++i) {
    for (let j = 0; j < headers.length; ++j) {
        createFileWithHeader(fileNames[i], headers[j], outputCounter);
        ++outputCounter;
    }
}

// output files that make sense:
// file 18 - butterfly
