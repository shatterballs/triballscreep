var actionAnnounce = {
    run: function(creep){
        var phrase = ["#CREEPS","LIVES","MATTER"]
        creep.say(phrase[Game.time % phrase.length])
    }
}

module.exports = actionAnnounce;