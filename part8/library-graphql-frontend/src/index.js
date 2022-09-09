import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

// creating new persons requires that a valid user token is sent with the request so we have to change the ApolloClient object by also sending authLink along with HttpLink
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  // console.log('token in authLink', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  }
})

// HTTP connection to the GraphQL server
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// WebSocket connection to the GraphQL server
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})

// The new splitLink configuration is due to the fact that the application must have an HTTP connection as well as a WebSocket connection to the GraphQL server
// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink),
)

// create a new client object using ApolloClient, which is then used to send a query to the server
// The link parameter given to the client object defines how apollo connects to the server. Here, the normal httpLink connection is modified so that the request's authorization header contains the token of the user who logged-in & gql server address
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

//  client can be made accessible for all components of the application by wrapping the App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
