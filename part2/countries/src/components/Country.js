import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({ country }) => {

    const [weather, setWeather] = useState([])
    const [isLoading, setLoading] = useState(true)

