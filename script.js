const API_KEY = "0836c0880d04569045ee207a73039733"

const SEARCH_BTN = document.getElementById("searchBtn");
const SEARCH_INPUT = document.getElementById("CitySearch");
const ERROR_MSG = document.getElementById("ErrorMsg")

const fetchWeather = async (city) => {




    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    const response = await fetch(url);

    
    if (response.status === 200) {
        const data = await response.json();
        weatherInfo(data);
        ERROR_MSG.textContent ="";
    }
    else {
        ERROR_MSG.textContent="Podane miasto nie istnieje";
        document.getElementById("WeatherBox").style.display="none";

    }
    

}
const tempC = (temp) =>{
    let result = (temp-273.15).toFixed(2)+" °C";
    return result;
}
const weatherInfo = (city) =>{
    console.log(city)
    const wrapper = document.getElementById("WeatherBox");
    
    const iconSrc = "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png"
    wrapper.innerHTML = 
    `
    <div class="weatherStats">
    <h2>${city.name}</h2>
    <h3>Temperatura: ${tempC(city.main.temp)}</h3>
    <h3>Odczuwalna temperatura: ${tempC(city.main.feels_like)}</h3>
    </div>
    <img src=${iconSrc} class="icon">
    `;
    document.getElementById("ResultBox").classList.remove("resultHide");
}
const getLocation = () => {
    navigator.geolocation.getCurrentPosition( (res)=>localWeather(res.coords) )
    
    
  }
  getLocation();
    const localWeather = async (position) =>{
    const wrapper =document.getElementById("LocalBox");
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}`
    const response = await fetch(url);
    const data = await response.json();
    weatherInfo(data);

}
  
SEARCH_BTN.addEventListener("click", () => fetchWeather(SEARCH_INPUT.value));