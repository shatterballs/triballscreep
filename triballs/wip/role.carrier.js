/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var myFunctions = require('my.Functions');
 
var rolecarrier = {
  run: function(creep){
    //pair up with zombieworkers
    if(creep.memory.paired == false){
     var zombieworkers = _.filter(Game.creeps, function(creep){return creep.memory.role == 'zombieworker'}); //same room?
     var carriers = _.filter(Game.creeps, function(creep){return creep.memory.role == 'carrier'});
     var i;
     var j;
     for(i=0; i<zombieworkers.length; i++){//!!!check paired
       if(zombieworkers[i].memory.pcarrierc < 2){ //check if enough carriers are already assigned to the zombieworker yet. if not enough, pair the carrier with it
        creep.memory.pzombieworkerId = zombieworkers[i].id;
        creep.memory.pcontainerId = zombieworkers[i].memory.pcontainerId;
        creep.memory.paired = true;
        //zombieworkers[i].memory.pcarrierc++; //!!!need a failsafe if carrier dies, perhaps a line of code within to actually count memory in carriers
        //^bad practice to change memory of other objects outside of those objects, should be only retriving data from other objects
        console.log('"CARRIER '+creep.name + '"IS PAIRED WITH "ZOMBIEWORKER '+zombiworker[i].name+ '"');
       }
     }
    }
    if(creep.memory.paired){
     var pzombieworker = Game.getObjectById(creep.memory.pzombieworkerId);
     var pcontainer = Game.getObjectById(creep.memory.pcontainerId);
     if(creep.carry.energy < creep.carryCapacity){//check if maxed/not
         if(creep.withdraw(pcontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
             creep.moveTo(pcontainer);
         }
     }else{
         var target = myFunctions.findclosest(creep, FIND_MY_SPAWNS);
         if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
             creep.moveTo(target);
         }
     }
    }
  }
}

module.exports = rolecarrier;

//lol need to check for constants
