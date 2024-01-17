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

    fs.readFile(__dirname + '/encrypted_files/' + fileName, 'ascii', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const newContent = header + data;

        fs.writeFile(__dirname + '/files_with_headers/file' + outputNumber + '.ppm', newContent, 'ascii', (err) => {
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
// file 1 with header 3 - heart (file2)
// file 2 with header 8 - letter L (file15)
// file 3 with header 7 - letter O (file22)
// file 4 with header 5 - letter V (file28)
// file 5 with header 1 - letter E (file32)
// file 6 with header 4 - letter y (file43)
// file 7 with header 2 - letter o (file49)
// file 8 with header 6 - letter u (file61)
