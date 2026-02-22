<template lang="pug">
  #noticias

    header
      titulo Notícias
        small.more(v-if='noticias.length'): router-link(:to="{ name: 'Noticias' }") Ver mais notícias

    .conteudo(v-if="!loading")
      noticiasLista(v-if='!naoTemNoticias' :noticias="noticias", :altura="100", :largura="100")
      template(v-if='naoTemNoticias')
        mensagem.-warn
          p Nenhuma notícia foi encontrada no momento
    .conteudo(v-else)
      .content-loading(v-for="i in 2")
        .imagem-index.loading-effect
        .subtitulo.loading-effect
        .descricao-lista.loading-effect
        .descricao-lista.loading-effect
        .datas.loading-effect
</template>

<script>
import Mensagem from "@BASICS/Mensagem";
import NoticiasLista from "@MODULES/NoticiasLista";
import Titulo from "@BASICS/Titulo";

import { getNoticias } from "../../scripts/services/NoticiaService";

import Utils from "../../scripts/utils/dataFormatada";
import Data from "../../scripts/utils/Data";
import Hora from "../../scripts/utils/Hora";

export default {
  components: {
    Mensagem,
    NoticiasLista,
    Titulo,
  },
  data() {
    return {
      noticias: [],
      totalNoticias: 0,
      totalPages: 0,
      naoTemNoticias: false,
      tag: "",
      loading: true,
    };
  },
  watch: {
    $route(to, from) {
      this.noticias = this.loadNoticias(this.perPage, to.params.page, this.tag);
    },
    tag() {
      this.noticias = this.loadNoticias(this.perPage, this.page, this.tag);
    },
  },
  async mounted() {
    this.page = this.$route.query.page ? this.$route.query.page : 1;
    this.tag = this.$route.query.tag ? this.$route.query.tag : "";
    this.noticias = await this.loadNoticias(this.perPage, this.page, this.tag);
  },
  beforeUpdate() {
    this.page = this.$route.query.page ? this.$route.query.page : 1;
    this.tag = this.$route.query.tag ? this.$route.query.tag : "";
  },
  methods: {
    async loadNoticias(perPage = 4, page = 1, tag = "") {
      const noticiasTratadas = [];

      const noticias = await getNoticias(perPage, page, tag);

      Object.entries(noticias.data).forEach(v => {
        const noticia = v[1];
        const noticiaTratada = {
          id: noticia.id,
          titulo: noticia.title.rendered,
          subtitulo: noticia.acf.subtitulo,
          data_publicacao: Utils.dataFormatada(
            noticia.acf.data_de_publicacao * 1000,
          ),
          data: Data.dataFormatada(noticia.acf.data_de_publicacao * 1000),
          hora: Hora.dataFormatada(noticia.acf.data_de_publicacao * 1000),
          resumo: noticia.acf.resumo,
          url: noticia.slug,
          cover: noticia.featured_media
            ? noticia._embedded["wp:featuredmedia"][0].source_url
            : "imagem_padrao.png",
          legenda: noticia.featured_media
            ? noticia._embedded["wp:featuredmedia"][0].caption.rendered
            : "",
        };
        noticiasTratadas.push(noticiaTratada);
      });

      this.totalNoticias = parseInt(noticias.headers["x-wp-total"]);
      this.totalPages = parseInt(noticias.headers["x-wp-totalpages"]);
      if (noticiasTratadas.length === 0) {
        this.naoTemNoticias = true;
      }
      this.loading = false;

      return noticiasTratadas;
    },
  },
};
</script>

<style lang="scss">
@include media("<tablet") {
  div#noticias {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding-bottom: 30px;
  }
}
</style>
