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

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
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
  // middleware should take the token from the Authorization header and place it to the token field of the request object
  //The object decoded from the token contains the username and id fields
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid '})
  }

  // find the user object with username, userid of the user who sent the delete request from the decodedtoken.id
  const user = await User.findById(decodedToken.id)
  // blogid of the blogpost which the user has sent in the delete request
  const blogToDelete = await Blog.findById(request.params.id)

  if(blogToDelete.user._id.toString() === user._id.toString()) {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'unauthorized to delete the blog as your not the creator of that blog' })
  }
  
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