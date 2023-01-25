import { elements } from "./DOM";

//"render"
export const renderWeather = (data) => {
  elements.icon.src = `${data.iconURL}`;
  elements.icon.alt = `${data.description}-icon`;
  elements.degrees.innerHTML = `${Math.round(data.degrees)}&#176;F`;
  elements.description.textContent = data.description;
  elements.feelsLike.innerHTML = `Feels like: ${Math.round(
    data.feelsLike
  )}&#176;F`;
  elements.humidity.textContent = `Humidity: ${data.humidity}%`;
  elements.sunrise.textContent = `Sunrise at ${data.sunrise} AM`;
  elements.sunset.textContent = `Sunset at ${data.sunset} PM`;
  elements.windDirection.classList.remove("hidden");
  const deg = 11.25 + data.wind.deg;
  elements.windDirection.style.transform = `rotate(${deg}deg)`;
  elements.windSpeed.textContent = `${data.wind.speed} mph`;
};

export const renderGif = (el, url) => {
  el.style.background = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
  url("${url}")`;
  el.style.backgroundSize = "cover";
};

//alt = ${description}-icon
// N is 348.75 deg + 11.25 = 0 meteorologist deg 0
