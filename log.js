



const log = {
  
  intro(){
    let message = `Welcome to the Dungeon!\n\nTell me hero, what is your specialty?\n\n1 - Fighter\n2 - Wizard\n3 - Rogue\n`
    console.log(message)
  },

  stat(stat, target){
    console.log(`${target.type}'s ${stat} is ${target.stats[stat]}`)
  }, 

  roll(target){
    console.log(`${target.type} rolls ${target.roll}`)
  }, 

  attack(attacker, target){
    console.log(`${attacker.type} attacks ${target.type}`)    
  },
  
  hit(){
    console.log(`It's a hit!\n`)
  },

  miss(){
    console.log(`It's a miss...\n`)
  },

  damage(attacker, target){
    console.log(`${attacker.type} deals ${attacker.stats.AP} damage to ${target.type}\n`)    
  },

  death(creature){
    console.log(`${creature.type} has died.\n`)
  },

  encounter(enemies){
    console.log("You encounter some enemies!\n")
    enemies.forEach(enemy => {
      console.log(enemy.type)
    })
    console.log(``)
  },

  classChoice(choice){
    console.log(`\nA ${choice} you say? Hmmm... Well I hope you're prepared to use your skills in battle.  You'll need to be at your best to survive this place.\n`)
  },

  invalidChoice(){
    console.log(`You have made an invalid choice. Please try again...\n`)
  }

}

module.exports = log