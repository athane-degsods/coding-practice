const { readFile, writeFile } = require('fs');
console.log('start');
readFile('./content/first.txt',
    'utf-8',
    (err, result) => {
        console.log('first callback');
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const first = result;
    readFile('./content/subfolder/second.txt',
        'utf-8',
        (err, result) => {
            console.log('second callback');
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            const second = result;
            writeFile('./content/result-async.txt',
                `Here is the result: ${first}, ${second}`,
                (err, result) => { 
                    if (err) {
                        console.error('Error writing file:', err);
                        return;
                    }
                    console.log('done with this task');
            });
    });
    
});

console.log('starting the next one');

