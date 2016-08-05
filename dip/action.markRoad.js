var actionMarkRoad = {
    
    run: function(creep) {
        if(creep.room.memory.roadMatrix == undefined) {
            
            var roadMatrix = new Array(2)
            for (var i = 0; i <2; i++) {
                roadMatrix[i] = new Array(50)
                for (var j = 0; j < 50; j++) {
                    roadMatrix[i][j] = new Array(50)
                }
            }
            console.log(roadMatrix)
            creep.room.memory.roadMatrix = roadMatrix
            
        } else {
            
            var x = creep.pos.x
            var y = creep.pos.y
            creep.room.memory.roadMatrix[1][x][y] += 1
        }

    }
    
}

module.exports = actionMarkRoad