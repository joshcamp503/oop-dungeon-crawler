const log = require('./log')
const logic = require('./logic')



const creatures = {

  playerClasses: ['Fighter', 'Wizard', 'Rogue'],
  basicEnemies: ['Skeleton', 'Goblin', 'Orc'],
  
  makeCreature(type){
    return {
      type,
      stats: creatures.stats[type],
      dead: false,
      roll: null,
      initiative: null,
      selectAction: creatures.selectAction,
      attack: creatures.attack
    }
  },

  generateRandomEnemies(amount){
    let enemies = [];
    for(let i = 0; i < amount; i++){
      let random = logic.rollDice(amount) - 1
      random = creatures.basicEnemies[random]
      let enemy = creatures.makeCreature(random)
      enemies.push(enemy)
    }
    return enemies
  },

  selectAction(action, target){
    if(action != 'attack') return
    console.log(`Player chooses to attack`)
    this.attack(target)
  },

  attack(target){
    log.attack(this, target)
    if(!logic.rollForHit(this, target)) return
    creatures.changeHP(target, -this.stats.AP)
    log.damage(this, target)
  },

  changeHP(target, amount){
    target.stats.HP += amount;
    if(target.stats.HP <= 0) logic.kill(target)
  },

  

  stats: {

    Fighter: {
      HP: 40,
      AP: 10,
      DEF: 14,
      ACC: 4
    },
    Wizard: {
      HP: 20,
      AP: 16,
      DEF: 10,
      ACC: 6
    },
    Rogue: {
      HP: 30,
      AP: 12,
      DEF: 12,
      ACC: 8
    },
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

  }

}

module.exports = creatures