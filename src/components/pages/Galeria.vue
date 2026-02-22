<template lang="pug">
  .container(v-if="!loading")
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo(slot="titulo") Galeria de fotos
    imagens-lista(:itens="galerias", :galeria="true")
    template(v-if='naoTemGalerias')
      mensagem.-warn
        p Nenhuma galeria foi encontrada no momento
    .row
      .col-sm-10.col-md-10.paginacao
        paginate(
          v-if="totalPages > 1",
          slot="footer",
          v-model="page",
          :page-count="totalPages",
          :page-range="3",
          :margin-pages="1",
          :prev-text="'<'",
          :next-text="'>'",
          :click-handler="paginate"
          :container-class="'pagination'"
          :page-class="'page'"
        )
  .container(v-else)
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header-loading
      .titulo.loading-effect
    .content-loading(v-for="i in 4")
      .galeria.loading-effect
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import Paginate from "vuejs-paginate";
import ImagensLista from "@BASICS/ImagensLista";
import Mensagem from "@BASICS/Mensagem";

import { getGalerias } from "../../scripts/services/GaleriaService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    Paginate,
    ImagensLista,
    Mensagem,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Comunicação" }, { nome: "Galeria" }],
      galerias: [],
      totalGalerias: 0,
      totalPages: 0,
      naoTemGalerias: false,
      page: "",
      perPage: 8,
      loading: true,
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Galeria`,
      };
    },
    meta: [
      {
        name: "description",
        content: config.SITE_DESC,
        id: "description",
      },
    ],
  },
  async mounted() {
    this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 1;
    this.galerias = await this.loadGalerias(this.perPage, this.page);
  },
  beforeUpdate() {
    this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 1;
  },
  methods: {
    async loadGalerias(perPage, page) {
      const galeriasTratadas = [];

      const galerias = await getGalerias(perPage, page);

      Object.entries(galerias.data).forEach(v => {
        const galeria = v[1];
        const galeriaTratada = {
          titulo: galeria.title.rendered,
          descricao: galeria.acf.descricao,
          cover: galeria.acf.fotos[0].acf.anexo
            ? galeria.acf.fotos[0].acf.anexo
            : false,
          link: galeria.acf.fotos[0].acf.link,
          slug: galeria.slug,
        };
        if (galeriaTratada.cover === false) {
          galeriaTratada.cover = galeriaTratada.link;
        }
        galeriasTratadas.push(galeriaTratada);
      });

      this.totalGalerias = parseInt(galerias.headers["x-wp-total"]);
      this.totalPages = parseInt(galerias.headers["x-wp-totalpages"]);
      if (galerias.data.length === 0) {
        this.naoTemGalerias = true;
      }
      this.loading = false;

      return galeriasTratadas;
    },
    async paginate(pageNum) {
      this.page = pageNum;
      this.$router.push({ params: { page: pageNum } });
      this.galerias = await this.loadGalerias(this.perPage, this.page);
    },
  },
};
</script>

<style lang="scss" scoped>
.col-sm-10.col-md-10.paginacao {
  margin-bottom: 30px;
}
</style>
