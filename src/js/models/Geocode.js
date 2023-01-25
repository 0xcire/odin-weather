import { env } from "../env";

export default class Geocode {
  constructor() {
    this.key = env.WEATHER_KEY;
    this.name = "";
    this.coordinates = {
      latitude: "",
      longitude: "",
    };
  }

  async getCity({ latitude, longitude }) {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${1}&appid=${
          this.key
        }`
      );
      if (!response.ok) {
        throw new Error("bad response");
      }
      const data = await response.json();
      const name = `${data[0].name}, ${data[0].state}`;
      this.name = name;
      return this.name;
    } catch (error) {
      console.log(error);
    }
  }

  async getCoordinates(city) {
    let endpoint;
    endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${
      this.key
    }`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("bad response");
      }
      const data = await response.json();
      this.coordinates.latitude = data[0].lat;
      this.coordinates.longitude = data[0].lon;
      this.name = `${data[0].name}, ${data[0].country}`;
      return this.coordinates;
    } catch (error) {
      console.log(error);
    }
  }
}
