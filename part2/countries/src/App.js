import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fullfilled')
        setAllCountries(response.data)
        // console.log(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  return (
    <div>
      <form>
        <div>find countries <input value={newFilter} onChange={handleFilterChange} /></div>
      </form>
    </div>
  );
}

export default App;
