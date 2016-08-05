/*to do
>>CURRENT GOALS: setup=>defend=>attack<< 
Setup stage:
SPAWN   ->  harvesters   -   CHECK
        ->  builders
            -> extensions
            -> other structures (Roads? need to check documentation)
                (moveByPath for roads?)
        -> upgraders
ROLE
*/

var roleharvester = require("role.harvester");

module.exports.loop = function () {

        var stage = "setup";
        if(stage=="setup")
        {
            /*SPAWN CONTROL*/
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length < 6){
                if(Game.spawns['Spawn1'].canCreateCreep([WORK, MOVE, CARRY], null, {role: 'harvester'}) == 0){ 
                    Game.spawns['Spawn1'].createCreep([WORK, MOVE, CARRY], null, {role: 'harvester'});
                }
            }
            else{ //more than 5 harvesters, build some builders, then some extenstions (to create creeps with more modules)
            }
            /*CREEP ACTION CONTROL*/
            //loop through all the properties in an object, in this case, object is the Game.creeps, and it contains all the creep objects in game.
            for(var NAME in Game.creeps){
                if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length == 0){
                    break;
                }
                var creep = Game.creeps[NAME];
                if(creep.memory.role=='harvester'){
                    //run script here for creeps with harvester role
                    roleharvester.run(creep);
                }
            }
        }
}
