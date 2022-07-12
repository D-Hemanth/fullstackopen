const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')

// define a separate router for dealing with users 
const usersRouter = require('./controllers/users')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

// Use app.use to load the different middlewares into the express application
// cors middleware to use and allow for requests from all origins
app.use(cors())
// In order to access the data easily, we need the help of the express json-parser
// Without the json-parser i.e. json(), the body property  of request object sent through post request would be undefined.
app.use(express.json())

// The blogsRouter we defined in ./controller/blogs is used if the URL of the request starts with '' & later /api/blogs are added to the request from blogs in controllers 
app.use('', blogsRouter)

// The usersRouter we defined in ./controller/users is used if the URL of the request starts with '/api/users'
app.use('/api/users', usersRouter)

module.exports = app