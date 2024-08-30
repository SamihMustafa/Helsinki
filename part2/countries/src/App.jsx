import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [countriesResults, setCountriesResults] = useState([])
    const [shownCountry, setShownCountry] = useState(null)

    const getCountries = () => {
        axios
          .get('https://studies.cs.helsinki.fi/restcountries/api/all')
          .then(response => {
            console.log('promise fulfilled', response.data)
            setCountries(response.data)
          })
    }
    useEffect(getCountries, [])

    const hook = () => {
      console.log(filter)
      const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
      console.log(filteredCountries.length)
      setCountriesResults(filteredCountries)
      
      if(filteredCountries.length == 1){
        setShownCountry(filteredCountries[0])
      }else{
        setShownCountry(null)
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
      setShownCountry(foundCountry)
    }

    return(
        <div>
            <SearchBar filter={filter} onChange={handleFilterChange} />
            <Countries countries={countriesResults} showCountry={showCountry} />
            <Country country={shownCountry} />
        </div>
    )

}
export default App
