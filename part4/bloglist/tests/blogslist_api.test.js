const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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

afterAll(() => {
  mongoose.connection.close()
})