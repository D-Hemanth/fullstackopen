const { response, json } = require('express')
const express = require('express')
const app = express()

require('dotenv').config()
// Person variable will be assigned to the same object that the module defines
const Person = require('./models/phonebook')

// Add morgan a HTTP request logger middleware for node.js using tiny configuration
var morgan = require('morgan')

// In order to access the data easily, we need the help of the express json-parser for the post method to access the request body
// Without the json-parser i.e. json(), the body property  of request object sent through post request would be undefined.
app.use(express.json())

// to use the production build from create react app inside your backend
app.use(express.static('build'))

// Add use method for morgan after you've got the request data use of express.json to log request using tiny configuration to console
// tiny - :method :url :status :res[content-length] - :response-time ms  
// app.use(morgan('tiny'))

// Configure morgan so that it also shows the data sent in HTTP POST requests using morgan token
morgan.token('postData', (request) => {
	if(request.method === 'POST') 
	{
		return JSON.stringify(request.body);
	}
	else {
		return ' ';
	}
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))

// cors middleware to use and allow for requests from all origins for connecting part2 phonebook frontend & part3 phonebook backend
const cors = require('cors')
app.use(cors())

// get method to display all contacts in phonebook of mongodb using find method of Person model
app.get('/api/persons', (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})	
})

// get method to display time that the request was received and how many entries are in the phonebook 
app.get('/info', (request, response) => {
		const totalContacts = Person.length
		const timestamp = new Date()

		response.send(
				`<p>Phonebook has info for ${totalContacts} people</p></ br>
				<p>${timestamp}</p>`)
})

// get method to find a contact in the phonebook by using the route parameter - :id in request
app.get('/api/persons/:id', (request, response) => {
	Person.findById(params.request.id).then(person => {
		response.json(person)
	})
})

// add delete method & test it out using the postman desktop app or REST client vscode extension
app.delete('/api/persons/:id', (request, response) => {
		const id = Number(request.params.id)
		persons = persons.filter(person => person.id !== id)

		response.status(204).end()
})

// // Returns a random integer between min (inclusive) and max (inclusive) for id number, great explanation in comments of stackoverflow link
// // resource:https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// post method to add a note to notes list
app.post('/api/persons', (request, response) => {
	// the body property  of request object contains data sent through post request
	const body = request.body
	// console.log(body)

	// if(!body.name || !body.number) {
	// 	return response.status(400).json({
	// 		error: 'name or number is missing'
	// 	})
	// }
	// else {
	// 	const existingContactName = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())
	// 	if(existingContactName) {
	// 		return response.status(400).json({
	// 			error: 'name must be unique'
	// 		})
	// 	}
	// }

	const person = new Person({
			name: body.name,
			number: body.number
		})

	person.save().then(savedContact => {
		response.json(savedContact)
	})
})

// define a port to output the response received from the server 
const PORT = process.env.PORT
app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
})