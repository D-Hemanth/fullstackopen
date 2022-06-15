const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { response } = require('express')
require('dotenv').config()
const blogsRouter = require('./controllers/blogs')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

// Use app.use to load the different middlewares into the express application
// cors middleware to use and allow for requests from all origins
app.use(cors())
// In order to access the data easily, we need the help of the express json-parser
// Without the json-parser i.e. json(), the body property  of request object sent through post request would be undefined.
app.use(express.json())

// The blogsRouter we defined in ./controller/blogs is used if the URL of the request starts with '' & later /api/blogs are added to the request from blogs in controllers 
app.use('', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})