import { gql } from '@apollo/client'

// With the fragments, we can do the queries in a compact form by calling them when required using the string template literal(${})
// Declared like this, the fragment can be placed to any query or mutation using a dollar sign and curly braces
const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
  }
`

// add a query display all the authors in the graphql server
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

// add a query display all books in the graphql server
export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

// to execute queries/mutations programmatically, we must be able to give them parameters dynamically using graphql variables instead of hardcoding them
// 3 things to remember for gql variables: query should be named, Declare $variableName as one of the variables accepted by the query & pass it as a clientparameter to query
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

// to execute queries/mutations programmatically, we must be able to give them parameters dynamically using graphql variables instead of hardcoding them
// 3 things to remember for gql variables: query should be named, Declare $variableName as one of the variables accepted by the query & pass it as a clientparameter to query
export const EDIT_AUTHOR_BIRTHYEAR = gql`
  mutation editAuthorBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

// 3 things to remember for gql variables: query should be named, Declare $variableName as one of the variables accepted by the query & pass it as a parameter to query
// define a mutation for logging in
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

// define a query 'me' for getting logged-in user info object with fields username, favouriteGenre, id
export const USER_INFO = gql`
  query {
    me {
      username
      favouriteGenre
      id
    }
  }
`

// define a query books by genre to get the books of a particular genre
export const ALL_BOOKS_BY_GENRE = gql`
  query getAllBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
