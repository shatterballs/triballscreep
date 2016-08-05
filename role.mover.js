var actionMarkRoad = require('action.markRoad');
var roleBuilder = require('role.builder');

var roleMover = {

    run: function(creep) {
        
	    if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false
            creep.say("collecting")
	    }
	    
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true
	        creep.say("storing")
	    }
	    
	    if(creep.memory.working) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER ) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                var target = creep.pos.findClosestByRange(targets)
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    actionMarkRoad.run(creep)
                }
            } else {
                roleBuilder.run(creep)
            }
        } else  {
            // search for potential gathered resources first
            var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES)
            var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
                });
            if ( droppedResources.length > 0) { 
                // currently, no way to get amount of droppedResources
                var droppedResource = creep.pos.findClosestByPath(droppedResources)
                if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droppedResource)
                }
            } else if ( containerWithEnergy.length > 0) { 
                    // WIP see if can check the amount of container energy
                    for (i in containerWithEnergy) {
                        console.log("WIP for mover, containerWithEnergy: " + Object.keys(containerWithEnergy))
                    }
                    var target = creep.pos.findClosestByPath(containerWithEnergy)
                    if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target)
                    }
            } else {
                // since there are no droppedResources and no containeres with eneryg, proceed to mine the straight from source
                console.log("Mover running emergency protocal: no pre-gathered resources")
                var allSources = creep.room.find(FIND_SOURCES);
                var source = creep.pos.findClosestByPath(allSources);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                };
            }
        } 
	}
};

module.exports = roleMover;