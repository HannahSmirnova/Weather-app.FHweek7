let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = now.getTime();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDay = document.querySelector("#date");
currentDay.innerHTML = `${day} ${hours}:${minutes}`;

function sunDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastDaily = response.data.daily;
  console.log(forecastDaily);

  forecastDaily.forEach(function (forecastDay, index) {
    console.log(forecastDay);
    if (index < 5) {
      document.querySelector(
        "#daily-forecast"
      ).innerHTML += `<span class="weather-forecast-day-temperature">
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="overcast clouds"
                width="42"
              />
              <strong>${Math.round(forecastDay.temp.day)}°</strong>
            </span>
            <div class="weather-forecast-day">
              <strong>${formatDay(forecastDay.dt)}</strong>
            </div>`;
    }
  });
}

function formatHour(timestamp) {
  let time = new Date(timestamp * 1000);
  let forecastHour = time.getHours();
  let forecastHours = [
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];
  return forecastHours[forecastHour];
}

function displayHourlyForecast(response) {
  let forecastHourly = response.data.hourly;
  console.log(forecastHourly);

  forecastHourly.forEach(function (forecastHour, index) {
    console.log(forecastHour);
    if (index < 5) {
      document.querySelector(
        "#hourly-forecast"
      ).innerHTML += `<span class="weather-forecast-hour-temperature">
                <img
                src="https://openweathermap.org/img/wn/${
                  forecastHour.weather[0].icon
                }@2x.png"
                alt="overcast clouds"
                width="42"/>
              <strong>${Math.round(forecastHour.temp)}°</strong>
            </span>
            <div class="weather-forecast-hour">
              <strong>${formatHour(forecastHour.dt)}</strong>
            </div>`;
    }
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b85b42162b692c033775ce60708963f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecastHourly(coordinates) {
  console.log(coordinates);
  let apiKey = "b85b42162b692c033775ce60708963f8";
  let apiUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast);
}

function displayTemperature(response) {
  console.log(response);
  let iconElement = document.querySelector("#icon");
  celsiusTemp = Math.round(response.data.main.temp);
  document.querySelector("#entered-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#sunrise").innerHTML = sunDate(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = sunDate(
    response.data.sys.sunset * 1000
  );
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "b85b42162b692c033775ce60708963f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function convertTemp(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function celsiusT(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function submit(event) {
  event.preventDefault();
  let enteredElement = document.querySelector("#entered");
  search(enteredElement.value);
}

function searchLocation(position) {
  let apiKey = "b85b42162b692c033775ce60708963f8";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=10&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submit);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertTemp);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusT);

search("New York");
