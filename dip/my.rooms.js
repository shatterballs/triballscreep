var myrooms = {
  run: function(room) {
  
    var allSources = room.find(FIND_SOURCES); //returns an array with 3 source objects
    //filter out the source that is closest to the keeperlair
    var keeperLairs = room.find(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_KEEPER_LAIR}}); //returns an array with 1 keeper lair object
    //compare distance between keeperlair and sources
    for var(KEEPERLAIRNAME in keeperLairs){
      var ignoredsource = keeperLair.pos.findClosestByRange(FIND_SOURCES); //returns the source object that is closest to the lair object
      _.filter(allSources, ignoredsource);
    }
  }
