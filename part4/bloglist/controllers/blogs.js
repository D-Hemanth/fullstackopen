const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// Add information about the user who created a note is sent in the userId field of the request body
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// get method to display all blogs in the blogslist of mongodb using find method of Blog model
blogsRouter.get('/', async (request, response) => {
  // refactor the tested routes to use async/await
  // Mongoose join like in relational database is done with the populate method
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// The helper function getTokenFrom isolates the token from the authorization header, get token for authorization in every request made to the server
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    // Authorization header will have the value: Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW then substring(7) returns only the token
    return authorization.substring(7)
  }
  return null
}

// post method to add a blog to blogslist on mongodb
blogsRouter.post('/', async (request, response) => {
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

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid '})
  }

  // info about user who created a note is sent in the userId field of the request body
  const user = await User.findById(decodedToken.id)

  //  blog objects are created with the Blog model constructor function
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })
  // console.log(blog)

  // refactor the tested routes to use async/await
  // savedBlog is the newly created blog post. The data sent back in the response is the formatted version created with the toJSON method
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

// delete method to remove a blog from a blogslist on mongodb using the id parameter
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

// update method to update a blog from a blogslist on mongodb using the id parameter
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter