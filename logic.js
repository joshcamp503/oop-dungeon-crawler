const log = require('./log')



const logic = {

  rollDice(d) {
    return Math.floor(Math.random() * d) + 1
  },

  rollSet(array){
    let uniqueRolls = new Set
    while (uniqueRolls.size < array.length){
      let roll = logic.rollDice(20)
      uniqueRolls.add(roll)
    }
    return [...uniqueRolls]
  },

  random(number){
      return Math.floor(Math.random() * number)
  },
  
  rollForHit(attacker, defender){
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
  
  assignInit(party){
    let rolls = logic.rollSet(party)
    party.forEach((member, index) => {
      member.initiative = rolls[index]
    })
    party.sort( (a,b) => {
      return b.initiative - a.initiative
    }) 
  },

  enterCombat(player, enemies){
    let combatParty = enemies.slice()
    combatParty.push(player)
    logic.assignInit(combatParty)
    logic.fight(player, combatParty)
  },

  fight(player, party){
    logic.takeTurns(player, party)
  },

  takeTurns(player, party){
    party.forEach(creature => {
      if(player.dead || party.length < 2) return
      if(creature != player) return creature.attack(player)
      player.selectAction('attack', party[0])
    })
  },

  kill(creature){
    creature.dead = true
    log.death(creature)
  },

  removeFromCombat(creature, party){
    if(creature.dead){
      creature = party.indexOf(creature)
      party.splice(creature, 1)
    }
  }

}



module.exports = logic