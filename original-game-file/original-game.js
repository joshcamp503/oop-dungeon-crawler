
function roll(d){
  return Math.floor(Math.random() * d) + 1
}

const makeCreature = (type, HP, AP, DEF, ACC, dead, turn) => {
  return {
    type,
    HP,
    AP,
    DEF,
    ACC,
    dead,
    turn,
    // attack method takes an object as a parameter
    attack(target){
      if(target.dead === false){
        console.log(`The ${this.type} attacks the ${target.type}... `)
        let attackRoll = roll(20)
        let damageRoll = roll(this.AP)
        let attackMessage = `The ${this.type} attacks for ${attackRoll + this.ACC} and the ${target.type}\'s DEF is ${target.DEF}`
        if(attackRoll + this.ACC >= target.DEF){
          target.HP -= damageRoll
          console.log(attackMessage)
          console.log(`HIT!!!`)
          console.log(`The ${this.type} deals ${damageRoll} damage.`)
          // console.log(`${target.type}\'s HP is now ${target.HP}\n`)
          if (target.HP < 1){
            target.dead = true
            console.log(`${target.type} has been slain\n`)
          }
        } else {
          console.log(attackMessage)
          console.log("MISS!")
        }
      } else {
        console.log(`${target.type} is already dead, please choose another target.\n`)
      }
    },
    defend(){
      console.log(`${this.type} defends... DEF + 5`)
      this.DEF += 5
      console.log(`DEF is now ${this.DEF}\n`)
    },
    heal(){
      console.log(`${this.type} drinks a potion... `)
      let healRoll = roll(6)
      if (this.HP + healRoll >= 40){
        this.HP = 40
      } else {
        this.HP += healRoll
      }
      console.log(`HP is now ${this.HP}`)
    }
  }
}

function makeFighter(){
  return makeCreature('fighter', 40, 10, 14, 4, false, 0)
}

function makeWizard(){
  return makeCreature('wizard', 20, 16, 10, 6, false, 0)
}

function makeRogue(){
  return makeCreature('rogue', 30, 12, 12, 8, false, 0)
}

function makeSkeleton(){
  return makeCreature('skeleton', 20, 6, 10, 3, false, 0)
}

function makeGoblin(){
  return makeCreature('goblin', 14, 4, 14, 5, false, 0)
}

function makeKobold(){
  return makeCreature('kobold', 18, 6, 12, 4, false, 0)
}

function makeWolf(){
  return makeCreature('wolf', 15, 8, 10, 3, false, 0)
}

function makeOrc(){
  return makeCreature('orc', 35, 10, 14, 6, false, 0)
}

function makeBugbear(){
  return makeCreature('bugbear', 80, 12, 15, 6, false)
}


function init(){
  player = prompt("Welcome to Dungeon Adventure!\nAre you a Fighter, Wizard, or Rogue?\n")
  if(player.toLowerCase() === 'fighter'){
    player = makeFighter()
    console.log("You have chosen to be a mighty Fighter!\n")
  } else if(player.toLowerCase() === 'wizard'){
    player = makeWizard()
    console.log("You have chosen to be a powerful Wizard!\n")
  } else if(player.toLowerCase() === 'rogue'){
    player = makeRogue()
    console.log("You have chosen to be a cunning Rogue!\n")
  } else {
    console.log("Let's try that again. Please make a valid selection...\n")
    init()
  }
  console.log("You venture towards the Forbidden Dungeon to vanquish the evil that resides within and claim your eternal glory...\n")

  console.log("You enter the dungeon and the foul smell of rotting flesh and death meets your nose. \n\nYou walk toward the first door and hear a noise inside. \n\nYou enter, prepared for combat, and encounter a group wretched fiends.\n\n")  
}

const basicCreatures = [makeSkeleton, makeGoblin, makeKobold, makeWolf, makeOrc]

function combat(){

  let combatArray = []

  function checkOrc(creature) {
    return creature.type === "orc"
  }

  function generateEnemies(n){
    for(let i = 0; i < n; i++){
      let rand = Math.floor(Math.random() * 5)
      if(rand === 4 && combatArray.some(checkOrc)) {
        rand = Math.floor(Math.random() * 4)
        combatArray.push(basicCreatures[rand].call())
      } else {
        combatArray.push(basicCreatures[rand].call())
      }
    }
  }

  generateEnemies(3)
  combatArray.push(player)

  function assignInit(arr) {

    let numbers = new Set
    while (numbers.size < arr.length) numbers.add(roll(20))
    let result = [...numbers]
    for(let i = 0; i < arr.length; i++){
      arr[i].turn = result[i]
    }
  }
  assignInit(combatArray)

  combatArray.sort( (a,b) => {
    return b.turn - a.turn
  })

// combat loop

  // console.log(combatArray)

  function displayHP(creature){
    console.log(`${creature.type}\'s HP is ${creature.HP}...\n`)
  }

  let enemies = [];
  function displayEnemies(){
    let num = 1;
    enemies = combatArray.filter(creature => creature != player).map(creature => {
        creature.target = num
        num++
        return creature
      })
    return enemies
  }
  
displayEnemies()

// have player choose
  function chooseAction(){
    let choice = prompt(`${player.type}, do you want to attack, defend, or heal?`).toLowerCase();
    switch(choice){
      case 'attack':
        enemies.forEach(enemy => {
          let message = `Target ${enemy.target}: ${enemy.type}`
          console.log(message)
        })
        let target = parseInt(prompt("Please select a target (number) from the list of enemies"))
        console.log(``)
        if (typeof target === 'number' && target <= enemies.length){
          target = enemies.filter(enemy => enemy.target === target)
          player.attack(target[0])
        } else {
          console.log("That is not a valid choice")
          chooseAction()
        }
        break;
      case 'defend':
        player.defend()
        break;
      case 'heal':
        player.heal()
        break;
      default:
        console.log("That is not a valid choice")
        chooseAction()
    }
  }

// loop conditions:
  while(!player.dead && combatArray.length > 1){
    for(let i = 0; i < combatArray.length; i++){
      let creature = combatArray[i]
      if(player.dead){
        console.log("YOU HAVE DIED")
        break
      } else if(creature === player){
        // reset defense stat
        chooseAction()
      } else {
        creature.attack(player)
      }
      displayHP(player)
    }
  }
// loop through combatArray & check whats at the current index
// if !player, (creature at current index).attack(player), else..
// prompt player to choose action
// at the end of each iteration of the loop check for dead, if true then remove from array, display player HP


}

let player = makeFighter()

// init()
combat()