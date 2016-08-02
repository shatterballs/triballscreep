/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('myFunctions');
 * mod.thing == 'a thing'; // true
 */
//myfunctions
function ayylmao() {
    console.log("NO ERRORS");
}
function creepcount() {
    console.log('Harvesters: ' + _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length);
    console.log('Builders: ' + _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length);
    console.log('Upgraders: ' + _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length);
}
module.exports = {
    ayylmao: ayylmao,
    creepcount: creepcount
}

//we define an object called 'require('myFunction)' here
//there are two functions in the require('myFunction) object, which are ayylmao() and creepcount()
//to call these functions in console, 
//require("myFunction").ayylmao();
//require("myFunction").creepcount;
