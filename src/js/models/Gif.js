import { env } from "../env";

export default class Gif {
  constructor() {
    this.key = env.GIF_KEY;
    this.endpoint = "https://api.giphy.com/v1/gifs/search";
    this.options = {
      limit: 1,
      offset: 0,
      rating: "g",
      lang: "en",
    };
    this.url = "";
  }
  async getRelatedGif(query) {
    const request = `${this.endpoint}?api_key=${this.key}&q=${query}&limit=${this.options.limit}&offset=${this.options.offset}&rating=${this.options.rating}&lang=${this.options.lang}`;

    const response = await fetch(request);
    const data = await response.json();
    this.url = data.data[0].images.original.url;
    return this.url;
  }
}
