const log = require('./log')



const logic = {

  rollDice(d) {
    // takes a number, returns a random number between 1 and d
    // simulates rolling a d-sided dice, 
    return Math.floor(Math.random() * d) + 1
  },

  rollSet(array, d = 20){
    // takes array of objects and a number (d: default is 20), returns an array
    // rolls array.length unique numbers between 1 and d
    let uniqueRolls = new Set
    while (uniqueRolls.size < array.length){
      let roll = logic.rollDice(d)
      uniqueRolls.add(roll)
    }
    return [...uniqueRolls]
  },

  random(number){
    // returns a random number between 0 and number 
      return Math.floor(Math.random() * number)
  },
  
  rollForHit(attacker, defender){
    // takes in 2 objects, returns bool 
    // rolls a 20-sided dice, compares attacker stats to defender stats to see if attack hits
    attacker.roll = logic.rollDice(20)
    let attackRating = attacker.stats.ACC + attacker.roll
    log.stat('ACC', attacker)
    log.stat('DEF', defender)
    log.roll(attacker)
    if(attackRating <= defender.stats.DEF){
      log.miss()
      return false
    }
    log.hit()
    return true
  },

  enterCombat(player, enemies){
    // takes a player object and an array of objects, combines them into a new array, executes assignInit and takeTurns
    let combatParty = enemies.slice()
    combatParty.push(player)
    logic.assignInit(combatParty)
    logic.takeTurns(player, combatParty)
  },
  
  assignInit(party){
    // takes an array of objects, returns an array of objects
    // creates set of unique numbers, assigns to objects in array, then sorts the array in descending order
    let rolls = logic.rollSet(party)
    party.forEach((member, index) => {
      member.initiative = rolls[index]
    })
    party.sort( (a,b) => {
      return b.initiative - a.initiative
    }) 
  },

  takeTurns(player, party){
    // takes an player object and an array, executes creature action and player.selectAction
    // loops thru array, checks win/loss conditions, allows player and creatures to perform combat actions
    party.forEach(creature => {
      if(player.dead || party.length < 2) return
      if(creature != player) return creature.attack(player)
      player.selectAction('attack', party[0])
    })
  },

  kill(creature){
    // takes an object, returns bool
    creature.dead = true
    log.death(creature)
  },

  removeFromCombat(creature, party){
    // takes creature object and party array, removes creature object from array and returns array
    if(creature.dead){
      creature = party.indexOf(creature)
      party.splice(creature, 1)
    }
  }

}

module.exports = logic