<template lang="pug">
  pagina(v-if="!loading")
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header(slot="titulo")
      internas-titulo {{titulo}}
      .header-infos
        eventos-dados(:onde='eventosDados.onde', :horario='eventosDados.horario', :site='eventosDados.site', :inicio='eventosDados.inicio', :fim='eventosDados.fim', :telefone='eventosDados.telefone', :email='eventosDados.email', :local='eventosDados.local')
    .content(slot="principal")
      imagem-adaptavel(v-if="this.imagem", isFullWidth="true", :imagem='imagem', :legenda='imagemCaption', :altura="400", :title="imagemCaption", :alt="imagemCaption")
      artigo(v-html="corpo")

    .content-tags(slot="principal")
      tag(:itens="tags")
    internas-rodape(slot="footer")

  pagina(v-else)
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header-loading(slot="titulo")
      .titulo.loading-effect
      .descricao.loading-effect
      .infos-loading
        .infos.loading-effect
        .infos.loading-effect
    .content-loading(slot="principal")
      .imagem.loading-effect
      .descricao.loading-effect
      .descricao.loading-effect
      .descricao.loading-effect
      .descricao.loading-effect
    .rodape-loading(slot="footer")
      .internas-rodape.loading-effects
</template>

<script>
import Artigo from "@BASICS/Artigo";
import Breadcrumb from "@MODULES/Breadcrumb";
import Datapublic from "@BASICS/Data";
import EventosDados from "@BASICS/EventosDados";
import Hora from "@BASICS/Hora";
import ImagemAdaptavel from "@BASICS/ImagemAdaptavel";
import InternasDescricao from "@BASICS/InternasDescricao";
import InternasRodape from "@MODULES/InternasRodape";
import InternasTitulo from "@BASICS/InternasTitulo";
import Pagina from "@BASICS/Pagina";
import RedesSociais from "@BASICS/RedesSociais";
import Tag from "@BASICS/Tags";
import VoltarInternas from "@BASICS/VoltarInternas";

import { getEvento } from "../../scripts/services/EventoService";

import DataUtil from "../../scripts/utils/Data";

import * as config from "../../scripts/config";

export default {
  components: {
    Artigo,
    Breadcrumb,
    Datapublic,
    EventosDados,
    Hora,
    ImagemAdaptavel,
    InternasDescricao,
    InternasRodape,
    InternasTitulo,
    Pagina,
    RedesSociais,
    Tag,
    VoltarInternas,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Eventos", rota: "Eventos" }],
      eventosDados: {
        onde: "",
        horario: "",
        site: "",
        inicio: "",
        fim: "",
        telefone: "",
        email: "",
        local: "",
      },
      titulo: "",
      imagem: "",
      corpo: "",
      tags: [],
      imagemCaption: "",
      loading: true,
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - ${this.titulo}`,
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
    await this.loadEvento(this.$route.params.id);
    this.getAsyncData();
  },
  methods: {
    async loadEvento(id) {
      const evento = await getEvento(id);

      this.id = evento.id;
      this.titulo = evento.title.rendered;
      this.imagem = evento.featured_media
        ? evento._embedded["wp:featuredmedia"][0].source_url
        : false;
      this.imagemCaption = evento.featured_media
        ? evento._embedded["wp:featuredmedia"][0].caption.rendered
        : false;

      this.eventosDados.inicio = DataUtil.dataInversa(evento.acf.data_inicio);
      this.eventosDados.fim = evento.acf.data_fim
        ? DataUtil.dataInversa(evento.acf.data_fim)
        : false;
      this.eventosDados.email = evento.acf.email_de_contato;
      this.eventosDados.horario = evento.acf.horario
        ? evento.acf.horario
        : false;
      this.eventosDados.local = evento.acf.local ? evento.acf.local : false;
      this.eventosDados.onde = evento.acf.onde ? evento.acf.onde : false;
      this.eventosDados.site = evento.acf.site ? evento.acf.site : false;
      const http = "http://";
      const https = "https://";
      if (this.eventosDados.site) {
        if (
          !this.eventosDados.site.includes(http) &&
          !this.eventosDados.site.includes(https)
        ) {
          this.eventosDados.site = http + this.eventosDados.site;
        }
      }
      this.eventosDados.telefone = evento.acf.telefone_de_contato
        ? evento.acf.telefone_de_contato
        : false;

      const tagsAtual = [];
      if (evento._embedded) {
        if (evento._embedded["wp:term"]) {
          evento._embedded["wp:term"][0].forEach(term => {
            tagsAtual.push({
              id: term.id,
              nome: term.name,
              slug: term.slug,
            });
          });
        }
        this.tags = tagsAtual;
      }
      this.corpo = evento.acf.corpo;
      this.loading = false;
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

<style lang="css" scoped>
.header-infos {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.content-tags {
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
}

:v-deep .w-100 {
  width: 100%;
}
:v-deep #figure {
  width: 100%;
  margin: auto;
}
:v-deep #figure img {
  max-width: 50%;
  margin: auto;
}
</style>
