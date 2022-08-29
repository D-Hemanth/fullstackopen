const { ApolloServer, gql } = require('apollo-server')
const config = require('./utils/config')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = config.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    // Implement queries bookCount and authorCount which return the number of books and the number of authors
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // Implement query allBooks, which returns the details of all books, if author argument is not given else return all books written by that author
    allBooks: (root, args) => {
      // if both author, genre are not given in argument parameter then return all books
      if (!args.author && !args.genre) {
        return books
      }

      // initialize authorWrittenBooks to books object so if author argument is not given but genre is given then we can still use initialization here to filter
      let authorWrittenBooks = books

      if (args.author)
        authorWrittenBooks = books.filter((book) => book.author === args.author)

      // use the books response from authorWrittenBooks to again filter by genre if genre parameter is given to return authorBooksGenreBased else return authorWrittenBooks
      if (args.genre) {
        const authorBooksGenreBased = authorWrittenBooks.filter(
          (book) =>
            // The findIndex() method returns -1 if no match is found & returns the index (position) of the first element that passes a test
            book.genres.findIndex((genre) => genre === args.genre) !== -1
        )
        return authorBooksGenreBased
      }

      return authorWrittenBooks
    },
    // Implement query allAuthors, which returns the details of all authors & include a field bookCount containing the number of books the author has written
    allAuthors: async () => {
      return Author.find({})
    },
  },
  Author: {
    bookCount: (root) => {
      const authorsBooks = books.filter((book) => book.author === root.name)
      return authorsBooks.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet
      const existingAuthor = await Author.findOne({ name: args.author })
      if(!existingAuthor) {
        const author = new Author({ name: args.author, born: null })
        await author.save()
      }

      // id field is given a unique value by the backend automatically so no need to add id field
      const book = new Book({ ...args })
      return book.save()
    },
    // Implement mutation editAuthor, which can be used to set a birth year for an author
    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name)
      if (!author) {
        return null
      }

      // add the updated author to authors object
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      )
      return updatedAuthor
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
