const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { response } = require('express')
require('dotenv').config()
const Blog = require('./models/blog')

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

// Use app.use to load the different middlewares into the express application
// cors middleware to use and allow for requests from all origins
app.use(cors())
// In order to access the data easily, we need the help of the express json-parser
// Without the json-parser i.e. json(), the body property  of request object sent through post request would be undefined.
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})