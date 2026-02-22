import axios from "axios";
import * as urls from "../config";

export function getDisciplinasOfertadas() {
  const service = `${urls.DISCIPLINAS_OFERTADAS}?state=*`;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}
