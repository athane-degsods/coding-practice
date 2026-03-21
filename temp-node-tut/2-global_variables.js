// GLOBALS  - NO WINDOW !!!!

// __dirname  - path to current directory
// __filename - file name
// require    - function to use modules (CommonJS)
// module     - info about current module (file)
// process    - info about env where the program is being executed

//console.log(require); // function to use modules (CommonJS)
//console.log(module); // info about current module (file)
//console.log(process); // info about env where the program is being executed

console.log(__dirname); // path to current directory
setInterval(() => {
    console.log('hello world'); // prints hello world every second
}, 1000)
