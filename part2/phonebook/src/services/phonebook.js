import axios from "axios";
const baseurl = 'http://localhost:3001/persons'

// do a axios get request to the url to collect phonebook data from the server
const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}
