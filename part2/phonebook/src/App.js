import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [allPersons, setAllPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  // use effect hooks to perform side effects on the function components like data fetching,setting up subscription & manually changing the DOM in react components
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }, [])

  // Add a new name to phonebook & prevent default action after form submission
  const addName = (event) => {
    event.preventDefault()
    // console.log('submit button clicked', event.target)
    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    // prevent user from adding duplicate names to phonebook
    // Map the values of name in the persons object to an array i.e. results array & flatten it by one pair of brackets
    const result = persons.map(Object.values).flat(1)
    // console.log(result)
    // console.log(phonebookObject.name)
    // use array method includes to check if the array has an name element which we are trying to add to phonebook
    if(result.includes(phonebookObject.name))
    {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      axios
        .post('http://localhost:3001/persons',phonebookObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          // console.log('phonebook names list', persons)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  // Handle addition of name input element to react state as a controlled element
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  // Handle addition of number input element to react state as a controlled element
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setAllPersons(persons)
    // console.log(event.target.value)
    setNewFilter(event.target.value)
    // Perform case-insensitive matching of text contained in newFilter state & person.name element
    const regex = new RegExp(newFilter, 'i');
    const filteredPersons = () => allPersons.filter(person => person.name.match(regex))
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App