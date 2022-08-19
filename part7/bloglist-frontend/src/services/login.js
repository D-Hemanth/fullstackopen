import axios from 'axios'
const baseUrl = '/api/login'

// Logging in is done by sending an HTTP POST request to server address api/login using axios
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
