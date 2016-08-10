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
//var rolezombieworker = require("role.zombieworker");
var myFunctions = require("my.Functions");
/*GLOBAL VARIABLES*/
        //structure count
                var sitecount = 0; //constructionsite
                var containercount = 0; //containers

module.exports.loop = function () {
        /*GAME STAGE*/
        var urgent = 0;
        var stage = "setup";
//---------------------------------------------------------------------------------------------------
        /*GLOBAL VARIABLES*/
        //Keeping track of sources, currently only works in rooms['sim']
                var allSources = Game.rooms['sim'].find(FIND_SOURCES); //returns an array with 3 source objects
                var keeperLairs = Game.rooms['sim'].find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_KEEPER_LAIR}});//returns an array with 1 keeper lair object
                var lairSources = keeperLairs[0].pos.findClosestByRange(FIND_SOURCES);
                var safeSources = _.filter(allSources, function(n){ return n != lairSources});
                var containersites = Game.rooms['sim'].find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_CONTAINER}}).length;
                //var sourcecontainersites = [];
                //arrange safeSources according to distance from spawn
//--------------------------------------------------------------------------------------------------
        //containers besides the safe sources
       for(var ROOMNAME in Game.rooms){//cycle through all the owned rooms
                var room = Game.rooms[ROOMNAME]; 
                //find closest safeSources
                var tempSSources = safeSources;
                while(containersitecount < 2){
                        var distarray = [];
                        for(var i = 0; i<tempSSources.length; i++){
                                distarray.push(Game.spawns['Spawn1'].pos.getRangeTo(tempSSources[i]));
                        }
                        var index = 0;
                        var value = distarray[0];
                        for (var i = 1; i < distarray.length; i++) {
                          if (distarray[i] < value) {
                            value = distarray[i];
                            index = i;
                          }
                        } //closest safeSources to spawn1: tempSSources[index]
                        /*
                        console.log('closest to spawn safe source: ' + tempSSources[index])
                        console.log('tempSSources: ' + tempSSources)
                        console.log('distarray: ' + distarray)
                        console.log('index: ' + index)
                        console.log('value: ' + value)
                        */
                    //left/right/top/bottom coordinates of the source in two arrays
                    var x = tempSSources[index].pos.x;
                    var y = tempSSources[index].pos.y;
                    var arrayx = [x-1, x, x+1];
                    var arrayy = [y-1, y, y+1]; //limits the number of construction sites for containers to be < 2 (max.2)
                                if(_.filter(room.lookForAtArea(LOOK_STRUCTURES,arrayy[0],arrayx[0],arrayy[2],arrayx[2],true), {structure: STRUCTURE_CONTAINER}).length == 0){
                                        if(_.filter(room.lookForAtArea(LOOK_CONSTRUCTION_SITES,arrayy[0],arrayx[0],arrayy[2],arrayx[2],true), 'constructionSite').length == 0){
                                                for(var i=0; i<2; i++){
                                                        for(var j=0; j<2; j++){
                                                                if(room.createConstructionSite(arrayx[i], arrayy[j], STRUCTURE_CONTAINER) == 0){
                                                                        containersitecount++;
                                                                        break; break;
                                                                }
                                                        }
                                                }
                                        }
                                }
                        tempSSources = _.filter(tempSSources, function(currentObject){ return currentObject != tempSSources[index]});
                }
        }
        //pair completed containers with zombieharvesters
        containersites = Game.rooms['sim'].find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_CONTAINER}}).length;
        //zomebieworkers
        var zombieworkers = _.filter(Game.creeps, function(creep){return creep.memory.role == 'zombieworker'});
        //if(no. of zomebieworkers < containersites)
        //spawn one zombieworker
//---------------------------------------------------------------------------------------------------
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
            /*

            */
        /*CREEP ACTION CONTROL*/
        //loop through all the properties in an object, in this case, object is the Game.creeps, and it contains all the creep objects in game.
        
            for(var NAME in Game.creeps){
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
       
    }



    

