const crypto = require('crypto');

let maxSize = 1000;

const file_hashes = [
    '602a4a8fff652291fdc0e049e3900dae608af64e5e4d2c5d4332603c9938171d',
    'f40e838809ddaa770428a4b2adc1fff0c38a84abe496940d534af1232c2467d5',
    'aa105295e25e11c8c42e4393c008428d965d42c6cb1b906e30be99f94f473bb5',
    '70f87d0b880efcdbe159011126db397a1231966991ae9252b278623aeb9c0450',
    '77a39d581d3d469084686c90ba08a5fb6ce621a552155730019f6c02cb4c0cb6',
    '456ae6a020aa2d54c0c00a71d63033f6c7ca6cbc1424507668cf54b80325dc01',
    'bd0fd461d87fba0d5e61bed6a399acdfc92b12769f9b3178f9752e30f1aeb81d',
    '372df01b994c2b14969592fd2e78d27e7ee472a07c7ac3dfdf41d345b2f8e305'
]

for (let width = 1; width < maxSize; ++width) {
    for (let height = 1; height < maxSize; ++height) {
        let heading = 'P6 ' + width + ' ' + height + ' 255';
        let hash = crypto.createHash('sha256').update(heading).digest('hex');

        for (let file_hash of file_hashes) {
            if (file_hash === hash) {
                console.log(file_hash + ' ' + width + ' ' + height);
            }
        }
    }
}

