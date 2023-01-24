export default class Geolocation {
  constructor() {
    this.options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
    };
    this.coords = {
      latitude: "",
      longitude: "",
    };
  }

  locationExists() {
    return navigator.geolocation ? true : false;
  }

  getCoordinates() {
    return this.coords;
  }

  storeLocation(res) {
    this.coords.latitude = res.coords.latitude;
    this.coords.longitude = res.coords.longitude;
  }
  handleError(err) {
    console.log(err.message);
  }

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      const success = (position) => resolve(position);
      const error = (error) => reject(error);
      navigator.geolocation.getCurrentPosition(success, error, this.options);
    });
  }
}
