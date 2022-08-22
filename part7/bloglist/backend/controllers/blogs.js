const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// Add information about the user who created a note is sent in the userId field of the request body
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

// get method to display all blogs in the blogslist of mongodb using find method of Blog model
blogsRouter.get('/', async (request, response) => {
  // refactor the tested routes to use async/await
  // Mongoose join like in relational database is done with the populate method
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// post method to add a blog to blogslist on mongodb
// middleware should take the token from the Authorization header and then userExtractor finds out the user and sets it to the user field of the request object
// and also to use the middleware userExtractor only in /api/blogs routes happens by chaining multiple middlewares as the parameter of function use like below
blogsRouter.post('/', userExtractor, async (request, response) => {
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

  // get user object with username, userid from user field of request object of userExtractor middleware
  const user = request.user
  // console.log('user', user)

  //  blog objects are created with the Blog model constructor function
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })
  // console.log(blog)

  try {
    // refactor the tested routes to use async/await
    // savedBlog is the newly created blog post. The data sent back in the response is the formatted version created with the toJSON method
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    // Mongoose join like in relational database is done with the populate method for the newly created blog to have user field populated again
    const blogsWithUserObject = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1 })
    response.json(blogsWithUserObject)
  }
  catch (exception) {
    next(exception)
  }
})

// delete method to remove a blog from a blogslist on mongodb using the id parameter
// middleware should take the token from the Authorization header and then userExtractor finds out the user and sets it to the user field of the request object
// and also to use the middleware userExtractor only in /api/blogs routes happens by chaining multiple middlewares as the parameter of function use like below
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  // get user object with username, userid from user field of request object of userExtractor middleware
  const user = request.user
  
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
blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body

  // get user object with username, userid from user field of request object of userExtractor middleware
  const user = request.user
  // console.log('user', user)

  const blog = {
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url
  }  
  
  try {
    // Mongoose join like in relational database is done with the populate method for the updated blog to have user field populated again
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    response.status(200).json(updatedBlog.toJSON())
  }
  catch (exception) {
    console.log(exception)
  }

})

// post method to update comments of a blog from a blogslist on mongodb using the id parameter & comment value
blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  console.log('request params id & request body comment', request.params.id, request.body.comment)

  // using mongoose findByIdAndUpdate method of Blog model to find the comments field and add to it ("$addToSet":...) & to return the updated blog from mongodb use ({new: true})
  // https://stackoverflow.com/questions/44860181/mongoose-findbyidandupdate-not-adding-item-in-array
	if(request.body.comment){
		const blog = await Blog.
			findByIdAndUpdate(id,{ "$addToSet": { comments: request.body.comment } },
				{ new : true }
			)
		response.json(blog)
	}
	else{
		response.status(400).send({ error: "Comment is missing" })
	}

})

module.exports = blogsRouter