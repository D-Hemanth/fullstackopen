const app = require('./app') // the actual express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// define a port to output the response received from the server, the default port number is saved as config.js file
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
