import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({ country }) => {

    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(true)

        console.log('country for weather',country)
        const weatherLocation = country.capital[0];   
        const apiKey = process.env.REACT_APP_API_KEY;
        console.log(apiKey)      
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
        },[]);
