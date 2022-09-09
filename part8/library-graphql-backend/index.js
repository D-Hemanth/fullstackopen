const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

// use the secret string for generating JWT & use the mongodb URI to save phonebookGqlApp data to mongodb from .env file using the config file
const JWT_SECRET = config.SECRET
const MONGODB_URI = config.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// setup is now within a function  -- https://www.apollographql.com/docs/apollo-server/data/subscriptions/#enabling-subscriptions
const start = async () => {

  // In order to set up both the HTTP and subscription servers, we need to first create an http.Server. Do this by passing your Express app to the createServer function
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // Creating the WebSocket server using SubscriptionServer from subscription-transport-ws
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,    // This is the `httpServer` we created in a previous step.
      path: '',              // Pass a different path here if your ApolloServer serves at a different path. 
    }
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
    // The object returned by context is given to all resolvers as their third parameter. Context is the right place to do things which are shared by multiple resolvers, like user identification
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [       // Add plugins to your ApolloServer constructor to shutdown both the HTTP server and the WebSocketServer
      // Proper shutdown of the HTTP server
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
       async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          },
        }
       }, 
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`))
}

// call the function that does the setup and starts the server
start()