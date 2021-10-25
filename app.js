const logic = require('./logic')
const creatures = require('./creatures')
const log = require('./log')


// const currentEnemies = creatures.generateRandomEnemies(3)
// console.log(currentEnemies)


const attacker = creatures.makeCreature('Orc')
const defender = creatures.makeCreature('Bugbear')
attacker.attack(defender)
console.log(attacker, defender)

