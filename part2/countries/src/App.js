import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Content = ({ countries, setCountries }) => {
  if(countries.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  else if((countries.length > 1) && (countries.length < 10)) {
    return (
      <ul style={{listStyle: 'none',padding: '0',margin: 0.5 +'em'}}>
        {countries.map((country, i) => 
        <li key={i}>{country.name} <button onClick={() => setCountries([country])}>show</button></li>
        )}
      </ul>
    )
  }
  else if(countries.length === 1) {
    // {console.log(countries)} 
      return (
        <>
          <h1>{countries[0].name}</h1>
          <div>Capital {countries[0].capital}</div>
          <div>Area {countries[0].area}</div>
          <div><h3>Languages: </h3>{Object.values(countries[0].languages).map((language, i) => <li key={i}>{language}</li>)}</div><br></br>
          <img src={countries[0].flags.png} alt={countries[0].name}></img>
        </>
      )
  } 
}

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

    const newCountriesArray = 
      allCountries.map(function(country) {
        return {
          name: country.name.common,
          capital: country.capital,
          area: country.area,
          languages: country.languages,
          flags: country.flags
        };
      })
    // console.log(newCountriesArray)

    // const countriesName = newCountriesArray[0].map(country => country.name).flat(1)
    // console.log(countriesName)

    // Perform case-insensitive matching of text contained in filter state & country.name element
    if(newFilter) {
      const regex = new RegExp( newFilter, 'i' );
      const filteredCountries = () => newCountriesArray.filter(country => country.name.match(regex))
      setCountries(filteredCountries)
      console.log(filteredCountries)
    }
  }

  return (
    <div>
      <form>
        <div>find countries <input value={newFilter} onChange={handleFilterChange} /></div>
      </form>
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App;