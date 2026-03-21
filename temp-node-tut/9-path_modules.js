const path = require('path');

console.log(path.sep); // prints the platform-specific path separator (e.g., '/' on Unix, '\' on Windows)

const filePath = path.resolve('/content', 'subfolder', 'test.txt'); // joins path segments into a single path
console.log(filePath); // prints the joined path

const base = path.basename(filePath); // gets the last portion of the path (the file name)
console.log(base); // prints the file name

const absolute = path.join(__dirname, 'content', 'subfolder', 'test.txt'); // gets the absolute path
console.log(absolute); // prints the absolute path