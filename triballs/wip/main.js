/*to do
>>CURRENT GOALS: setup=>defend=>attack<< 
Setup stage:
SPAWN   ->  *zombieharvesters
        ->  carriers
            -> extensions
            -> other structures (Roads? need to check documentation)
                (moveByPath for roads?)


STRUCTURE_CONTAINER -> build beside sources?, get creeps to sit on top and do their jobs (make containers||creep pairs)
*/

var rolestarter = require("role.starter");
var rolezombieworker = require("role.zombieworker");
var myFunctions = require("my.Functions");
/*GLOBAL VARIABLES*/
        //structure count
                var sitecount = 0; //constructionsite
                var poscount = 0; //construction sites for roads
                var starterindex = 0;

module.exports.loop = function () {
        /*GAME STAGE*/ //store in room.memory instead, NEED CHANGE
        var urgent = 0;
        var stage = 0;
        /*creep types*/
        for(var SPAWNNAME in Game.spawns){//cycle through all the owned rooms
                var spawn = Game.spawns[SPAWNNAME];
                var energycap = spawn.energyCapacity;
                if(energycap <= 300){
                    spawn.memory.starterconfig = [WORK, CARRY, MOVE];
                    spawn.memory.zombieworkerconfig = [WORK, WORK, MOVE];
                    spawn.memory.carrierconfig = [CARRY, CARRY, CARRY, CARRY, MOVE];
                }
        }
if(stage == 0){//cycle through all keys in the Game.spawns object
        var spawn = Game.spawns['Spawn1'];
        spawn.memory.starterconfig = [WORK, CARRY, MOVE];
        spawn.memory.zombieworkerconfig = [WORK, WORK, MOVE];
        spawn.memory.carrierconfig = [CARRY, CARRY, CARRY, CARRY, MOVE];
        var room = Game.rooms['sim'];
        var allSources = room.find(FIND_SOURCES); //returns an array with 3 source objects
        var keeperLairs = room.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_KEEPER_LAIR}});//returns an array with 1 keeper lair object
        var lairSources = keeperLairs[0].pos.findClosestByRange(FIND_SOURCES);
        var safeSources = _.filter(allSources, function(n){ return n != lairSources});
        
        var temparray =[];
        for(var i=0; i<safeSources.length; i++){
                temparray.push(safeSources[i].id);
        }
        room.memory.safeSourcesId = temparray;
        //1. - check
        var ssc = safeSources.length; //need to create ssc no. of groups
        
        if(starterindex < ssc){
                if(_.filter(Game.creeps, (creep) => creep.memory.role == 'starter').length < ssc*3){//check if starter count is enough
                        if(_.filter(Game.creeps, (creep) => creep.memory.sgroup == starterindex).length < 3){
                                if(spawn.canCreateCreep(spawn.memory.starterconfig, null) == 0){ 
                                        spawn.createCreep(spawn.memory.starterconfig, null, {role: 'starter', sgroup: starterindex, paired: false});
                                        console.log('starterindex: ' + starterindex)
                                }   
                        }else{starterindex++;} //check if the groups are fully occupied
                }
        }
                
             
/*objectives:
1.set mine-able sources -
2.set 3 starter creeps per mine-able source -
3.if creepcreation complete, build extensions -
4.until energycap requirement met -
*/
}
if(stage == 1){       
//---------------------------------------------------------------------------------------------------
        for(var ROOMNAME in Game.rooms){//cycle through all the owned rooms
             var room = Game.rooms[ROOMNAME];
                var allSources = room.find(FIND_SOURCES); //returns an array with 3 source objects
                var keeperLairs = room.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_KEEPER_LAIR}});//returns an array with 1 keeper lair object
                var lairSources = keeperLairs[0].pos.findClosestByRange(FIND_SOURCES);
                var safeSources = _.filter(allSources, function(n){ return n != lairSources});
                var containersites = room.find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_CONTAINER}});
                //arrange safeSources according to distance from spawn
