import axios from "axios";
import * as urls from "../config";

export function getCategorias() {
  const service = `${urls.WP_URL}categoria_documento`;
  return axios
    .get(service)
    .then(response => response.data)
    .catch(error => {
      // console.log(error);
    });
}

export default {
  getDocumentos(id, perPage, page = 1) {
    const service = `${urls.WP_URL}documentos?categoria_documento=${id}&per_page=${perPage}&page=${page}`;
    return axios
      .get(service)
      .then(response => response)
      .catch(error => {
        // console.log(error);
      });
  },
};
