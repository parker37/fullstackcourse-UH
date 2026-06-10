import { useState, useEffect } from 'react'

import weatherServices from './services/weather'
import countriesService from './services/restcountries'
import Filter from './components/Filter'
import CountryResults from './components/CountryResults'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [foundCountry, setFoundCountry] = useState(null)

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
  
  useEffect(() => {
    if (!foundCountry) return
    if (!foundCountry.capital || !foundCountry.capitalInfo.latlng) {
      return
    }

    console.log('effect hook found country', foundCountry)
    weatherServices
      .getForecast(foundCountry.capital[0], foundCountry.capitalInfo.latlng)
      .then(returnedForecast => {
        console.log('returnedForecast', returnedForecast)
        setForecast(returnedForecast)
      })
      .catch((err) => {
        console.log(`Couldn't get forecast for city ${foundCountry.capital[0]} from open weather api\n${err}`)
      })
  }, [foundCountry])

  if(!countries) {
    return null
  }

  const shownCountries = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLocaleLowerCase()))
    : countries

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)

    if (shownCountries.length !== 1) {
      return setFoundCountry(null)
    }

    setFoundCountry(shownCountries[0])
  }

  const showCountry = (country) => {
    setFilter(country.name.common)
    setFoundCountry(country)
  }

  return (
    <div>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <CountryResults 
        shownCountries={shownCountries}
        showCountry={showCountry}
        forecast={forecast}
      />
    </div>
  )
}

export default App
