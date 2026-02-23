<template lang="pug">
  #pagina(v-if="!loading")
    breadcrumb(v-if="breadcrumb.length" slot="breadcrumb", :itens="this.breadcrumb")
    .header(slot="titulo")
      titulo {{pagina.titulo}}
    .content(slot="principal")
      conteudo(v-html="pagina.corpo")
      .footer(slot="footer")
        voltar-internas
        redes-sociais
  #pagina(v-else)
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header-loading(slot="titulo")
      .titulo.loading-effect
    .content-loading(v-for="i in 3" slot="principal")
      .linha.loading-effect
      .linha.loading-effect
      .linha.loading-effect
      .linha-pequena.loading-effect
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Conteudo from "@BASICS/Artigo";
import RedesSociais from "@BASICS/RedesSociais";
import Titulo from "@BASICS/Titulo";
import VoltarInternas from "@BASICS/VoltarInternas";

import { getPagina } from "../../scripts/services/PaginaExtraService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Conteudo,
    RedesSociais,
    Titulo,
    VoltarInternas,
  },
  data() {
    return {
      pagina: {
        corpo: "",
        titulo: "",
      },
      slug: "",
      loading: true,
      breadcrumb: [{ nome: "" }],
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
  async mounted() {
    this.slug = this.$route.params.slug ? this.$route.params.slug : "";
    if (this.slug !== "") {
      await this.loadPagina(this.slug);
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
      this.breadcrumb[0].nome = this.pagina.titulo;
      this.loading = false;
      this.getAsyncData();

      document.title = `${this.pagina.titulo} | ${config.SITE_TITLE}`;
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

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}

@include media("<tablet") {
  .footer {
    flex-direction: column-reverse;
  }
}
</style>
