import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [countriesResults, setCountriesResults] = useState([])

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
    }
    
    useEffect(hook, [filter])

    const handleFilterChange = (event) => {
      console.log(event.target.value)
      setFilter(event.target.value)
    }

    return(
        <div>
            <SearchBar filter={filter} onChange={handleFilterChange} />
            <Countries countries={countriesResults} />
        </div>
    )

}
export default App
