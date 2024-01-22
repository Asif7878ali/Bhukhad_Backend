const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
      type : String,
      require : true
    },
    image :  {
      type : String,
      require : true
    },
    email :  {
      type : String,
      require : true
    },
    password :  {
      type : String,
      require : true
    }
  })  

const userBhukkad = new mongoose.model('userbhukkads', userSchema)

module.exports = userBhukkad