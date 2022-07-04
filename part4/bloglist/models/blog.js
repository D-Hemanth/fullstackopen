const mongoose = require('mongoose')

// Add a schema which tells Mongoose how the blog objects are to be stored in the database
// Also add way for validating the format of the data before it is stored in the database using validation functionality of mongoose i.e. title, author, url, likes 
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) 

// to remove unique id field _id & mongo versioning field __v from the frontend output
// One way to format the objects returned by Mongoose is to modify the toJSON method of the schema
// for get route When the response is sent in the JSON format, the toJSON method of each object in the array is called automatically by the JSON.stringify method
// toJSON is responsible to define what data will be serialized(taken as input) to convert to json format
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// public interface of the module is defined by setting a value to the module.exports variable here we have set the value to be the Blog model
module.exports = mongoose.model('Blog', blogSchema)