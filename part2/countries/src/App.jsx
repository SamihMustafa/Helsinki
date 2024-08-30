import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Countries from './components/Countries'
import Country from './components/Country'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [countriesResults, setCountriesResults] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [weather, setWeather] = useState(null)

    const getCountries = () => {
        axios
          .get('https://studies.cs.helsinki.fi/restcountries/api/all')
          .then(response => {
            console.log('promise fulfilled', response.data)
            setCountries(response.data)
          })
    }
    useEffect(getCountries, [])

    const getWeather = () => {
       if(selectedCountry){
        const country = selectedCountry
        const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`
        axios
          .get(baseUrl)
          .then(response => {
            console.log('weather promise fulfilled', response.data)
            console.log('current country when displaying weather', selectedCountry)
            if(selectedCountry != null){
              setWeather(response.data)
            }else{
              setWeather(null)
            }
          })
        }else{
          setWeather(null)
        }
    }
    useEffect(getWeather, [selectedCountry])

    const hook = () => {
      console.log(filter)
      const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
      console.log(filteredCountries.length)
      setCountriesResults(filteredCountries)
      
      if(filteredCountries.length == 1){
        setSelectedCountry(filteredCountries[0])
      }else{
        setSelectedCountry(null)
      }
    }
    
    useEffect(hook, [filter])

    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
    }

    const showCountry = (name) => {
      console.log(name)
      const foundCountry = countries.find(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
      console.log(foundCountry)
      setSelectedCountry(foundCountry)
    }

    return(
        <div>
            <SearchBar filter={filter} onChange={handleFilterChange} />
            <Countries countries={countriesResults} showCountry={showCountry} />
            <Country country={selectedCountry} weather={weather} />
        </div>
    )

}
export default App
