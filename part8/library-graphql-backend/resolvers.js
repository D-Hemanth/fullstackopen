const { UserInputError, AuthenticationError } = require('apollo-server')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')


// use the secret string for generating JWT to save phonebookGqlApp data to mongodb from .env file using the config file
const JWT_SECRET = config.SECRET

// the resolver functions(personCount,...) now return a promise, when they previously returned normal objects. When a resolver returns a promise, Apollo server waits for the promise to resolve, and returns the result
// A resolver can optionally accept four positional arguments: (parent/root, args, context, info)
const resolvers = {
  Query: {
    // Implement queries bookCount and authorCount which return the number of books and the number of authors
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    // Implement query allBooks, which returns the details of all books, if author argument is not given else return all books written by that author
    allBooks: async (root, args) => {
      // if both author, genre are not given in argument parameter then return all books
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }

      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author })
        if (foundAuthor) {
          if (args.genre) {
            return await Book.find({
              author: foundAuthor.id,
              genres: { $in: [args.genre] },
            }).populate('author')
          }
          return await Book.find({ author: foundAuthor.id }).populate('author')
        }
        return null
      }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
    },
    // Implement query allAuthors, which returns the details of all authors & include a field bookCount containing the number of books the author has written
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      // find the books with author field having the id same as root.id i.e. current author id whose bookCount we're tallying
      const books = await Book.find({ author: root.id })
      return books.length
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      // before editing persons verify that the user is logged-in using context parameter of resolver
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated')
      }

      // author name being too short(<4) then mongoose database validation error handling
      if (args.author.length < 4) {
        throw new UserInputError('Author name is less than 4 characters', {
          invalidArgs: args.author,
        })
      }

      // If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet
      const existingAuthor = await Author.findOne({ name: args.author })
      if (!existingAuthor) {
        const author = new Author({ name: args.author })
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
      if (existingBook) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }

      // id field is given a unique value by the backend automatically so no need to add id field
      const newAuthor = await Author.findOne({ name: args.author })
      // console.log('newAuthor while adding newBook', newAuthor)
      const book = new Book({ ...args, author: newAuthor })

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
    editAuthor: async (root, args, context) => {
      // before editing persons verify that the user is logged-in using context parameter of resolver
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      // add the updated author to authors object in mongodb by modifying the author birthyear & save the edited author object
      author.born = args.setBornTo
      // console.log('author birthyear edit result', author)
      // For handling possible validation errors in the schema, we must add an error-handling try/catch block to the save method
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      })

      return user.save().catch((error) => {
        // catch user input errors using UserInputError method
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      // JSON Web Tokens consist of three parts separated by dots (.), which are Header(type of encryption).Payload(user info).Signature(base64UrlEncode(header+payload+secret))
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

module.exports = resolvers