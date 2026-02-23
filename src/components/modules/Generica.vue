<template lang="pug">
  .container
    breadcrumb(:itens="breadcrumb")
    #generica(v-if="ready")
      .header(v-if="id == 1 || id == 2")
        titulo {{ pagina.titulo }}

      .content(v-if="id == 1 || id == 2")
        conteudo(v-html="pagina.corpo")
      .content(v-else)
        titulo {{ pagina.titulo }}
        conteudo(v-html="pagina.corpo")
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import Conteudo from "@BASICS/Artigo";
import { getPagina } from "../../scripts/services/PaginaExtraService";
import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    Conteudo,
  },
  data() {
    return {
      breadcrumb: [],
      pagina: {
        corpo: "",
        titulo: "",
      },
      slug: "",
      id: "",
      ready: false,
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
    document.title = `${this.pagina.titulo} | ${config.SITE_TITLE}`;
    this.getAsyncData();
  },
  beforeUpdate() {
    this.slug = this.$route.params.slug ? this.$route.params.slug : "";
  },
  methods: {
    async loadPagina(slug) {
      if (slug === "sobre-a-rede") {
        slug = "introducao";
      }

      const paginaDados = await getPagina(slug);

      if (!paginaDados) {
        this.ready = false;
      }

      this.pagina.titulo =
        paginaDados.title.rendered === "Introdução"
          ? "Sobre a Rede"
          : paginaDados.title.rendered;
      this.pagina.corpo = paginaDados.acf.descricao;
      this.ready = true;

      this.breadcrumb = [{ nome: "Renorbio" }, { nome: this.pagina.titulo }];
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
#generica {
  padding: 0 15px;
}

h3.titulo {
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
}

h3.titulo.hr {
  display: block;
  border-bottom: 1px solid $cor-azul-1;
  padding-bottom: 5px;
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
