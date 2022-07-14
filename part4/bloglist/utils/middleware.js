const logger = require('./logger')

// a middleware function that prints information about every request that is sent to the server
// middleware function takes 3 parameters req,res, next - next function yields control to the next middleware
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

// add a middleware function that catches requests made to the non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// next - next function yields control to the next middleware or function or route
const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  // error handler checks if the error is a CastError exception
  if(error.name === 'CastError') {
    // when dealing with Promises i.e. findById it's a good idea to print the object that caused the exception to the console in the error handler
    console.log(error)
    // error handler response
    return response.status(400).send({ error: 'malformatted id' })
  }
  // error handler checks if the error is a ValidationError exception from the note schema
  else if(error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  // error handler checks if the error is a JsonWebTokenError exception from the user login authentication
  else if(error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  // error handler checks if the error is a TokenExpiredError exception if the logged user token token has expired
  else if(error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  // In all other error situations, the middleware passes the error forward to the default Express error handler
  next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }