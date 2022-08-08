import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// create a method which uses axios get method to fetch data from the backend
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

// create a method which uses axios post method to add new data to backend
const createNew = async (content) => {
  const newAnecdoteObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdoteObject)
  return response.data
}

export default { getAll, createNew }