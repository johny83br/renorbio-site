import axios from "axios";
import * as urls from "../config";

export function getEstados() {
  const service = urls.ESTADOS;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}

export function getPontosFocais() {
  const service = `${urls.ESTADOS}?type=focalpoints`;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}
