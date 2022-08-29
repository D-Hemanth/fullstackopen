const { ApolloServer, gql, UserInputError } = require('apollo-server')
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

// the resolver functions(personCount,...) now return a promise, when they previously returned normal objects. When a resolver returns a promise, Apollo server waits for the promise to resolve, and returns the result
// A resolver can optionally accept four positional arguments: (parent/root, args, context, info)
const resolvers = {
  Query: {
    // Implement queries bookCount and authorCount which return the number of books and the number of authors
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // Implement query allBooks, which returns the details of all books, if author argument is not given else return all books written by that author
    allBooks: (root, args) => {
      // if both author, genre are not given in argument parameter then return all books
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }

      // initialize authorWrittenBooks to books object so if author argument is not given but genre is given then we can still use initialization here to filter
      let authorWrittenBooks = await Book.find({}).populate('author')

      if (args.author)
        authorWrittenBooks = await authorWrittenBooks.filter((book) => book.author.name === args.author)

      // use the books response from authorWrittenBooks to again filter by genre if genre parameter is given to return authorBooksGenreBased else return authorWrittenBooks
      if (args.genre) {
        // The $in operator selects the documents where the value of a field(here genres) equals any value in the specified array
        const authorBooksGenreBased = await authorWrittenBooks.find({ genres: { $in: [args.genre] } })
        return authorBooksGenreBased
      }

      return authorWrittenBooks
    },
    // Implement query allAuthors, which returns the details of all authors & include a field bookCount containing the number of books the author has written
    allAuthors: async () => {
      await Author.find({})
    },
  },
  Author: {
    bookCount: (root) => {
      // find the books with author field having the id same as root.id i.e. current author id whose bookCount we're tallying
      const books = await Book.find({ author: root.id})
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // author name being too short(<4) then mongoose database validation error handling 
      if(args.author.length < 4) {
        throw new UserInputError('Author name is less than 4 characters', {
          invalidArgs: args.author,
        })
      }

      // If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet
      const existingAuthor = await Author.findOne({ name: args.author })
      if(!existingAuthor) {
        const author = new Author({ name: args.author, born: null })
        // For handling possible validation errors in the schema, we must add an error-handling try/catch block to the save method
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      // book title already exists then mongoose database validation error handling 
      const existingBook = await Book.findOne({ title: args.title })
      if(existingBook) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title
        })
      }

      // id field is given a unique value by the backend automatically so no need to add id field
      const book = new Book({ ...args })
      // For handling possible validation errors in the schema, we must add an error-handling try/catch block to the save method
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    // Implement mutation editAuthor, which can be used to set a birth year for an author
    editAuthor: (root, args) => {
      const author = await Author.find({ name: args.name })
      if(!author) {
        return null
      }

      // add the updated author to authors object in mongodb by modifying the author birthyear & save the edited author object
      author.born = args.setBornTo
      // For handling possible validation errors in the schema, we must add an error-handling try/catch block to the save method
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
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
