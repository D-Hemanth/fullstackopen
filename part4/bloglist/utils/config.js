require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

// public interface of the module is defined by setting a value to the module.exports variable here we have done destructuring of with variable names MONGODB_URI, PORT
module.exports = { MONGODB_URI, PORT }