function displayTemperature(response) {
  console.log(response);
  document.querySelector("#entered-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("i").innerHTML = response.data.weather[0].icon;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#sunrise").innerHTML = response.data.sys.sunrise;
  document.querySelector("#sunset").innerHTML = response.data.sys.sunset;
}
let apiKey = "b85b42162b692c033775ce60708963f8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(`${apiUrl}`).then(displayTemperature);
