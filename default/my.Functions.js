/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('myFunctions');
 * mod.thing == 'a thing'; // true
 */
//myfunctions
var myFunctions =  {
    testexport:     function testexport() {
                    console.log("NO ERRORS, EXPORT SUCCESSFUL.");
                },
    getkeys:    function getkeys(obj){
                    var keys = [];
                    for(var key in obj){
                        keys.push(key);
                    }
                    return keys;
                },
    creepcount: function creepcount() {
                    console.log('Harvesters: ' + _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length);
                    console.log('Builders: ' + _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length);
                    console.log('Upgraders: ' + _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length);
                },
    findclosest: function findclosest(creep, targetType){
                   var alltargets = creep.room.find(targetType); //shows all the sources in the room where the creep is
                   var selectedtarget = alltargets[0];
                   var x;
                   for(x in alltargets){
                     //compare the distance between the source and creep, set closestsource to that
                     var loopTargetDist = creep.pos.getRangeTo(alltargets[x]); //distance between creep and one of the source
                     var selectedTargetDist = creep.pos.getRangeTo(selectedtarget);
                     if(selectedTargetDist > loopTargetDist){
                        selectedtarget = alltargets[x];
                     }
                   }
                   return selectedtarget;
                }
}
module.exports = myFunctions;
