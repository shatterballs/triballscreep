/*to do
>>CURRENT GOALS: setup=>defend=>attack<< 
Setup stage:
SPAWN   ->  *zombieharvesters
        ->  carriers
            -> extensions
            -> other structures (Roads? need to check documentation)
                (moveByPath for roads?)
        -> upgraders
ROLE    -> harvesters - CHECK

STRUCTURE_CONTAINER -> build beside sources?, get creeps to sit on top and do their jobs (make containers||creep pairs)
*/

var roleharvester = require("role.harvester");

module.exports.loop = function () {
        var urgent = 0;
        var stage = "setup";
        if(stage=="setup")
        {
            /*SPAWN CONTROL*/
            //setup, thebeginning
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'thebeginning').length < 2){
                    for(var SPAWNNAME in Game.spawns){//cycle through all keys in the Game.spawns object
                        if(Game.spawns[SPAWNNAME].canCreateCreep([WORK, MOVE, CARRY], null) == 0){ 
                        //Game.spawns[SPAWNNAME] is the spawn object that have enough energy to spawn
                                if(_.filter(Game.creeps, (creep) => creep.memory.role == 'thebeginning').length == 0){
                                        Game.spawns[SPAWNNAME].createCreep([WORK, MOVE, CARRY], 'Adam', {role: 'thebeginning'});
                                }
                                else{
                                        Game.spawns[SPAWNNAME].createCreep([WORK, MOVE, CARRY], 'Eve', {role: 'thebeginning'});
                                }
                        }
                        
                    }
            }
            //spawning zombieworkers, nummber of zombieworkers = no. of containers in room
            //no. of containers depends on 
            //  1.number of sources
            //  2.controller (one in each room)
            for(var ROOMNAME in Game.rooms){//cycle through all the owned rooms
                var room = Game.room[ROOMNAME];
                var sources = room.find(FIND_SOURCES);   
                var countsources = _.filter(sources).length; //countsources is the number of sources in the current room
                for(SOURCENAME in sources){
                        room.lookAtArea(sources[SOURCENAME].pos.y-1, sources[SOURCENAME].pos.x-1, sources[SOURCENAME].pos.y+1,sources[SOURCENAME].pos.x+1,1)
                        //position object in sources[SOURCENAME]= sources[SOURCENAME].pos
                }       //lookAtArea(top, left, bottom, right, [asArray]) Get the list of objects at the specified room area.
            if(_.filter(Game.creeps, (creep) => creep.memory.role == 'zombieworker').length < countsources){
                    for(var SPAWNNAME in Game.spawns){
                        if(Game.spawns[SPAWNNAME].canCreateCreep([WORK, WORK, MOVE], null}) == 0){ 
                                Game.spawns[SPAWNNAME].createCreep([WORK, WORK, MOVE], null, {role: 'zomebieworker'});
                }
                
            }
            else{ 
                
                    
            }
        }
        /*CREEP ACTION CONTROL*/
        //loop through all the properties in an object, in this case, object is the Game.creeps, and it contains all the creep objects in game.
        for(var NAME in Game.creeps){
                if(_.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length == 0){//avoiding error logs when there are 0 creeps
                    break;
                }
        var creep = Game.creeps[NAME];
        if(creep.ticksToLive < 100){//RENEW CREEPS
                //move to spawn, renew
                var spawn = myFunctions.findclosest(creep, FIND_MY_SPAWNS);
                if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE){
                        creep.moveTo(spawn);
                }
        }else{//ACTIONS ACCORDING TO ROLES
            if(creep.memory.role=='thebeginning'){
                roleharvester.run(creep); //modify harvester behaviours in role.harvester module
            }
        }
       
    }
}


    

