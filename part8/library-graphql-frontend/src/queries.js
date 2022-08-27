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
      author
      published
      id
    }
  }
`
