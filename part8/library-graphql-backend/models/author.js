const mongoose = require('mongoose')

// Add a schema which tells Mongoose how the note objects are to be stored in the database
// Also add way for validating the format of the data before it is stored in the database using validation functionality of mongoose i.e. required
// is actually redundant as we already ensure that the fields exist with GraphQL. However, it is good to also keep validation in the database
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

// public interface of the module is defined by setting a value to the module.exports variable here we have set the value to be the Person model
// the mongodb will store the book values inside of a collection named after the lowercase plural of the Model schema name here "authors"
module.exports = mongoose.model('Author', schema)