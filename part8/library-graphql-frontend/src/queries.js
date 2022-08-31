import { gql } from '@apollo/client'

// add a query display all the authors in the graphql server
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

// add a query display all books in the graphql server
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
      id
    }
  }
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
      title
      published
      author
      genres
      id
    }
  }
`

// to execute queries/mutations programmatically, we must be able to give them parameters dynamically using graphql variables instead of hardcoding them
// 3 things to remember for gql variables: query should be named, Declare $variableName as one of the variables accepted by the query & pass it as a clientparameter to query
export const EDIT_AUTHOR_BIRTHYEAR = gql`
  mutation editAuthorBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
      bookCount
    }
  }
`
