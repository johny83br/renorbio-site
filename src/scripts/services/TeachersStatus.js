import axios from "axios";
import * as urls from "../config";

export default {
  getStatus() {
    const service = urls.TEACHERS_STATUS;
    return axios
      .get(service)
      .then(response => response)
      .catch(error => {
        // console.log(error);
      });
  },
};
