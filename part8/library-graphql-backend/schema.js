const { gql } = require('apollo-server')

// the schema for graphql queries & types of queries are defined inside the schema
// the exclamation indicates it is a non-nullable string meaning the query to this field has to return a value & it can't be empty
// you can provide named arguments to query fields by including them inside round brackets() & it should be have any name here (author: String!)
// Mutation also has a return value of type Book so the details of the added book are returned if the operation is successful and if not, null.
const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

`

module.exports = typeDefs