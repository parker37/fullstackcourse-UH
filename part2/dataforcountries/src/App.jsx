import { useState, useEffect } from 'react'

import countriesService from './services/restcountries'
import Filter from './components/Filter'
import CountryResults from './components/CountryResults'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(returnedCountries => {
        console.log(returnedCountries)
        setCountries(returnedCountries)
      })
      .catch(() => {
        console.log(`Couldn't get countries from restcountries api`)
      })
  }, [])
  
  if(!countries) {
    return null
  }

  const shownCountries = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <CountryResults shownCountries={shownCountries} /> 
    </div>
  )
}

export default App
