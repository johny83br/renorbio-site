import axios from "axios";
import * as urls from "../config";

export function getAreas() {
  const service = urls.AREASCONCENTRACAO;
  return axios
    .get(service)
    .then(response => response.data.areas)
    .catch(error => {
      // console.log(error);
    });
}

export function getDisciplinas(id) {
  const service = `${urls.LISTADISCIPLINAS}?area=${id}`;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}
