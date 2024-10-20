 function updateWeather(response){
   let temperatureElement = document.querySelector("#weather-app-temperature")
   let temperature = response.data.temperature.current
   let cityElement = document.querySelector("#weather-app-city")
   let descriptionElement = document.querySelector("#weather-condition")
   let humidityElement = document.querySelector("#humidity")
   let windElement = document.querySelector("#wind")
   let timeElement = document.querySelector("#current-time")
   let date = new Date (response.data.time * 1000)

console.log(response.data)

   temperatureElement.innerHTML = Math.round(temperature)
   cityElement.innerHTML = response.data.city
   descriptionElement.innerHTML = response.data.condition.description
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`
   windElement.innerHTML = `${response.data.wind.speed}km/h`
   timeElement.innerHTML = formatDate(date)


   
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

let searchFormElement = document.querySelector("#search-form")
searchFormElement.addEventListener("submit", handleSearchSubmit)

searchCity("London")