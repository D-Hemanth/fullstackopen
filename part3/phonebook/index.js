const { response } = require('express')
const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// get method to display all contacts in the phonebook
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const totalContacts = persons.length
    const timestamp = new Date()

    response.send(
        `<p>Phonebook has info for ${totalContacts} people</p></ br>
        <p>${timestamp}</p>`)
})

// define a port to output the response received from the server 
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})