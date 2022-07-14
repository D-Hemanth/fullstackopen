const mongoose = require('mongoose')

// define the model for representing a user with username, name, passwordHash
// define specific validation rules like Type, minLength, unique,etc for each field in the schema 
// Both username and password must be given. Both username and password must be at least 3 characters long. The username must be unique 
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