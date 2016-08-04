module.exports.loop = function () {
/*to do
Setup stage-
harvester from spawn
*/
//creating the first harvester
//checking whether there's enough energy
var stage = "setup";
if(stage=="setup")
{
    /*SPAWN CONTROL*/
    if(_.filter(Game.creeps, ((creep)=>creep.Role.memory == 'Harvester')).length < 6){
        if(Game.spawns['Spawn1'].canCreateCreep([WORK, MOVE, CARRY], null, {role: 'harvester'}) == 0){ 
            Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], null, {role: 'harvester'});
        }
    }
    else //more than 5 harvesters
    {
        
    }
    /*CREEP ACTION CONTROL*/
    //loop through all the properties in an object, in this case, object is the Game.creeps, and it contains all the creep objects in game.
    for(var NAME in Game.creeps){
        if(Game.creeps[NAME].memory.Role=='Harvester'){
            //run script here for creeps with harvester role
        }
    }
    }
}
    
//harvester count

    
}
