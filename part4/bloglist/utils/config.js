require('dotenv').config()

const PORT = process.env.PORT

// Check whether the node environment is production or test mode so that we can connect production/test mongodb database
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

// public interface of the module is defined by setting a value to the module.exports variable here we have done destructuring of with variable names MONGODB_URI, PORT
module.exports = { MONGODB_URI, PORT }