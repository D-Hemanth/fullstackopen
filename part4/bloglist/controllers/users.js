const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// display all users in the database using get method of usersRouter
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})


module.exports = usersRouter