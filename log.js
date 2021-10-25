



const log = {

  stat(stat, target){
    console.log(`${target.type}'s ${stat} is ${target.stats[stat]}`)
  }, 

  roll(target){
    console.log(`${target.type} rolls ${target.roll}`)
  }, 

  attack(attacker, target){
    console.log(`${attacker.type} has chosen to attack ${target.type}`)    
  },
  
  hit(){
    console.log(`It's a hit!`)
  },

  miss(){
    console.log(`It's a miss...`)
  }

}

module.exports = log