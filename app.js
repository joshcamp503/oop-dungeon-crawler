const logic = require('./logic')
const creatures = require('./creatures')
const log = require('./log')






const player = creatures.makeCreature(creatures.playerClasses[logic.random(3)])
const enemies = creatures.generateRandomEnemies(3)
const enemy = enemies[0]

encounter(enemies)
player.attack(enemy)
// console.log(player, enemy)

// const currentEnemies = creatures.generateRandomEnemies(3)
// console.log(currentEnemies)

// GAME FUNCTIONS
function encounter(enemies){
  log.encounter(enemies)
  logic.enterCombat(player, enemies)
}

