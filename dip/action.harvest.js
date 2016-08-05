var actionHarvest = {

    run: function(creep) {
        
        var allSources = creep.room.find(FIND_SOURCES) 
        
        if(creep.memory.working) {
            
            
            var pathLength = []
            for (i in allSources) {
                
                var path = creep.room.findPath( creep.pos, allSources[i].pos, {ignoreCreeps : true}) 
                
                var pathCost = 0
                for (i = 0; i < path.length; i ++) {
                    var objectOnTile = creep.room.lookAt(path[i].x,path[i].y)
                    var tileCost = 2
                    for (var j = 0; j <  objectOnTile.length; j++) {
                        if (objectOnTile[j].type == "structure") {
                            if(objectOnTile[j].structure.structureType == "road") { tileCost = 1 };
                        } else if (objectOnTile[j].type == "terrain") {
                            if(objectOnTile[j].terrain = "swamp" & tileCost != 1) { tileCost = 10 };
                        }
                    }
                    pathCost += tileCost
                }
                pathLength.push(pathCost)
                

            }
    
            
            var waitTime = []
            for (i = 0; i < allSources.length; i++) {
                waitTime[i] = pathLength[i] + creep.room.memory.sourceEQTime[i]
            }
    
            var min = Infinity
            var minIndex = 0
            for (i = 0; i < allSources.length; i++) {
                if(waitTime[i] < min) {
                    min = waitTime[i]
                    minIndex = i
                }
            }
            
            // report harvest decision process
            
            /*
            
            console.log(creep.name + " thinks:")
            console.log("   Travel time: " + pathLength)
            console.log("   Source Qtime: " + creep.room.memory.sourceEQTime)
            console.log("   Wait time " + waitTime)
            console.log("   " + creep.name + " going to source number " + (minIndex+1) )
            
            */
            
            // console.log("Current sources queue time " + creep.room.memory.sourceEQTime)
            creep.memory.sourceId = allSources[minIndex].id
            
            
        } else { 
            
            var source = Game.getObjectById(creep.memory.sourceId);
            var targetedSource = allSources.indexOf(source)
            
            var miningSpeed = 0
            for (i in creep.body) {
                if(creep.body[i].type == "work") {
                    miningSpeed = miningSpeed + 2
                }
            } 
            
            var report = (creep.carryCapacity-creep.carry.energy) / miningSpeed
            creep.room.memory.sourceQTime[targetedSource] += report

            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } else {
                creep.room.memory.creepMiningSource[targetedSource] += 1
            }
            
            
            
            for (i = 0; i < allSources.length; i++) {
                if( creep.room.memory.creepMiningSource[i] == 0) {
                    creep.room.memory.sourceEQTime[i] = creep.room.memory.sourceEQTime[i]
                } else {
                    creep.room.memory.sourceEQTime[i] = Math.round(creep.room.memory.sourceQTime[i] / creep.room.memory.creepMiningSource[i])
                }
            }

        }
        
    }
}


module.exports = actionHarvest;