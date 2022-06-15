const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { response } = require('express')
require('dotenv').config()

// Add a schema which tells Mongoose how the blog objects are to be stored in the database
// Also add way for validating the format of the data before it is stored in the database using validation functionality of mongoose i.e. title, author, url, likes 
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) 

