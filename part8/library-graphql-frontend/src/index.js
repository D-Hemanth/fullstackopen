import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

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

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// create a new client object using ApolloClient, which is then used to send a query to the server
// The link parameter given to the client object defines how apollo connects to the server. Here, the normal httpLink connection is modified so that the request's authorization header contains the token of the user who logged-in & gql server address
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
})

//  client can be made accessible for all components of the application by wrapping the App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
