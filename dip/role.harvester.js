var roleBuilder = require('role.builder'); 
var actionHarvest = require('action.harvest'); 
var actionMarkRoad = require('action.markRoad');

var roleHarvester = {

    run: function(creep) {
        
        
        var allSources = creep.room.find(FIND_SOURCES)
        
	    if(creep.memory.working && creep.carry.energy == 0) {
            
            actionHarvest.run(creep)
            creep.memory.working = false
            creep.say("harvesting")
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
                                structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                    }
            });
            
            var target = creep.pos.findClosestByRange(targets)
            
            if(targets.length > 0) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    actionMarkRoad.run(creep)
                }
            } else {
                roleBuilder.run(creep)
            }
        } else {
            actionHarvest.run(creep)
        }
        
	}
};

module.exports = roleHarvester;