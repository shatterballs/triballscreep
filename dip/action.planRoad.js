var actionPlanRoad = {
    
    run: function(creep) {
        // this should be done by Spawn per something tick
        
        if (creep.room.memory.roadObject == undefined) {
            var constructing = new Object()
            function roadObject(posId) {
                this.x =  posId % 50;
                this.y = (posId - posId % 50) / 50;
                this.isRoad = false
            }
            for ( i = 0; i < 2500; i++) {
                constructing[i] = new roadObject(posId)
            }
            creep.room.memory.roadObject = constructing
        }
        
        var roadObject = creep.room.memory.roadObject;
        
        if ((Game.time % 100) == 0) {
            var currentRoad = creep.room.find(FIND_STRUCTURES,{filter: {structureType: STRUCTURE_ROAD} })
            var numNewRoad = 0;
            
            for(i in currentRoad) {
                var x = currentRoad[i].pos.x
                var y = currentRoad[i].pos.y
                var posId = x + y * 50
                
                if (roadObject[posId].isRoad) {
                    // console.log(x + " , " + y + " is already road")
                } else {
                    roadObject[posId].isRoad = true
                    numNewRoad += 1;
                    // console.log(x + " , " + y + " has been registered as road")
                }
            }
            console.log("roadObject updated: " + numNewRoad + " new roads have been registered")
        }
        
        var haveRoad = _.filter(roadObject, (road) => {road.isRoad == true } )
        // console.log(haveRoad.length)
        
        /*
        
        if(currentConstructionSite < 1) {
            var max = 0;
            var maxX = 0;
            var maxY = 0;
        
            
            if (max < 10) {
                console.log("Tile used only: " + max + " times")
            } else {
                creep.room.createConstructionSite(maxX,maxY,STRUCTURE_ROAD)
                console.log("Road planned at: " + maxX + " , " + maxY + ". Used by " + max)
                creep.room.memory.roadMatrix[0][maxX][maxY] = 1;
            }
        } else {
            console.log("Too many sites planned: " + currentConstructionSite + " sites")
        }
        
        */
        
        
    }
}

module.exports = actionPlanRoad;