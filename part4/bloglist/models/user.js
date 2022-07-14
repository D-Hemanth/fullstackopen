const mongoose = require('mongoose')

// define the model for representing a user with username, name, passwordHash
const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    minLength: 3,
    required: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    //the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User