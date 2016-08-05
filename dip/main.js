var roleMiner = require('role.miner')
var roleMover = require('role.mover')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var actionPlanRoad = require('action.planRoad')
var actionAnnounce = require('action.announce')

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    // setting up the creep configs
    
    
    var miners =    _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var movers =    _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders =  _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    var energyCap = Game.spawns.Spawn1.room.energyCapacityAvailable
    if (energyCap >= 300) {
        var minerConfig  =  [MOVE,WORK,WORK]
        var moverConfig =   [MOVE,MOVE,CARRY,CARRY,WORK]
        var builderConfig = [MOVE,CARRY,WORK]
        var upgraderConfig =[MOVE,CARRY,WORK]
    }
    if (energyCap >= 350) {
        moverConfig =   [MOVE,MOVE,CARRY,CARRY,CARRY,WORK]
        minerConfig =   [MOVE,WORK,WORK,WORK]
    }
    if (energyCap >= 400) {
        builderConfig = [MOVE,MOVE,CARRY,CARRY,WORK,WORK]
        upgraderConfig =[MOVE,MOVE,CARRY,CARRY,WORK,WORK]
    }
    if (energyCap >= 450) {
        moverConfig =   [MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,WORK]
        minerConfig =   [MOVE,WORK,WORK,WORK,WORK]
    }
    if (energyCap >= 500) {
        moverConfig =   [MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,WORK]
    }
    if (energyCap >= 550) {
        minerConfig =   [MOVE,WORK,WORK,WORK,WORK,WORK]
    }
    
    
    // create the initial wave of creeps
    
    var minerMinPop =       1
    var moverMinPop   =     1
    var builderMinPop =     1
    var upgraderMinPop  =   1
    
    if (movers.length < moverMinPop) {
        var newName = Game.spawns['Spawn1'].createCreep(moverConfig, undefined, {role: 'mover', working: true});
        if((newName != -6) & (newName != -4)) { console.log('Spawning new mover: ' + newName) }
    } else if ( miners.length < minerMinPop) {
        var newName = Game.spawns['Spawn1'].createCreep(minerConfig, undefined, {role: 'miner', working: true});
        if((newName != -6) & (newName != -4)) { console.log('Spawning new miner: ' + newName) }
    } else if (builders.length < builderMinPop) {
        var newName = Game.spawns['Spawn1'].createCreep(builderConfig, undefined, {role: 'builder', working: true});
        if((newName != -6) & (newName != -4)) { console.log('Spawning new builder: ' + newName) }
    } else if (upgraders.length < upgraderMinPop) {
        var newName = Game.spawns['Spawn1'].createCreep(upgraderConfig, undefined, {role: 'upgrader', working: true});
        if((newName != -6) & (newName != -4)) { console.log('Spawning new upgrader: ' + newName) }
    }
    
    // WIP: if basic setup of creeps is done, check if there are emergency spawnings queued
    
    
    
    
    // if spawn had no spawnings queuued, then its resources is open to share
    
    Game.spawns.Spawn1.memory.openToShare = false
    if (miners.length >= minerMinPop & movers.length >= moverMinPop & builders.length >= builderMinPop & upgraders.length >= upgraderMinPop) {
        Game.spawns.Spawn1.memory.openToShare = true
    }
    
    
    
    // END OF SPAWNING RELATED //
    
    actionPlanRoad.run(Game.spawns.Spawn1)
    
    PathFinder.use(true);
    
    /* (waiting to be removed, as queue time calculating is no longer necessary)
    
    var allSources = Game.spawns.Spawn1.room.find(FIND_SOURCES)
    
    var sourceQTime = []
    for (i in allSources) {
        sourceQTime.push(0)
    }
    Game.spawns.Spawn1.room.memory.sourceQTime = sourceQTime
    
    var creepMiningSource = []
    for (i in allSources) {
        creepMiningSource.push(1)
    }
    Game.spawns.Spawn1.room.memory.creepMiningSource = creepMiningSource
    
    var sourceEQTime = []
    for (i in allSources) {
        sourceEQTime.push(0)
    }
    Game.spawns.Spawn1.room.memory.sourceEQTime = sourceEQTime

    */

    var tower = Game.getObjectById('173a491557eedbc8f1318fd9');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    // assign room.memory for the sources

    if(Game.spawns.Spawn1.room.memory.sources == undefined) {
        Game.spawns.Spawn1.room.memory.sources = new Object();
    }

    var sources = Game.spawns.Spawn1.room.memory.sources

    if(sources.main == undefined) {
        var allSources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
        
        Game.spawns.Spawn1.room.memory.sources.main = new Object()
        
        for (i in allSources) {
            var x = allSources[i].pos.x
            var y = allSources[i].pos.y
            var posId = x + y * 50
            Game.spawns.Spawn1.room.memory.sources.main[posId] = new Object();
        }
    }
    
    if(sources.access == undefined) {
        for (i in sources.main) {
            var x = i % 50
            var y = ( i - x ) / 50
            
            for (var j = 0; j < 9; j++) {
                if (j != 4) {
                    if ( j < 3) {
                        var thisX = x - 1 + j
                        var thisY = y - 1
                        console.log(thisX + " , " + thisY)
                    } else if ( j < 6) {
                        var thisX = x - 1 + ( j - 3 )
                        var thisY = y
                        console.log(thisX + " , " + thisY)
                    } else {
                        var thisX = x - 1 + ( j - 6 )
                        var thisY = y + 1
                        console.log(thisX + " , " + thisY)
                    }
                }
            }
        }
    }

    // giving each creeps assignment related to their role 
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
            actionAnnounce.run(creep);
        }
        if(creep.memory.role == 'mover') {
            roleMover.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    } 
    
    // console.log("Divided " + sourceEQTime)
}