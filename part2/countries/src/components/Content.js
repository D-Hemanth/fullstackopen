import Country from "./Country";

const Content = ({ countries, setCountries }) => {
  if(countries.length > 10) {
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  // List out the countries partially matching the search based on user input
  // use button provided next to countries list to directly jump to the content of that country
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
    // send only countries[0] since lenth is equal to only 1
      return (
        <Country country={countries[0]} />
      )
  } 
}

export default Content