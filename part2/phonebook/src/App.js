import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  // Add a new name to phonebook & prevent default action after form submission
  const addName = (event) => {
    event.preventDefault()
    // console.log('submit button clicked', event.target)
    const phonebookObject = {
      name: newName
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
    }
  }

  // Handle addition of input element to react state
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map((person) => <div key={person.name}>{person.name}</div>
      )}
      </div>
    </div>
  )
}

export default App