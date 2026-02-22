import axios from "axios";
import * as urls from "../config";

export function getPagina(slug) {
  const service = `${urls.WP_URL}paginas_extras/?slug=${slug}`;
  return axios
    .get(service)
    .then(response => response.data[0])
    .catch(error => {
      // console.log(error);
    });
}
