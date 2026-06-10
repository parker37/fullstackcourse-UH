import WeatherForecast from "./WeatherForecast"

const Languages = ({ country }) => {
  if (!country.languages) {
    return <li key='1'>N/A</li>
  }

  return Object.values(country.languages).map(lang => {
    return <li key={lang}>{lang}</li>
  })
}

const CountryResults = ({ shownCountries, showCountry, forecast }) => {
  console.log('shownCountries', shownCountries);
  
  if (!shownCountries || shownCountries.length === 0) {
    return (
      <div>
        <p>No countries found</p>
      </div>
    )
  }
  else if (shownCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  else if (shownCountries.length > 1 && shownCountries.length <= 10) {
      return (
        <div>
          {shownCountries.map(country => {
            return <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => showCountry(country)}>Show</button>
            </div>
          })}
        </div>
      )
  }
  else if (shownCountries.length === 1) {
    const country = shownCountries[0]

    return (
      <div>
        <h2>{country.name.common}</h2>

        <div>
          Capital: {country.capital
            ? country.capital.join(', ')
            : 'N/A'
          }
        </div>
        <div>
          Area: {country.area === -1
            ? 'N/A'
            : country.area
          }
        </div>

        <h3>Languages</h3>
        <ul>
          <Languages country={country} />
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />

        <WeatherForecast forecast={forecast} />
      </div>
    )
  }

  console.log("Error: Unhandled country result");
  
  return (
    <div>
      <p>Unable to display country results</p>
    </div>
  )
}

export default CountryResults