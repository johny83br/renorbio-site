import axios from "axios";
import * as urls from "../config";

export function getCidadesNovo(id) {
  const service = `${urls.CIDADES}?cod_estados=${id}`;
  return axios
    .get(service)
    .then(response => response.data.citys)
    .catch(error => {
      // console.log(error);
    });
}

export default {
  getCidades(id) {
    const service = `${urls.CIDADES}?cod_estados=${id}`;
    return axios
      .get(service)
      .then(response => response)
      .catch(error => {
        // console.log(error);
      });
  },
};
