<template lang="pug">
  pagina
    breadcrumb(slot="breadcrumb" :itens="this.breadcrumb")
    titulo(slot="titulo") {{pagina.titulo}}
    artigo.renorbio-midia(slot="principal" v-html="pagina.corpo")
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import Pagina from "@BASICS/Pagina";
import Artigo from "@BASICS/Artigo";

import { getPagina } from "../../scripts/services/PaginaExtraService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    Pagina,
    Artigo,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Comunicação" }, { nome: "Renorbio na mídia" }],
      pagina: {
        corpo: "",
        titulo: "",
      },
      slug: "",
    };
  },
  head: {
    meta: [
      {
        name: "description",
        content: config.SITE_DESC,
        id: "description",
      },
    ],
  },
  watch: {
    $route(to, from) {
      this.loadPagina(to.params.slug);
    },
  },
  mounted() {
    this.slug = this.$route.params.slug ? this.$route.params.slug : "";
    if (this.slug !== "") {
      this.loadPagina(this.slug);
    }
    this.getAsyncData();
  },
  beforeUpdate() {
    this.slug = this.$route.params.slug ? this.$route.params.slug : "";
  },
  methods: {
    async loadPagina(slug) {
      const paginaDados = await getPagina(slug);
      this.pagina.titulo = paginaDados.title.rendered;
      this.pagina.corpo = paginaDados.acf.descricao;
    },
    getAsyncData() {
      const self = this;
      window.setTimeout(() => {
        self.titulo = self.titulo;
        self.$emit("updateHead");
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.renorbio-midia {
  overflow: auto;

  p {
    margin: 0 !important;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    a {
      color: $cor-azul-1;
      font-weight: bold;
      font-size: 15px;
      display: block;
      margin-left: 25px;

      &:hover {
        text-decoration: none;
      }

      &:focus {
        text-decoration: none;
      }
    }

    li {
      display: block !important;
      margin-bottom: 15px;
    }
  }

  li::before {
    color: $cor-azul-1;
    font-size: 9px;
    font-family: FontAwesome;
    content: "\f111";
    margin-right: 18px !important;
  }

  li:hover::before {
    content: "\f0da";
    font-family: FontAwesome;
    font-size: 15px;
    margin-right: 19.5px !important;
  }
}
</style>
