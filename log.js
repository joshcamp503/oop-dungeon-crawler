



const log = {

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
  }

}

module.exports = log