//--------------------------------------------------------------------------------------------------
               var ccsc = room.find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_CONTAINER}}).length;
               if(ccsc < 1){
                    var tempSSources = safeSources;
                    var containersitecount = containersites.length;
                    //rearrange safeSources array into arrSources, accending order
                    var m = 0;
                    var arrSources = [];
                    var sslength = safeSources.length;
                    while(m < sslength){
                        var distarray = [];
                        for(var i = 0; i<tempSSources.length; i++){
                            distarray.push(Game.spawns['Spawn1'].pos.getRangeTo(tempSSources[i]));
                        }
                        var index = 0;
                        var value = distarray[0];
                        for (var i = 0; i < distarray.length; i++) {
                          if (distarray[i] < value) {
                            value = distarray[i];
                            index = i;
                          }
                        }
                        var closestSSource = tempSSources[index];
                        arrSources.push(closestSSource);
                        m++;
                        _.remove(tempSSources, function(obj){return obj == closestSSource})
                    }
                    
                    
                    var n = 0;
                    for(n = 0; (n<arrSources.length)&&(ccsc<1); n++){
                        var vacantflag = false;
                        var exitflag = false;
                        var x = arrSources[n].pos.x;
                        var y = arrSources[n].pos.y;
                        var arrayx = [x-1, x, x+1];
                        var arrayy = [y-1, y, y+1];
                        if(_.filter(room.lookForAtArea(LOOK_STRUCTURES,arrayy[0],arrayx[0],arrayy[2],arrayx[2],true), {structure: STRUCTURE_CONTAINER}).length == 0){
                            if(_.filter(room.lookForAtArea(LOOK_CONSTRUCTION_SITES,arrayy[0],arrayx[0],arrayy[2],arrayx[2],true), 'constructionSite').length == 0){
                                vacantflag = true;
                            }
                        }
                        if(vacantflag == true){
                            for(var i=0; (i<2)&&(!exitflag); i++){
                                for(var j=0; (j<2)&&(!exitflag); j++){
                                    if(room.createConstructionSite(arrayx[i], arrayy[j], STRUCTURE_CONTAINER) == 0){
                                        console.log("CONTAINER CS PLACED @ " + "x: " + arrayx[i] + "  y: " + arrayy[j]);
                                        ccsc++;
                                        exitflag = true;
                                    }
                                }
                            }
                        }
                    }
               }
        }
//--------------------------------------------------------------------------------------------------
        //pair completed containers with zombieharvesters
        containers = Game.rooms['sim'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        //var sourcecontainers = Game.rooms['sim'].f
        //zomebieworkers
        var zombieworkers = _.filter(Game.creeps, function(creep){return creep.memory.role == 'zombieworker'});
        if(zombieworkers.length < containers.length){
                if(Game.spawns['Spawn1'].canCreateCreep([WORK, WORK, MOVE], null) == 0){
                        Game.spawns['Spawn1'].CreateCreep([WORK, WORK, MOVE], null, {role: 'zombieworker'});
                }
        }
        //carriers
        var carriers = _.filter(Game.creeps, function(creep){return creep.memory.role == 'carrier'});
        if(carriers.length < zombieworkers.length*2){
                if(Game.spawns['Spawn1'].canCreateCreep([CARRY, CARRY, CARRY, CARRY, MOVE], null) == 0){
                        Game.spawns['Spawn1'].CreateCreep([CARRY, CARRY, CARRY, CARRY, MOVE], null, {role: 'carrier'});
                }
        }
/*
//---------------------------------------------------------------------------------------------------
        //roads and paths
        //get path from spawn to FINISHED containers, assume one spawn for now
        var sourcecontainers = Game.rooms['sim'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
        var path1 = Game.rooms['sim'].findPath(Game.spawns['Spawn1'].pos, sourcecontainers[0].pos, {ignoreCreeps: true}); 
        var roadsites = Game.rooms['sim'].find(FIND_CONSTRUCTION_SITES, {filter: {structureType: STRUCTURE_ROAD}});
        //var poscount = 0;
        if(roadsites.length < 1){
                if(Game.rooms['sim'].createConstructionSite(path1[poscount].x, path1[poscount].y, STRUCTURE_ROAD) == 0){
                        poscount++;
                        if(poscount > path1.length){ //condition for path1 finished
                                poscount = 0; //reset poscount, ready for next path
                                //need to recode for path1
                        }
                }
        }
        //find the path from spawn to container
        //if constructionsite for roads < 1,
        //[0] object from path => construction site ,<<await for completion
        //construction conplete, => set [1] object from path => construction site, << await completion 
        //...
        //
        
*/
}
//---------------------------------------------------------------------------------------------------

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
            if(creep.memory.role=='starter'){
                rolestarter.run(creep); //modify harvester behaviours in role.harvester module
            }
            if(creep.memory.role=='zombieworker'){
                rolezombieworker.run(creep);
            }
            if(creep.memory.role=='carrier'){
                rolecarrier.run(creep);
            }
        }
}
        
       
        
}//EXPORT LOOP END BRACKET



    

