const API_KEY = "c3a241e2c0963ffe34e4343402f08745"; // 🔑 Replace with your OpenWeatherMap API key
const weatherResult = document.getElementById("weatherResult");
const getWeatherBtn = document.getElementById("getWeatherBtn");

getWeatherBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p style="color: #ffdddd;">${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = weather[0].icon;

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
    <p><strong>${temperature.toFixed(1)}°C</strong></p>
    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
  `;
}
