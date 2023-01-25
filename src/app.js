import "./app.css";

import Geolocation from "./js/models/Geolocation";
import Weather from "./js/models/Weather";
import Gif from "./js/models/Gif";

import * as weatherView from "./js/views/weatherView";
import * as headerView from "./js/views/headerView";

import { elements } from "./js/views/DOM";
import Geocode from "./js/models/Geocode";

//env.js to mimic dotenv if this were to live on server. doesnt exactly serve purpose though

//fahrenheit/celsius toggler
//geo coding for US location is a bit strange
//need to use different API? or use a toggle switch to indicate search query
//is a US location which to me, does not make sense

const state = {
  geolocation: new Geolocation(),
  geocode: new Geocode(),
  weather: new Weather(),
  gif: new Gif(),
};

elements.searchForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = new FormData(this).get("query");

  const coords = await state.geocode.getCoordinates(query);
  const data = await state.weather.getCurrentWeather(state.geocode.coordinates);
  const gifQuery = state.weather.createQuery();
  const newGifURL = await state.gif.getRelatedGif(gifQuery);
  elements.pin.style.color = "#f4f4f4";
  elements.container.style.color = "#f4f4f4";
  headerView.renderLocationName(elements.location, state.geocode.name);
  weatherView.renderWeather(data);
  weatherView.renderGif(elements.gifBG, newGifURL);

  // console.log(query);
  this.reset();
});

//on page load flow
document.addEventListener("DOMContentLoaded", async () => {
  elements.pin.style.color = "#000";

  //issue ---
  //no ability to detect navigator.permission.query state change when initially prompted?

  if (state.geolocation.locationExists()) {
    try {
      const position = await state.geolocation.getCurrentLocation();
      state.geolocation.storeLocation(position);

      const name = await state.geocode.getCity(state.geolocation.coords);

      const data = await state.weather.getCurrentWeather(
        state.geolocation.coords
      );

      const gifQuery = state.weather.createQuery();

      const newGifURL = await state.gif.getRelatedGif(gifQuery);

      headerView.pauseAnimation(elements.pin);

      elements.pin.style.color = "#f4f4f4";

      //headerview.renderHome
      headerView.renderLocationName(elements.location, name);
      headerView.renderSearch(elements.search);
      weatherView.renderWeather(data);
      weatherView.renderGif(elements.gifBG, newGifURL);
    } catch (error) {
      //user blocks location access so render home screen
      console.log(error);

      headerView.pauseAnimation(elements.pin);

      console.log("rendering base home screen");
      elements.container.style.color = "#000";
      headerView.renderSearch(elements.search);
    }
    //default geolocation option not available so render home screen
  } else {
    console.log("geolocation does not exist. rendering home screen");
    elements.container.style.color = "#000";

    headerView.pauseAnimation(elements.pin);
    headerView.renderSearch(elements.search);
  }
});
