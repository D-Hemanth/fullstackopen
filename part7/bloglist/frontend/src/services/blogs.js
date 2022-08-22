import axios from 'axios'
const baseUrl = '/api/blogs'

// take token generated for the logged-in users to set authorization headers
let token = null
// declare the config for headers globally so we can use them in all http routes
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

// refractor http routes to use async/await syntax
const getAll = async () => {
  // add config with token of the logged-in user to the Authorization header of the HTTP get request
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blogObject) => {
  // add config with token of the logged-in user to the Authorization header of the HTTP post request
  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const update = async (likesBlogObject) => {
  const response = await axios.put(
    `${baseUrl}/${likesBlogObject.id}`,
    likesBlogObject,
    config,
  )
  return response.data
}

const remove = async (deleteBlogObject) => {
  const response = await axios.delete(
    `${baseUrl}/${deleteBlogObject.id}`,
    config,
  )
  return response.data
}

// adding comments to a blog post would be an HTTP POST request to the api/blogs/:id/comments endpoint
// & Comments should be anonymous, meaning that they are not associated to the user who left the comment so no need to send config
const makeComment = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

export default { getAll, create, update, remove, makeComment, setToken }
