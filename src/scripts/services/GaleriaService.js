import axios from "axios";
import * as urls from "../config";

export default {
  getGalerias(perPage, page) {
    const service = `${urls.WP_URL}galerias-ordenadas/?per_page=${perPage}&page=${page}`;
    return axios
      .get(service)
      .then(response => response)
      .catch(error => {
        // console.log(error);
      });
  },
  getFotos(slug) {
    const service = `${urls.WP_URL}galeria-por-slug/?slug=${slug}&_embed`;
    return axios
      .get(service)
      .then(response => response.data[0])
      .catch(error => {
        // console.log(error);
      });
  },
};
