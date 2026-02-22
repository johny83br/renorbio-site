<template lang="pug">
  pagina(v-if="!loading")
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo(slot="titulo") Notícias
    noticiasLista(slot="principal", :noticias="noticias", :largura="185", :altura="100")
    template(v-if='naoTemNoticias' slot="principal")
      mensagem.-warn
        p Nenhuma notícia foi encontrada no momento
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
  pagina(v-else)
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header-loading(slot="titulo")
      .titulo.loading-effect
    .content-loading(slot="principal" v-for="i in 3")
      .imagem.loading-effect
      .subtitulo.loading-effect
      .descricao-lista.loading-effect
      .descricao-lista.loading-effect
      .datas.loading-effect
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Mensagem from "@BASICS/Mensagem";
import NoticiasLista from "@MODULES/NoticiasLista";
import Pagina from "@BASICS/Pagina";
import Paginate from "vuejs-paginate";
import Titulo from "@BASICS/Titulo";

import NoticiasService from "../../scripts/services/NoticiaService";

import Utils from "../../scripts/utils/dataFormatada";
import Data from "../../scripts/utils/Data";
import Hora from "../../scripts/utils/Hora";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Mensagem,
    NoticiasLista,
    Pagina,
    Paginate,
    Titulo,
  },
  props: ["pagination"],
  data() {
    return {
      breadcrumb: [{ nome: "Comunicação" }, { nome: "Notícias" }],
      noticias: [],
      totalNoticias: 0,
      totalPages: 0,
      naoTemNoticias: false,
      tag: "",
      page: "",
      perPage: 5,
      loading: true,
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Notícias`,
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
  mounted() {
    this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 1;
    this.tag = this.$route.params.tag ? this.$route.params.tag : "";
    this.noticias = this.loadNoticias(this.perPage, this.page, this.tag);
  },
  beforeUpdate() {
    this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 1;
    this.tag = this.$route.params.tag ? this.$route.params.tag : "";
  },
  methods: {
    loadNoticias(perPage, page = 1, tag = "") {
      this.loading = true;
      const noticiasTratadas = [];
      NoticiasService.getNoticias(perPage, page, tag).then(noticiasDados => {
        noticiasDados.data.forEach(noticia => {
          const tagsAtual = [];
          const noticiaTratada = {
            id: noticia.id,
            titulo: noticia.title.rendered,
            subtitulo: noticia.acf.subtitulo,
            data_publicacao: Utils.dataFormatada(
              noticia.acf.data_de_publicacao * 1000,
            ),
            data: Data.dataFormatada(noticia.acf.data_de_publicacao * 1000),
            hora: Hora.dataFormatada(noticia.acf.data_de_publicacao * 1000),
            url: noticia.slug,
            resumo: noticia.acf.resumo,
            cover: noticia.featured_media
              ? noticia._embedded["wp:featuredmedia"][0].source_url
              : "imagem_padrao.png",
            tags: tagsAtual,
          };
          noticiasTratadas.push(noticiaTratada);
        });
        this.totalNoticias = parseInt(noticiasDados.headers["x-wp-total"]);
        this.totalPages = parseInt(noticiasDados.headers["x-wp-totalpages"]);
        if (noticiasTratadas.length === 0) {
          this.naoTemNoticias = true;
        }
        this.loading = false;
      });
      return noticiasTratadas;
    },
    paginate(pageNum) {
      this.page = pageNum;
      this.$router.push({ params: { page: pageNum } });
      this.noticias = this.loadNoticias(this.perPage, this.page, this.tag);
    },
  },
};
</script>
