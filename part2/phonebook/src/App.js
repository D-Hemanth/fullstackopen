import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  return (
    <div>
      <h2>Phonebook</h2>
    </div>
        <div>
          <button type="submit">add</button>
        </div>
      <h2>Numbers</h2>
    </div>
  )
}

export default App