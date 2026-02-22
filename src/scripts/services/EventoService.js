import axios from "axios";
import * as urls from "../config";

export function getEventos(perPage, page = 1, tags = "") {
  if (tags !== "") {
    tags = `&tags=${tags}`;
  }
  const service = `${urls.WP_URL}eventos/?per_page=${perPage}&page=${page}&_embed${tags}`;
  return axios
    .get(service)
    .then(response => response)
    .catch(error => {
      // console.log(error);
    });
}

export function getEvento(id) {
  const service = `${urls.WP_URL}eventos/${id}?_embed`;
  return axios
    .get(service)
    .then(response => response.data)
    .catch(error => {
      // console.log(error);
    });
}
