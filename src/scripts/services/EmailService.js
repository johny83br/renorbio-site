import Vue from "vue";
import VueResource from "vue-resource";
import * as urls from "../config";

export default {
  enviaEmail(postData) {
    Vue.use(VueResource);
    return Vue.http
      .post(urls.URL_ENVIA_EMAIL, postData)
      .then(response => {
        if (response.status === 201) {
          return response.body;
        }
        return null;
      })
      .catch(error => {
        // console.log(error);
      });
  },
};
