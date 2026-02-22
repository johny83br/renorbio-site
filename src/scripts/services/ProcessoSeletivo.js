import axios from "axios";
import * as urls from "../config";

export function getProcessoSeletivo() {
  const service = urls.PROCESSOSELETIVO;
  return axios
    .get(service)
    .then(response => response.data.registers)
    .catch(error => {
      // console.log(error);
    });
}
