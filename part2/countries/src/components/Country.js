import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({ country }) => {

    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(true)

        console.log('country for weather',country)
        const weatherLocation = country.capital[0];   
        const apiKey = process.env.REACT_APP_API_KEY;
        // console.log(apiKey)      
        const params = {
            q: weatherLocation, 
            appid: apiKey,
            units: 'metric'
        };

        // use useffect hooks to gather api response using axios get request & use 'then' for parsing the response
        useEffect(() => {
            axios
            .get('https://api.openweathermap.org/data/2.5/weather?', { params })
            .then(response => {
                console.log('weather data gathered',response.data)
                const apiResponse = response.data;
                setWeather([apiResponse])
                setLoading(false)
            })
            .catch((err) =>{
                console.log(err);
            })
        });

    // since the api response is set to weather state after rendering the components use conditionals to re-render the page after getting the api response
    const render = () => {
        if(isLoading) 
            return (
                <>
                    <h1>{country.name}</h1>
                    <div>Capital {country.capital}</div>
                    <div>Area {country.area}</div>
                    <div><h3>Languages: </h3>{Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}</div><br></br>
                    <img src={country.flags.png} alt={country.name}></img>
                    <h3>Weather is loading...</h3>
                </>
            )    

        if (weather.length > 0) {
            const currentWeather = weather
            console.log('current weather for capital',currentWeather)
            const icon = currentWeather[0].weather[0].icon;
            return (
                <>
                    <h1>{country.name}</h1>
                    <div>Capital {country.capital}</div>
                    <div>Area {country.area}</div>
                    <div><h3>Languages: </h3>{Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}</div><br></br>
                    <img src={country.flags.png} alt={country.name}></img>
                    <h2>Weather in {country.capital}</h2>
                    <div>Temperature {currentWeather[0].main.temp} Celcius</div>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={currentWeather[0].weather[0].description} style={{width: 125 +'px'}}></img>
                    <div>Wind {currentWeather[0].wind.speed} m/s</div>
                </>
            )
        }
        else {
                return <p>No data found for Weather</p>
            }
    }
    return render()
}

export default Country