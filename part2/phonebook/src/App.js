import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
  number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [allPersons, setAllPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')


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
      setPersons(persons.concat(phonebookObject));
      // console.log('phonebook names list', persons)
      setNewName('')
      setNewNumber('')
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
      <form>
        <div>filter shown with <input onChange={handleFilterChange} value={newFilter} /></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name: <input onChange={handleNameChange} value={newName} /></div>
        <div>number: <input onChange={handleNumberChange} value={newNumber} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>
      )}
      </div>
    </div>
  )
}

export default App