/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var myFunctions = require('my.Functions');
 
var rolestarter = {
   //this is a function within the rolHarvester object. Can be called by roleHarvester.run(creep)
  run: function(creep){
   //pairing with safeSourcesId, 3 starters per source
   if(creep.memory.paired == false){
    var safeSourcesId = creep.room.memory.safeSourcesId;
    var i=0;
    for(i=0; i<safeSourcesId.length && creep.memory.paired; i++){
     if(_.filter(Game.creeps, function(creep){return creep.memory.pssId == safeSourcesId[i]}).length < 3){
      creep.memory.pssId = safeSourcesId[i];
      creep.memory.paired = true;
     }
    }
   }
        if(creep.carry.energy < creep.carryCapacity){//check if maxed/not
            var source = Game.getObjectById(creep.memory.pssId);  
         //myFunctions.findclosest(creep, FIND_SOURCES) should return source object that is closest to the creep
            if(creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }else{
            var spawn = myFunctions.findclosest(creep, FIND_MY_SPAWNS);
            var constructionsite = myFunctions.findclosest(creep, FIND_CONSTRUCTION_SITES);
            if(spawn.energy == spawn.energyCapacity){
                if(creep.build(constructionsite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(constructionsite);
                }
            }else{
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(spawn);
                }
            }
        }
    }
}

module.exports = rolestarter;
