const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const feelslikeElement = document.querySelector("#feels-like p");
const visibilityElement = document.querySelector("#visibility p");
const cloudinessElement = document.querySelector("#cloudiness p");
const sunriseElement = document.querySelector("#sunrise p");
const pressureElement = document.querySelector("#pressure p");
const humidityElement = document.querySelector("#humidity p");
const windspeedElement = document.querySelector("#wind-speed p");
const windgustElement = document.querySelector("#wind-gust p");
const sunsetElement = document.querySelector("#sunset p");
const weather = {};
weather.unit = "celsius";
const key = "-"; // Enter your own generated API key

function showCurrentTime() {
  let clock = document.getElementById("clock");
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  clock.innerText = hours + ":" + minutes + ":" + seconds;
}

let celsiusToFahrenheit = (temperature) => (temperature * 9) / 5 + 32;

function converter() {
  if (weather.value === undefined) return;
  if (weather.unit == "celsius") {
    let fahrenheittemp = Math.floor(celsiusToFahrenheit(weather.value));
    let fahrenheitfeelslike = Math.floor(
      celsiusToFahrenheit(weather.feelslike)
    );
    tempElement.innerHTML = `${fahrenheittemp}°<span>F</span>`;
    feelslikeElement.innerHTML = `Feels like<br>${fahrenheitfeelslike}°<span>F</span>`;
    weather.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.value}°<span>C</span>`;
    feelslikeElement.innerHTML = `Feels like<br>${weather.feelslike}°<span>C</span>`;
    weather.unit = "celsius";
  }
}

function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  feelslikeElement.innerHTML = `Feels like<br>${weather.feelslike}°<span>C</span>`;
  visibilityElement.innerHTML = `Visibility<br>${weather.visibility} <span>m</span>`;
  cloudinessElement.innerHTML = `Cloudiness<br>${weather.cloudiness} <span>%</span>`;
  sunriseElement.innerHTML = `Sunrise<br>${weather.sunrise}`;
  pressureElement.innerHTML = `Pressure<br>${weather.pressure} <span>hPa</span>`;
  humidityElement.innerHTML = `Humidity<br>${weather.humidity} <span>%</span>`;
  windspeedElement.innerHTML = `Wind speed<br>${weather.windspeed} <span>m/sec</span>`;
  windgustElement.innerHTML = `Wind Gusts<br>${weather.windgust} <span>m/sec</span>`;
  sunsetElement.innerHTML = `Sunset<br>${weather.sunset}`;
}

function sunsetandsunrise() {
  let timeRegex = /(\d\d):(\d\d):(\d\d)/;
  weather.sunrise = timeRegex.exec(new Date(weather.sunrise * 1000))[0];
  weather.sunset = timeRegex.exec(new Date(weather.sunset * 1000))[0];
}

function getWeather(latitude, longitude) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.value = Math.floor(data.main.temp - 273);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.feelslike = Math.floor(data.main.feels_like - 273);
      weather.visibility = data.visibility;
      weather.cloudiness = data.clouds.all;
      weather.sunrise = data.sys.sunrise;
      weather.pressure = data.main.pressure;
      weather.windspeed = data.wind.speed ? data.wind.speed : 0;
      weather.windgust = data.wind.gust ? data.wind.gust : 0;
      weather.humidity = data.main.humidity;
      weather.sunset = data.sys.sunset;
    })
    .then(function () {
      sunsetandsunrise();
      displayWeather();
    });
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}
function showError(error) {
  alert(`Error : ${error.message}`);
}

function initialize() {
  setInterval(showCurrentTime, 1000);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    alert("Error : Browser doesn't Support Geolocation");
  }
}
