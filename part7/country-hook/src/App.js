import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // after rendering the page the name input form is empty 
    if(name === '') {
      setCountry(null)
    }
    else {
      // used the async/await syntax to make the api request or you can use axios get with then to handle returned promise
      // to use async & await define a function here setCountryState & call it setCountryState()
      const setCountryState = async () => {
        try {
          const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
          console.log('axios response', response.data[0])
          setCountry(response.data[0])
        }
        catch (error) {
          console.log('axios request failed check the country spelling', error)
          setCountry(null)
        }
      }
      setCountryState()
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
