const WeatherForecast = ({ forecast }) => {
  if (!forecast) return null

  console.log('render forecast', forecast)

  const weatherIconUrl = forecast.weather[0].iconUrl
  const weatherIconAltText = forecast.weather[0].description
  
  return (
  <div>
    <h3>Weather in {forecast.name}</h3>

    <div>Temperature: {forecast.main.temp} Farehnheit</div>
    <img src={weatherIconUrl} alt={weatherIconAltText} />
    <div>Wind: {forecast.wind.speed} mph</div>
  </div>
  )
}

export default WeatherForecast