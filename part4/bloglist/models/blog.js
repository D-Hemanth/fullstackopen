const mongoose = require('mongoose')

// Add a schema which tells Mongoose how the blog objects are to be stored in the database
// Also add way for validating the format of the data before it is stored in the database using validation functionality of mongoose i.e. title, author, url, likes 
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) 

// public interface of the module is defined by setting a value to the module.exports variable here we have set the value to be the Blog model
module.exports = mongoose.model('Blog', blogSchema)