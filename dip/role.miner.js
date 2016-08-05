var roleMiner = {

    run: function(creep) {
        
        if(creep.memory.assignedSourceId == undefined) {
            // need to change to detect if source is occupied by another miner
            creep.memory.assignedSourceId = creep.room.find(FIND_SOURCES)[0].id
            console.log(creep.name + " assigned to mine")
        }
        
        var assignedSource = Game.getObjectById(creep.memory.assignedSourceId);
        
	    if(creep.memory.working && !creep.pos.isNearTo(assignedSource.pos)) {
            creep.memory.working = false
            creep.say("moving")
	    }
	    
	    if(!creep.memory.working && creep.pos.isNearTo(assignedSource.pos) ) {
	        creep.memory.working = true
	        creep.memory.assignedSpot = creep.pos
	        creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER)
	        creep.say("arrived")
	    }
	    
	    if(creep.memory.working) {
            creep.harvest(assignedSource)
        } else {
            creep.moveTo(assignedSource.pos)
        }
	}
};

module.exports = roleMiner;