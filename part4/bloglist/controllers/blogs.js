const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// get method to display all blogs in the blogslist of mongodb using find method of Blog model
blogsRouter.get('/api/blogs', async (request, response) => {
  // refactor the tested routes to use async/await
  const blogs = await Blog.find({})
  response.json(blogs)
})

// post method to add a blog to blogslist on mongodb
blogsRouter.post('/api/blogs', async (request, response) => {
  // the body property  of request object contains data sent through post request
  const body = request.body
  // console.log(body)

  //  verifies that if the likes property is missing from the request, it will default to the value 0
  if(!body.likes) {
    body.likes = 0
  }

  // verifies that if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request
  if(!body.title || !body.url) {
    return response.status(400).json('Bad Request')
  }

  //  blog objects are created with the Blog model constructor function
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  // console.log(blog)

  // refactor the tested routes to use async/await
  // savedBlog is the newly created blog post. The data sent back in the response is the formatted version created with the toJSON method
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// delete method to remove a blog from a blogslist on mongodb using the id parameter
blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// update method to update a blog from a blogslist on mongodb using the id parameter
blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter