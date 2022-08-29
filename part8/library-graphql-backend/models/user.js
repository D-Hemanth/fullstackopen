const mongoose = require('mongoose')

// It would be straightforward to save individual passwords for all users following the principles from part 4 (https://fullstackopen.com/en/part4/user_administration),
// but because our focus is on GraphQL, we will leave out all that extra hassle this time
const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('User', schema)
