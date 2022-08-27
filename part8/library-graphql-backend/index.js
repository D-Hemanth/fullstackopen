const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

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
    author: String!
    id: ID!
    genres: [String!]!
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
    bookCount: () => books.length,
    authorCount: () => authors.length,
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
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      const authorsBooks = books.filter((book) => book.author === root.name)
      return authorsBooks.length
    },
  },
  Mutation: {
    addBook: (root, args) => {
      // If the author is not yet saved to the server, a new author is added to the system. The birth years of authors are not saved to the server yet
      if (!authors.find((author) => author.name === args.author)) {
        addNewAuthor = { name: args.author, born: null, id: uuid() }
        authors = authors.concat(addNewAuthor)
      }

      // id field is given a unique value using the uuid library
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
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