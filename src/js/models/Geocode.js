import { env } from "../env";

export default class Geocode {
  constructor() {
    this.key = env.WEATHER_KEY;
    this.name = "";
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
}
