const log = require('./log')



const logic = {

  dice: {
    roll(d) {
      return Math.floor(Math.random() * d) + 1
    }    
  },

  random(number){
      return Math.floor(Math.random() * number)
  }

}



module.exports = logic