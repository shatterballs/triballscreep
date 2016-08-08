/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var myFunctions = require('my.Functions');

var roleharvester = {
   //this is a function within the rolHarvester object. Can be called by roleHarvester.run(creep)
  run: function(creep){
    //might have to use getKeys() in myFunction to see what's in the creep(?)
    //1. go to energy source and extract if carrying<carryingcap
    //2. go back to spawn/ other structures to dump energy
        if(creep.carry.energy < creep.carryCapacity){//check if maxed/not
            var source = myFunctions.findclosest(creep, FIND_SOURCES);  
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }else{
            var target = myFunctions.findclosest(creep, FIND_MY_SPAWNS);
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
            }
        }
    }
}

module.exports = roleharvester;

//lol need to check for constants
