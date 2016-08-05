var roleUpgrader = require('role.upgrader');
var actionPlanRoad = require('action.planRoad');
var actionMarkRoad = require('action.markRoad');


var roleBuilder = {
    run: function(creep) {
        
        
        var allSources = creep.room.find(FIND_SOURCES)

	    if(creep.memory.working && creep.carry.energy == 0) {

            creep.memory.working = false;
            creep.say('harvesting');
	    }
	    
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.working = true;
	        creep.say('building');
	    }
	    

	    if(creep.memory.working) {

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var repairTargets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => {structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax}})
            if (repairTargets.length > 0) {
                var repairTarget =  creep.pos.findClosestByPath(repairTargets)
                if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget);
                }
            } else if (targets.length > 0) {
                var target = creep.pos.findClosestByPath(targets)
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                roleUpgrader.run(creep);
            };
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

module.exports = roleBuilder;