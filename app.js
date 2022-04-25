
const readline = require('readline-sync');
const logic = require('./logic')
const creatures = require('./creatures')
const log = require('./log.js')




log.intro()
const player = selectClass()
encounter(player, 3, creatures.basicCreatures)







// GAME FUNCTIONS
function encounter(player, number, enemyType){
  // takes player object, a number and an array of strings (enemy types)
  // creates an array of number creatures and passes them and the player object to enterCombat
  let enemies = creatures.generateRandomEnemies(number, enemyType)
  log.encounter(enemies)
  logic.enterCombat(player, enemies)
}

function selectClass(){
  // prompts user for a number, returns player object of corresponding class/type
  let choice = readline.question("(Enter a number to select your class)\n")
  let number = Number(choice)
  let validChoices = [1, 2, 3]
  if(!validChoices.includes(number)){
    log.invalidChoice()
    selectClass()
  }
  else{
    let index = choice - 1
    choice = creatures.playerClasses[index]
    log.classChoice(choice)
    let player = creatures.makeCreature(choice)
    return player
  }
}