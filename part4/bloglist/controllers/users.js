const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// display all users in the database using get method of usersRouter
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

// Add users into the database using post method of usersRouter
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // When you are hashing your data the module will go through a series of rounds i.e. 2^rounds iterations of processing to give you a secure hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter