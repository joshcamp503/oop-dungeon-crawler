const log = require('./log')
const logic = require('./logic')



const creatures = {

  playerClasses: ['Fighter', 'Wizard', 'Rogue'],
  basicCreatures: ['Skeleton', 'Goblin', 'Orc'],
  
  makeCreature(type){
    // takes a string, returns an object
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

  generateRandomEnemies(number, enemyType){
    // takes a number, returns an array of objects
    // loops number times, creating a random creature each time and pushing it to the enemies array
    let enemies = [];
    for(let i = 0; i < number; i++){
      let random = logic.rollDice(number) - 1
      random = enemyType[random]
      let enemy = creatures.makeCreature(random)
      enemies.push(enemy)
    }
    return enemies
  },

  selectAction(action, target){
    // takes an string (action) and an object (target) and executes an action function on target object
    if(action != 'attack') return
    console.log(`Player chooses to attack`)
    this.attack(target)
  },

  attack(target){
    // takes an object and upon condition executes changeHP function on target object
    log.attack(this, target)
    if(!logic.rollForHit(this, target)) return
    creatures.changeHP(target, -this.stats.AP)
    log.damage(this, target)
  },

  changeHP(target, amount){
    // takes a target object and a number amount and changes target's HP stat value accordingly
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
    },
    Demon: {
      HP: 500,
      AP: 500,
      DEF: 500,
      ACC: 666
    }

  }

}

module.exports = creatures