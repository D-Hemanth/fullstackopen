const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
// adding tests fot user administration and login
const bcrypt = require('bcrypt')
const User = require('../models/user')

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


describe('Addition of new blogs', () => {
  // declare headers globally so we can use them to set headers in all tests inside a describe block
  let headers

  // beforeEach set the headers to contain the authorization token needed before performing the tests
  beforeEach(async () => {
    const newUser = {
      username: 'root2',
      name: 'root2',
      password: 'password'
    }

  // Create a new user in the mongodb database
  await api
    .post('/api/users')
    .send(newUser)

  // login as the newly created user to generate a token for the user along with the username, name, etc
  const result = await api
    .post('/api/login')
    .send(newUser)

  // console.log('result', result)
  
  headers = { 
    'Authorization': `bearer ${result.body.token}` 
    }
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
      .set(headers)
      .send(newBlog)
      .expect(200)
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
      .set(headers)
      .send(newBlog)
      .expect(200)
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
      .set(headers)
      .send(newBlog)
      .expect(400)
    
    // uses blogsAtEnd function for checking the blogs stored in the database to have same length if title or url are missing
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Deletion of a blogpost', () => {
  // declare headers globally so we can use them to set headers in all tests inside a describe block
  let headers

  // beforeEach set the headers to contain the authorization token needed before performing the tests
  beforeEach(async () => {
    const newUser = {
      username: 'root2',
      name: 'root2',
      password: 'password'
    }

  // Create a new user in the mongodb database
  await api
    .post('/api/users')
    .send(newUser)

  // login as the newly created user to generate a token for the user along with the username, name, etc
  const result = await api
    .post('/api/login')
    .send(newUser)

  // console.log('result', result)
  
  headers = { 
    'Authorization': `bearer ${result.body.token}` 
    }
  })

  // let's write tests for fetching and removing an individual blog
  test('succeeds with status code 204 if id is valid', async () => {
    // add a new blog to mongodb so that the user who added it, here root2 can also delete it
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)

    // In the initialization phase they fetch a blogs from the database
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart.find(blog => blog.title === newBlog.title)

    // the tests call the actual operation being tested which is deletion here
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

test('Updating the likes of a blogpost using a specific id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const likes = blogsAtEnd.map(blog => blog.likes)
  expect(likes).not.toBe(blogToUpdate.likes)
})


// User Creation, administration related testing
describe('When there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    // Find out which users are there in the database before performing the tests
    const users = await User.find({})
    // console.log(users)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api 
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation of newuser fails with proper statuscode & message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation of newuser fails with proper statuscode & message if password is not 3 character long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Hemanth',
      name: 'Hemanth D',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password validation failed: Password is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

// test to ensure adding a blog fails with the proper status code 401 Unauthorized if a token is not provided
describe('Ensure adding a blog fails', () => {
  test('when a token is not provided', async () => {
    // add a new blog to mongodb without passing a token of the user who is creating it
    const newBlog = {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    }

    // no set(headers) containing the token for authorization is provided
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})