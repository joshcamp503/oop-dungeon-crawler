const log = require('./log')
const logic = require('./logic')



const creatures = {

  basicTypes: ['Skeleton', 'Goblin', 'Orc'],

  stats: {

    Skeleton: {
      HP: 20,
      AP: 6,
      DEF: 10,
      ACC: 3
    },
    Goblin: {
      HP: 14,
      AP: 4,
      DEF: 14,
      ACC: 5
    },
    Orc: {
      HP: 35,
      AP: 10,
      DEF: 14,
      ACC: 6
    },
    Bugbear: {
      HP: 80,
      AP: 12,
      DEF: 15,
      ACC: 6
    },
    Dragon: {
      HP: 280,
      AP: 18,
      DEF: 18,
      ACC: 6
    }

  },
  
  makeCreature(type){
    return {
      type,
      stats: creatures.stats[type],
      dead: false,
      roll: null,
      turn: null,
      attack: creatures.attack
    }
  },

  generateRandomEnemies(amount){
    let enemies = [];
    for(let i = 0; i < amount; i++){
      let random = logic.dice.roll(amount) - 1
      random = creatures.basicTypes[random]
      let enemy = creatures.makeCreature(random)
      enemies.push(enemy)
    }
    return enemies
  },

  attack(target){
    log.attack(this, target)
    if(!creatures.rollForHit(this, target)) return
    creatures.changeHP(target, -this.stats.AP)
    log.stat('HP', target)
  },
  
  rollForHit(attacker, defender){
    attacker.roll = logic.dice.roll(20)
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

  changeHP(target, amount){
    target.stats.HP += amount;
  }

}

module.exports = creatures