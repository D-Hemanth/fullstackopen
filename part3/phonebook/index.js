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

// get method to display time that the request was received and how many entries are in the phonebook 
app.get('/info', (request, response) => {
		const totalContacts = persons.length
		const timestamp = new Date()

		response.send(
				`<p>Phonebook has info for ${totalContacts} people</p></ br>
				<p>${timestamp}</p>`)
})

// get method to find a contact in the phonebook by using the route parameter - :id in request
app.get('/api/persons/:id', (request, response) => {
		const id = Number(request.params.id)
		const contact = persons.find(person => person.id === id)

		if(contact) {
			// if the contact is not empty display it on screen
			// console.log(contact)
			response.send(contact)
		}
		else {
			// if the contact is empty send bad request status code 400
			// response.statusMessage = 'Cannot find the webpage'; // see the response in network tab
			response.status(400).end()
		}
})

// add delete method & test it out using the postman desktop app or REST client vscode extension
app.delete('/api/persons/:id', (request, response) => {
		const id = Number(request.params.id)
		persons = persons.filter(person => person.id !== id)

		response.status(204).end()
})

// In order to access the data easily, we need the help of the express json-parser
// Without the json-parser i.e. json(), the body property  of request object sent through post request would be undefined.
app.use(express.json())

// Returns a random integer between min (inclusive) and max (inclusive) for id number, great explanation in comments of stackoverflow link
// resource:https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// post method to add a note to notes list
app.post('/api/persons', (request, response) => {
	// the body property  of request object contains data sent through post request
	const body = request.body
	// console.log(body)

	const person = {
			content: body.name,
			number: body.number,
			id: getRandomInt(5, 1000000)
		}

	response.json(person)
})

// define a port to output the response received from the server 
const PORT = 3001;
app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
})