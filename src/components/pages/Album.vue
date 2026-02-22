<template lang="pug">
  .container.album(v-if="!loading")
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    titulo(slot="titulo") {{titulo}}
    p {{this.descricao}}
    ul.lightbox
      li(v-for="(image, index) in images" style="display: inline-block")
        img(:title="'Abrir a imagem'" :alt="image.caption" v-lazy="image.src" style="height: 100px" @click="openGallery(index)")
    lightbox(:id=" 'mylightbox' " :images="images" :options="options" ref="lightbox" :show-caption="true" :showLightBox="false")
  .container.album(v-else)
    breadcrumb(slot="breadcrumb", :itens="this.breadcrumb")
    .header-loading
      .titulo.loading-effect
    .content-loading(v-for="i in 4")
      .galeria.loading-effect
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import Pagina from "@BASICS/Pagina";

import Lightbox from "vue-image-lightbox";

import GaleriaService from "../../scripts/services/GaleriaService";

import * as config from "../../scripts/config";

require("vue-image-lightbox/dist/vue-image-lightbox.min.css");

export default {
  components: {
    Breadcrumb,
    Titulo,
    Pagina,
    Lightbox,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Galeria", rota: "Galeria" }],
      titulo: "",
      descricao: "",
      images: [],
      options: {
        closeText: "X",
        widthRatio: 1,
        heightRatio: 1,
      },
      loading: true,
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Álbum`,
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
    this.slug = this.$route.params.slug ? this.$route.params.slug : "";
    this.loadFotos(this.slug);
  },
  methods: {
    loadFotos(slug) {
      GaleriaService.getFotos(slug).then(galeriasDados => {
        this.titulo = galeriasDados.title.rendered;
        this.descricao = galeriasDados.acf.descricao;
        this.data = galeriasDados.date;
        for (let i = 0; i < galeriasDados.acf.fotos.length; i++) {
          const fotoTratada = {
            thumb: galeriasDados.acf.fotos[i].acf.anexo
              ? galeriasDados.acf.fotos[i].acf.anexo
              : galeriasDados.acf.fotos[i].acf.link,
            src: galeriasDados.acf.fotos[i].acf.anexo
              ? galeriasDados.acf.fotos[i].acf.anexo
              : galeriasDados.acf.fotos[i].acf.link,
            caption: galeriasDados.acf.fotos[i].acf.legenda_foto,
          };
          if (fotoTratada.src === false) {
            fotoTratada.src = fotoTratada.link;
          }
          this.images.push(fotoTratada);
          this.loading = false;
        }
      });
    },
    openGallery(index) {
      this.$refs.lightbox.showImage(index);
    },
  },
};
</script>

<style lang="scss">
p {
  margin-bottom: 30px;
}

ul.lightbox {
  padding: 0;
}

.lightbox img {
  width: 215px !important;
  height: 140px !important;
  object-fit: cover;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 5px;
  opacity: 0.8;
  @include media("<992px") {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}

.lightbox img:hover {
  opacity: 1;
  cursor: pointer;
}

@include media("<tablet") {
  .lightbox img {
    margin-right: 0px;
  }

  ul.lightbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
