/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = {
   //this is a function within the rolHarvester object. Can be called by roleHarvester.run(creep)
  run: function(creep){
    //might have to use getKeys() in myFunction to see what's in the creep(?)
    //1. go to energy source and extract if carrying<carryingcap
    //2. go back to spawn/ other structures to dump energy
    if(_.sum(creep.carry) < creep.carryCapacity){//check if maxed/not
      //find nearest source and set to target
      var sources = creep.room.find(FIND_SOURCES);
      for(var closestSource in sources){
        
      }
      //go to nearest source
      
    }
  }
}



module.exports = {

};
