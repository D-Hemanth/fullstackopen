import axios from 'axios'
const baseUrl = '/api/users'

// use axios get request with async/await syntax get all the users list from database
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }
