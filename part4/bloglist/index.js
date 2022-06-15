const app = require('./app') // the actual express application
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

