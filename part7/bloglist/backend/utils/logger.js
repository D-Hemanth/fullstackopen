// info for printing normal log messages
const info = (...params) => {
  if(process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

// error for printing all error messages
const error = (...params) => {
  if(process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

// public interface of the module is defined by setting a value to the module.exports variable here we have done destructuring with variable names info, error
module.exports = { info, error }
