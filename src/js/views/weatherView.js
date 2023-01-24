export const renderWeather = (data, parent) => {
  const weather = `
      <div class="left">
        <div class="icon-and-degrees">
          <img
            src="${data.iconURL}"
            alt="${data.description}-icon"
            class="icon"
          />
          <p class="degrees">${data.degrees}&#176;F</p>
        </div>
        <p class="weather-description">${data.description}</p>
        <p class="feels-like">Feels like: ${data.feelsLike}&#176;F</p>
        <p class="humidity">Humidity: ${data.humidity}%</p>
      </div>
      <div class="right">
        <p class="sunrise">Sunrise at ${data.sunrise}</p>
        <p class="sunset">Sunset at ${data.sunset}</p>
        <div class="wind">
          <i class="wind-direction fa-solid fa-arrow-up"></i>
          <p class="wind-speed">${data.wind.speed}mph</p>
        </div>
      </div>
    `;

  parent.innerHTML = weather;
};

export const renderGif = (el, url) => {
  const html = `
    <div class="gif">
     <img src=${url} alt="weather-gif" />
    </div>
  `;
  el.innerHTML += html;
};

//alt = ${description}-icon
// N is 348.75 deg + 11.25 = 0 meteorologist deg 0
