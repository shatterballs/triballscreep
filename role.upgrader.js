var actionHarvest = require('action.harvest');
var actionMarkRoad = require('action.markRoad');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var allSources = creep.room.find(FIND_SOURCES)
        
        if(creep.memory.working && creep.carry.energy == 0) {
            
            creep.say('harvesting')
            creep.memory.working = false;
	    }
	    
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.working) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                actionMarkRoad.run(creep);
            }
        } else {
            if (Game.spawns.Spawn1.memory.openToShare) {
	            var pickFrom = Game.spawns.Spawn1
	            
    	        if (creep.withdraw(pickFrom,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    	            creep.moveTo(pickFrom)
    	        }
	        } else {
	            var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES)
                if ( droppedResources.length > 0) { 
                    var droppedResource = creep.pos.findClosestByPath(droppedResources)
                    if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedResource)
                    }
                } else {
                    var containerWithEnergy = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
                    });
                    if ( containerWithEnergy.length > 0) { 
                        var target = creep.pos.findClosestByPath(containerWithEnergy)
                        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target)
                        }
                    } 
                }
	        }
        }
	}
};

module.exports = roleUpgrader;