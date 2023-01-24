import { env } from "../env";

export default class Weather {
  constructor() {
    this.key = env.WEATHER_KEY;
    this.endpoint = "https://api.openweathermap.org/data/2.5/";
    this.options = {
      units: "imperial",
    };
    this.data = {};
  }

  formatUnix(unix) {
    const date = new Date(unix * 1000);
    const hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();
    minutes < 10 ? (minutes = "0" + minutes) : (minutes = minutes);

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

  createQuery() {
    const query = this.data.description + " weather";
    const formattedQuery = query.replace(/\s/g, "+");
    return formattedQuery;
  }

  async getCurrentWeather({ latitude, longitude }) {
    const request = `${this.endpoint}weather?lat=${latitude}&lon=${longitude}&units=${this.options.units}&appid=${this.key}`;
    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error("bad response");
      }
      const data = await response.json();
      // pulling out data i will display
      const necessaryData = {
        coordinates: {
          latitude: data.coord.lat,
          longitude: data.coord.lon,
        },
        iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        degrees: data.main.temp,
        description: data.weather[0].description,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        sunrise: this.formatUnix(data.sys.sunrise),
        sunset: this.formatUnix(data.sys.sunset),
        wind: {
          deg: data.wind.deg,
          speed: data.wind.speed,
        },
      };
      this.data = necessaryData;
      return this.data;
    } catch (error) {
      console.log(error);
    }
  }
}
