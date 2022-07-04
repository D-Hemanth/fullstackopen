const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')

const api = supertest(app)

// The database is cleared out at the beginning, Doing this we ensure that the database is in the same state before every test is run
beforeEach(async () => {
  await Blog.deleteMany({})

  // Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as a parameter is resolved
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('The unique identifier property of the blog posts is named id instead of the default _id', async () => {
  const blogs = await Blog.find({})
  // console.log(blogs[0].id)
  // Use .toBeDefined to check that a variable is not undefined
  expect(blogs[0].id).toBeDefined()
})

test('Add a new valid blog post', async () => {
  const newBlog =   {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // uses blogsAtEnd function for checking the blogs stored in the database
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  // uses blogsAtEnd function for checking the blogs content stored in the database matches the input contents
  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain('Type wars')
})

test('If the likes property is missing from the request, then it will default to 0', async () => {
  const newBlog =   {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // uses blogsAtEnd function for checking the blogs stored in the database
  const blogsAtEnd = await helper.blogsInDb()
  const newAddedBlog = blogsAtEnd.find(blog => blog.title === 'TDD harms architecture')
  // console.log(newAddedBlog)
  expect(newAddedBlog.likes).toBe(0)
})  

test('If the title & url are missing from the request data, respond with status code 400 Bad Request', async () => {
  const newBlog =   {
    author: "Robert C. Martin",
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  // uses blogsAtEnd function for checking the blogs stored in the database to have same length if title or url are missing
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})