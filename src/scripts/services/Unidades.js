import axios from "axios";
import * as urls from "../config";

export function getUnidades() {
  const service = `${urls.UNIDADES}?state=all`;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}
