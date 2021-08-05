const axios = require("axios");
const fs = require("fs");

class Search {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    this.readDB();
  }

  get paramMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
    };
  }

  get paramWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
    };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
        params: this.paramMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (e) {
      return e;
    }
  }

  async weatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramWeather, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (e) {
      return e;
    }
  }

  addHistory(place = "") {
    if (this.history.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.history.unshift(place.toLocaleLowerCase());

    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });

    const data = JSON.parse(info);

    this.history = data.history;
  }
}

module.exports = Search;
