import axios from 'axios'

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const baseUrl = 'http://api.openweathermap.org'
const iconImgBaseUrl = 'https://openweathermap.org/payload/api/media/file'

const getForecast = (cityName, cityCoords) => {
  console.log(cityName, cityCoords);
  
  if (!cityName || !cityCoords) return Promise.reject()

  const forecastResponse = axios.get(
    `${baseUrl}/data/2.5/weather?lat=${cityCoords[0]}&lon=${cityCoords[1]}&units=imperial&appid=${apiKey}&lang=en`
  )

  return forecastResponse.then(response => {
    console.log('forecast response', response)
    
    const forecast = response.data
    return { 
      ...forecast,
      weather: forecast.weather.map((weatherObj, index) => {
        return {
          ...weatherObj,
          iconUrl: `${iconImgBaseUrl}/${forecast.weather[index].icon}@2x.png`
        }
      }),
      name: cityName
    }
  })
}

export default { getForecast }