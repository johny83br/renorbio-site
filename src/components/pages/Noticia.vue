<template lang="pug">
  pagina(v-if="!loading")
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header(slot="titulo")
      internas-titulo {{titulo}}
      internas-descricao {{subtitulo}}
      .header-infos
        datapublic {{data}}
        hora {{hora}}
        tag(:itens="tags")
    .content(slot="principal")
      imagem-adaptavel(v-if="this.imagem", :imagem='imagem', :legenda='imagemCaption', :title="imagemCaption", :alt="imagemCaption")
      artigo(v-html="corpo")
      p.autor(v-if="autor") Autor: {{autor}}
      p.fonte(v-if="fonte") Fonte: {{fonte}}
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
import Hora from "@BASICS/Hora";
import ImagemAdaptavel from "@BASICS/ImagemAdaptavel";
import InternasDescricao from "@BASICS/InternasDescricao";
import InternasRodape from "@MODULES/InternasRodape";
import InternasTitulo from "@BASICS/InternasTitulo";
import Pagina from "@BASICS/Pagina";
import Tag from "@BASICS/Tags";
import VoltarInternas from "@BASICS/VoltarInternas";

import { getNoticia } from "../../scripts/services/NoticiaService";

import DataUtil from "../../scripts/utils/Data";
import HoraUtil from "../../scripts/utils/Hora";

import * as config from "../../scripts/config";

export default {
  components: {
    Artigo,
    Breadcrumb,
    Datapublic,
    Hora,
    ImagemAdaptavel,
    InternasDescricao,
    InternasRodape,
    InternasTitulo,
    Pagina,
    Tag,
    VoltarInternas,
  },
  data() {
    return {
      breadcrumb: [
        { nome: "Comunicação" },
        { nome: "Notícias", rota: "Noticias" },
      ],
      titulo: "",
      subtitulo: "",
      imagem: "",
      corpo: "",
      data: "",
      hora: "",
      tags: [],
      autor: "",
      fonte: "",
      imagemCaption: "",
      loading: true,
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
  mounted() {
    this.loadNoticia(this.$route.params.id);
    this.getAsyncData();
  },
  methods: {
    async loadNoticia(id) {
      const noticia = await getNoticia(id);

      this.id = noticia.id;
      this.titulo = noticia.title.rendered;
      this.subtitulo = noticia.acf.subtitulo;
      this.imagem = noticia.featured_media
        ? noticia._embedded["wp:featuredmedia"][0].source_url
        : false;
      this.imagemCaption = noticia.featured_media
        ? noticia._embedded["wp:featuredmedia"][0].caption.rendered
        : false;
      this.data = DataUtil.dataFormatada(noticia.acf.data_de_publicacao * 1000);
      this.hora = HoraUtil.dataFormatada(noticia.acf.data_de_publicacao * 1000);
      const tagsAtual = [];
      if (noticia._embedded) {
        if (noticia._embedded["wp:term"]) {
          noticia._embedded["wp:term"][0].forEach(term => {
            tagsAtual.push({
              id: term.id,
              nome: term.name,
              slug: term.slug,
            });
          });
        }
        this.tags = tagsAtual;
      }
      this.autor = noticia.acf.autor;
      this.fonte = noticia.acf.origem;
      this.corpo = noticia.acf.corpo;
      this.loading = false;

      document.title = `${this.titulo} | ${config.SITE_TITLE}`;
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
.header-infos {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

p.descricao {
  font-size: 16px;
}

.footer {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}

.autor,
.fonte {
  font-weight: bold;
  font-size: 12px;
}
</style>
