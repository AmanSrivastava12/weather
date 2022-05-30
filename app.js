var showCurrentTime = function () {
  var clock = document.getElementById("clock");
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  var clockTime = hours + ":" + minutes + ":" + seconds;
  clock.innerText = clockTime;
};
var updateClock = function () {
  var time = new Date().getHours();
  var messageText;
  showCurrentTime();
};
updateClock();
var oneSecond = 1000;
setInterval(updateClock, oneSecond);

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const feelslikeElement = document.querySelector("#feels-like p");
const tempminElement = document.querySelector("#temp-min p");
const tempmaxElement = document.querySelector("#temp-max p");
const sunriseElement = document.querySelector("#sunrise p");
const pressureElement = document.querySelector("#pressure p");
const humidityElement = document.querySelector("#humidity p");
const windspeedElement = document.querySelector("#wind-speed p");
const windgustElement = document.querySelector("#wind-gust p");
const sunsetElement = document.querySelector("#sunset p");

const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
const key = "c827a72464a888d8dfd3dbea735dcbde";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.feelslike = Math.floor(data.main.feels_like - KELVIN);
      weather.tempmin = Math.floor(data.main.temp_min - KELVIN);
      weather.tempmax = Math.floor(data.main.temp_max - KELVIN);
      weather.sunrise = data.sys.sunrise;
      weather.pressure = data.main.pressure;
      weather.windspeed = data.wind.speed;
      weather.windgust = data.wind.gust;
      weather.humidity = data.main.humidity;
      weather.sunset = data.sys.sunset;
    })
