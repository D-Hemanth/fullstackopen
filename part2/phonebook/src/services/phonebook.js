import axios from "axios";
const baseurl = 'http://localhost:3001/persons'

// do a axios get request to the url to collect phonebook data from the server
const getAll = () => {
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

// do a axios post request to the url to send & store user input phonebook data in the backend server 
const create = (phonebookObject) => {
    const request = axios.post(baseurl, phonebookObject)
    return request.then(response => response.data)
}

// export the getAll, create  as an object of any name i.e. here in app - phonebookService to use these methods in app
export default { getAll, create }