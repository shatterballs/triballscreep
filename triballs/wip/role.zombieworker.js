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
            if(vacantflag){
              creep.moveTo(roomcontainers[j]);
              creep.memory.pairedcontainerId = roomcontainers[j].id;
              creep.memory.pairedsourceId = roomcontainer[j].pos.getClosestByRange(FIND_SOURCES).id
              creep.memory.harvesting = true;
            }
          }
        }else{
          var pairedcontainer = Game.getObjectById(creep.memory.pairedcontainerId);
          if(_.sum(pairedcontainer.store) < pairedcontainer.storeCapacity){
            creep.harvest(pairedcontainer);
          }
        }
    }
}

module.exports = rolezombieworker;
