const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

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

// Middleware functions are called in the order that they're taken into use with the express server object's use hence the json parser is above this
app.use(middleware.requestLogger)

// The blogsRouter we defined in ./controller/blogs is used if the URL of the request starts with '/api/blogs' 
app.use('/api/blogs', blogsRouter)
// The loginRouter we defined in ./controller/login is used if the URL of the request starts with '/api/login' 
app.use('/api/login', loginRouter)
// The usersRouter we defined in ./controller/users is used if the URL of the request starts with '/api/users'
app.use('/api/users', usersRouter)

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint)
// this has to be the last loaded middleware
app.use(middleware.errorHandler)

module.exports = app