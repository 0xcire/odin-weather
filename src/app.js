import "./app.css";

import Geolocation from "./js/models/Geolocation";
import Weather from "./js/models/Weather";
import Gif from "./js/models/Gif";

// import weatherView from "./js/views/weatherView";

import * as weatherView from "./js/views/weatherView";
import * as headerView from "./js/views/headerView";

import { elements } from "./js/views/DOM";
import Geocode from "./js/models/Geocode";

//env.js to mimic dotenv if this were to live on server. doesnt exactly serve purpose though

//location animation, pin drops down, location text clip path left to right
//search input animation center - out

//US only to start, can add functionality for other countries with an auto suggestion type based on city name

//page loads---
//either gets location and displays location, input, current weather
//or displays just search input
//then...

//user input
//validate user input
//not valid -> display error
//valid --
//show loader
//geolocation
//then -> weather api
//then --> gif api for background
//then hide loader
//update location text
//render weather

//fahrenheit/celsius toggler

const state = {
  geolocation: new Geolocation(),
  geocode: new Geocode(),
  weather: new Weather(),
  gif: new Gif(),
};

const searchController = () => {};

const searchForm = document.querySelector("#search-form");

const formatQuery = () => {};

const validateSearch = (query) => {
  const split = query.split(",");
  const city = split[0];
  const state = split[1].trim();
  console.log(city, state);
  //must follow format City, State, for now
  // display error underneath instructing correct query format
  return query;
};

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = new FormData(this).get("query");
  //play animation
  // City, State || Country Code
  //any other format gets rejected and prompts user to follow format
  //api call for data using city, state || country code
  //

  validateSearch(query);
  console.log(query);
  this.reset();
});

//on page load flow
document.addEventListener("DOMContentLoaded", async () => {
  // const geo = new Geolocation();
  // const geocode = new Geocode();
  // const weather = new Weather();
  // const gif = new Gif();

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

      //headerview.renderHome
      headerView.renderLocationName(elements.location, name);
      headerView.renderSearch(elements.search);
      weatherView.renderWeather(data, elements.weather);
      weatherView.renderGif(elements.app, newGifURL);

      //render gif background
      //
    } catch (error) {
      //user blocks location access so render home screen
      console.log(error);

      headerView.pauseAnimation(elements.pin);

      console.log("rendering base home screen");
    }
    //default geolocation option not available so render home screen
  } else {
    console.log("geolocation does not exist. rendering home screen");

    headerView.pauseAnimation(elements.pin);
  }
});
