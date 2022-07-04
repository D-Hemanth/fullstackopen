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

module.exports = blogsRouter