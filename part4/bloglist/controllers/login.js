const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  // the passwords themselves are not saved to the database, but hashes calculated from the passwords, the bcrypt.compare method is used to check if the password is correct
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  
  if(!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // a token is created with the method jwt.sign & it contains the username and the user id in a digitally signed form
  // Once the API user, eg. a React app gets a token, the API has a blind trust to the token holder to solve this problem limit the validity period of a token
  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

//the code for login just has to be added to the application by adding the new router to app.js
module.exports = loginRouter