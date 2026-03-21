//npm - global command, comes with node
//npm init --version


//local inpendency - use only in this project
//npm init i <package_name> - install package

//global inpendency - use in any project
//npm install -g <package_name> - install package

//package.json - file that contains all the information about the project and its dependencies
//manual approach - create package.json file manually
//npm init - create package.json file automatically
//npm init -y - create package.json file automatically with default values


const _ = require('lodash'); //importing lodash library

const items = [1, [2, [3, [4]]]]; //array of arrays

const newItems = _.flattenDeep(items); //flattening the array using lodash library
console.log(newItems); //printing the flattened array