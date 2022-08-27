import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

// create a new client object using ApolloClient, which is then used to send a query to the server
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
})

//  client can be made accessible for all components of the application by wrapping the App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
