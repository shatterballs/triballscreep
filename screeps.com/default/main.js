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
    if(Game.spawns['Spawn1'].canCreateCreep([WORK, MOVE, CARRY], null, {role: 'harvester'}) == 0){ 
        Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], null, {role: 'harvester'});
        
    }
    else
    {
    }
}
    
//harvester count

    
}