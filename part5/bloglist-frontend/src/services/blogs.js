import axios from 'axios'
const baseUrl = '/api/blogs'

// take token generated for the logged-in users to set authorization headers
let token = null
// declare the config for headers globally so we can use them in all http routes
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

// refractor http routes to use async/await syntax
const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll, setToken }