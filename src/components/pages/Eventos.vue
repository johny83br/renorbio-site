<template lang="pug">
  pagina(v-if="!loading")
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo(slot="titulo") Eventos
    eventosLista(slot="principal", :eventos="eventos", :largura="185", :altura="100")
    template(v-if='naoTemEventos' slot="principal")
      mensagem.-warn
        p Nenhum evento foi encontrado no momento
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
import EventosLista from "@MODULES/EventosLista";
import Mensagem from "@BASICS/Mensagem";
import Pagina from "@BASICS/Pagina";
import Paginate from "vuejs-paginate";
import Titulo from "@BASICS/Titulo";

import EventosService from "../../scripts/services/EventoService";

import Data from "../../scripts/utils/Data";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    EventosLista,
    Mensagem,
    Pagina,
    Paginate,
    Titulo,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Comunicação" }, { nome: "Eventos" }],
      eventos: [],
      totalEventos: 0,
      totalPages: 0,
      naoTemEventos: false,
      tag: "",
      page: "",
      perPage: 5,
      loading: true,
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Eventos`,
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
    this.eventos = this.loadEventos(this.perPage, this.page, this.tag);
  },
  beforeUpdate() {
    this.page = this.$route.params.page ? parseInt(this.$route.params.page) : 1;
    this.tag = this.$route.params.tag ? this.$route.params.tag : "";
  },
  methods: {
    loadEventos(perPage, page = 1, tag = "") {
      this.loading = true;
      const eventosTratados = [];
      EventosService.getEventos(perPage, page, tag).then(eventosDados => {
        eventosDados.data.forEach(evento => {
          const tagsAtual = [];
          const eventoTratado = {
            id: evento.id,
            titulo: evento.title.rendered,
            inicio: Data.dataInversa(evento.acf.data_inicio),
            fim: evento.acf.data_fim
              ? Data.dataInversa(evento.acf.data_fim)
              : false,
            hora: evento.acf.horario,
            onde: evento.acf.onde,
            local: evento.acf.local ? evento.acf.local : false,
            cover: evento.featured_media
              ? evento._embedded["wp:featuredmedia"][0].source_url
              : "imagem_padrao.png",
            tags: tagsAtual,
          };
          eventosTratados.push(eventoTratado);
        });
        this.totalEventos = parseInt(eventosDados.headers["x-wp-total"]);
        this.totalPages = parseInt(eventosDados.headers["x-wp-totalpages"]);
        if (eventosTratados.length === 0) {
          this.naoTemEventos = true;
        }
        this.loading = false;
      });
      return eventosTratados;
    },
    paginate(pageNum) {
      this.page = pageNum;
      this.$router.push({ params: { page: pageNum } });
      this.eventos = this.loadEventos(this.perPage, this.page, this.tag);
    },
  },
};
</script>
