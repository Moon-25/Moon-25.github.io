// ⚠️ Replace with your own API key from https://openweathermap.org/api
const apiKey = "905fde19a8390b46b0f31cf5586929bd";

const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("city");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherCard = document.getElementById("weatherCard");
const saveCityBtn = document.getElementById("saveCityBtn");
const favoritesList = document.getElementById("favorites");
const countryFlag = document.getElementById("countryFlag");
let currentCity = "";

// Get weather data
async function getWeather(city) {
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === 200) {
      currentCity = data.name;
      cityName.textContent = data.name;
      temp.textContent = `🌡️ Temp: ${data.main.temp}°C`;
      desc.textContent = `☁️ Condition: ${data.weather[0].description}`;
      humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
      wind.textContent = `💨 Wind: ${data.wind.speed} m/s`;


     

// Set the flag image using the country code
      countryFlag.src = `https://flagcdn.com/w80/${data.sys.country.toLowerCase()}.png`;
      countryFlag.alt = data.sys.country + " Flag"; // optional, improves accessibility
      countryFlag.classList.remove("hidden");



      // Weather icon
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.classList.remove("hidden");



      weatherCard.classList.remove("hidden");
    } else {
      alert("City not found!");
    }
  } catch (error) {
    alert("Error fetching weather!");
    console.error(error);
  }
}

// Save city to favorites (local storage)
function saveCity() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(currentCity)) {
    favorites.push(currentCity);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

// Render favorites list
function renderFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favoritesList.innerHTML = "";
  favorites.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", () => getWeather(city));
    favoritesList.appendChild(li);
  });
}

// Event listeners
getWeatherBtn.addEventListener("click", () => getWeather(cityInput.value));
saveCityBtn.addEventListener("click", saveCity);

// Load favorites on page load
renderFavorites();
