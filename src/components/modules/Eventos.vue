<template lang="pug">
  #eventos

    header
      titulo Eventos
        small.more(v-if='eventos.length'): router-link(:to="{ name: 'Eventos' }") Ver mais eventos

    .conteudo(v-if="!loading")
      eventosLista(v-if='!naoTemEventos' :eventos="eventos", :show="false", :altura="65", :largura="100")
      template(v-if='naoTemEventos')
        mensagem.-warn
          p Nenhum evento foi encontrado no momento
    .conteudo(v-else)
      .content-loading(v-for="i in 2")
        .imagem-index.loading-effect
        .subtitulo.loading-effect
        .descricao-lista.loading-effect
        .descricao-lista.loading-effect
        .datas.loading-effect
</template>

<script>
import EventosLista from "@MODULES/EventosLista";
import Mensagem from "@BASICS/Mensagem";
import Titulo from "@BASICS/Titulo";

import EventosService from "../../scripts/services/EventoService";

import Data from "../../scripts/utils/Data";

export default {
  components: {
    EventosLista,
    Mensagem,
    Titulo,
  },
  data() {
    return {
      eventos: [],
      totalEventos: 0,
      totalPages: 0,
      naoTemEventos: false,
      tag: "",
      loading: true,
    };
  },
  watch: {
    $route(to, from) {
      this.eventos = this.loadEventos(this.perPage, to.params.page, this.tag);
    },
    tag() {
      this.eventos = this.loadEventos(this.perPage, this.page, this.tag);
    },
  },
  mounted() {
    this.page = this.$route.params.page ? this.$route.params.page : 1;
    this.tag = this.$route.params.tag ? this.$route.params.tag : "";
    this.eventos = this.loadEventos(this.perPage, this.page, this.tag);
  },
  beforeUpdate() {
    this.page = this.$route.params.page ? this.$route.params.page : 1;
    this.tag = this.$route.params.tag ? this.$route.params.tag : "";
  },
  methods: {
    loadEventos(perPage = 5, page = 1, tag = "") {
      const eventosTratados = [];
      EventosService.getEventos(perPage, page, tag).then(eventosDados => {
        eventosDados.data.forEach(evento => {
          const eventoTratado = {
            id: evento.id,
            titulo: evento.title.rendered,
            inicio: Data.dataInversa(evento.acf.data_inicio),
            fim: evento.acf.data_fim
              ? Data.dataInversa(evento.acf.data_fim)
              : false,
            cover: evento.featured_media
              ? evento._embedded["wp:featuredmedia"][0].source_url
              : "imagem_padrao.png",
            legenda: evento.featured_media
              ? evento._embedded["wp:featuredmedia"][0].caption.rendered
              : "",
          };
          eventosTratados.push(eventoTratado);
        });
        this.totaleventos = parseInt(eventosDados.headers["x-wp-total"]);
        this.totalPages = parseInt(eventosDados.headers["x-wp-totalpages"]);
        if (eventosTratados.length === 0) {
          this.naoTemEventos = true;
        }
        this.loading = false;
      });
      return eventosTratados;
    },
  },
};
</script>
