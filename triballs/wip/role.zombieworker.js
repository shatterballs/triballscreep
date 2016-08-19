/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var myFunctions = require('my.Functions');
 
var rolezombieworker = {
  run: function(creep){
    //1. go to vacant container and is adjacent to source
    //2. continue to harvest until container is full
    var carriers = _filter(Game.creeps, function(creep){return creep.memory.role == 'carrier'});
    //check if the carriers are paired to this creep, and count no.
    creep.memory.pcarrierc = 0;
    for(var CREEPNAME in carriers){ //scan through all carriers, and 
     if(carriers[CREEPNAME].memory.pzombieworkerId == creep.id){ //check if paired with this zombieworker creep
      creep.memory.pcarrierc++;
     }
    }
        if(creep.memory.harvesting == false){
          var roomcontainers = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
          var i;
          var j;
          for(i=0; i < roomcontainers.length; i++){//check if occupied by zomebieworker creep
            var containerobj = creep.room.lookAt(roomcontainers[i]);
            var vacantflag = true; //assume vacant
            for(j=0; (j<containerobj.length)&&(!vacantflag); j++){
              if(containerobj[j].type == 'creep'){// check if creep is on top
                if(containerobj[j].creep.memory.role == 'zombieworker'){//check if creep is zombieworker
                  vacantflag = false; //zombieworker already occupied the container
                }
              }
            }
            if(vacantflag){//if vacant, set
              creep.memory.pcontainerId = roomcontainers[j].id;
              creep.memory.psourceId = roomcontainer[j].pos.getClosestByRange(FIND_SOURCES).id
              creep.memory.harvesting = true;
            }
          }
        }else{
          var pcontainer = Game.getObjectById(creep.memory.pcontainerId);
          var psource = Game.getObjectById(creep.memory.psourceId);
          if(_.sum(pcontainer.store) < pcontainer.storeCapacity){
            if(creep.harvest(psource) == ERR_NOT_IN_RANGE){
             creep.moveTo(pcontainer);
            }
          }
        }
    }
}

module.exports = rolezombieworker;
