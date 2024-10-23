 function updateWeather(response){
   let temperatureElement = document.querySelector("#weather-app-temperature")
   let temperature = response.data.temperature.current
   let cityElement = document.querySelector("#weather-app-city")
   let descriptionElement = document.querySelector("#weather-condition")
   let humidityElement = document.querySelector("#humidity")
   let windElement = document.querySelector("#wind")
   let timeElement = document.querySelector("#current-time")
   let date = new Date (response.data.time * 1000)
   let iconElement = document.querySelector("#weather-icon")

iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class="weather-app-icon" />`

   temperatureElement.innerHTML = Math.round(temperature)
   cityElement.innerHTML = response.data.city
   descriptionElement.innerHTML = response.data.condition.description
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`
   windElement.innerHTML = `${response.data.wind.speed}km/h`
   timeElement.innerHTML = formatDate(date)

   getForecast(response.data.city)
   
 }
 function formatDate(date){

let hours =  date.getHours()
let minutes = date.getMinutes()
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[date.getDay()]
if (minutes < 10) {
   minutes = `0${minutes}`
}
 return `${day}, ${hours}:${minutes}`
 }
 
 function searchCity(city){
   let apiKey ="28dfoad314b78930c81640808f41tf65"
   let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
   axios.get(apiUrl).then(updateWeather)
 }
 
 function handleSearchSubmit(event) {
    event.preventDefault()
    let searchInput = document.querySelector("#search-form-input")
 
    searchCity(searchInput.value)
 }

 function getForecast(city){
let apiKey = "28dfoad314b78930c81640808f41tf65"
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios(apiUrl).then(displayForecast)


}


function displayForecast (response){
  console.log(response.data)


  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"]
let forecastHtml = ""

days.forEach(function (day) {
  forecastHtml = forecastHtml + `
  <div class="weather-forecast-day">
  <div class="weather-forecast-date">${day}</div>
  <div class="weather-forecast-icon">⛅</div>
  <div class="weather-forecast-temperatures">
  <div class="weather-forecast-temperature">
  <strong>15°</strong>
  </div>
  <div class="weather-forecast-temperature">9°</div>
  </div>
  </div>`

})
let forecastElement = document.querySelector("#forecast")
 forecastElement.innerHTML = forecastHtml
}

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("London")


