import { useState, useEffect } from 'react'
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
  const [notificationMessage, setNotificationMessage] = useState(null)

  // use effect hooks to perform side effects on the function components like data fetching,setting up subscription & manually changing the DOM in react components
  // useEffect takes 2 parameters the effect function & the [] - array specifies how  often the effect function is run
  useEffect(() => {
    console.log('effect')
    phonebookService
      .getAll()
      .then(initialContacts => {
        console.log('promise fullfilled')
        setPersons(initialContacts)
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
      const result = persons.filter(person => person.name === phonebookObject.name)
      console.log(result)
      window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`);
      const id = result[0].id
      
      // use phonebookService object to update phone number in phonebook data using put request & setpersons state to returnedcontacts after changing number
      phonebookService
        .update(id, phonebookObject)
        .then(returnedContacts => {
          setPersons(persons.map(person => person.id !== id ? person : returnedContacts))
          setNewName('')
          setNewNumber('')
        })
    }
    else {
      phonebookService
        .create(phonebookObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact));
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

  // Handle deletion of phonebook data from the server
  const handleDeleteChange = (person, persons) => {
    window.confirm(`Delete ${person.name}`)

      phonebookService
      .deleteContact(person.id)

      // setpersons state to remaining contacts in the persons state
      // so that it refreshes the page after deleting a phonebook data on the server to show only reaminging contacts in phonebook
      const id = person.id
      const remainingContacts = persons.filter(person => person.id !== id)
      setPersons(remainingContacts)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDeleteChange={handleDeleteChange}/>
    </div>
  )
}

export default App