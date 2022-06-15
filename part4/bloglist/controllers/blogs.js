const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get method to display all blogs in the blogslist of mongodb using find method of Blog model
blogsRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// post method to add a blog to blogslist on mongodb
blogsRouter.post('/api/blogs', (request, response) => {
  // the body property  of request object contains data sent through post request
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter