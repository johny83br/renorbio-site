import Vue from "vue";
import VueResource from "vue-resource";
import * as urls from "../config";

export default {
  postCadastro(postData) {
    Vue.use(VueResource);
    return Vue.http
      .post(urls.CADASTRO, postData)
      .then(response => response)
      .catch(error => {
        // console.log(error);
      });
  },
};
