import axios from "axios";
import * as urls from "../config";

export default {
  getNoticias(perPage, page = 1, tags = "") {
    if (tags !== "") {
      tags = `&tags=${tags}`;
    }
    const service = `${urls.WP_URL}noticias-publicadas/?per_page=${perPage}&page=${page}&_embed${tags}`;
    return axios
      .get(service)
      .then(response => response)
      .catch(error => {
        // console.log(error);
      });
  },
  getNoticia(id) {
    const service = `${urls.WP_URL}noticias/${id}?_embed`;
    return axios
      .get(service)
      .then(response => response.data)
      .catch(error => {
        // console.log(error);
      });
  },
};
