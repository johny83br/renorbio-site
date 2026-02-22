<template lang="pug">
  .figure#figure(v-if="imagem" :class="figureClasses")
    figure
     lightbox(id="mylightbox" :images="images" :options="options")
     figcaption(v-html="legenda")
</template>

<script>
  import Lightbox from 'vue-simple-lightbox';

  export default {
    components: {
      Lightbox
    },
    props: ['imagem', 'legenda', 'altura', 'largura', 'isFullWidth'],
    data() {
        return {
          images: [
            {
                src: this.imagem,
                title: this.legenda
            }
          ],
          options: {
            closeText: 'X',
            widthRatio: 1,
            heightRatio: 1
          }
        };
    },
    computed: {
      figureClasses() {
        let classes = "";
        if (this.isFullWidth) {
          classes += "full-width";
        }

        return classes;
      }
    }
  };
</script>

<style lang="scss">

  .my-gallery a img {
    width: 100%;
  }

  div#figure figure {
    max-width: 35%;
    float: left;
    margin-right: 20px;
    margin-top: 15px;
  }

  div#figure figcaption {
    text-align: center;
  }

  @include media("<tablet") {

    div#figure figure {
      float: none;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0;
    }

    .my-gallery a img {
      max-height: 180px;
      max-width: 100%;
      object-fit: cover;
    }

  }

  .figure.full-width{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
  }

  .figure.full-width figure {
    min-width: 50%;
    max-width: 70%;
    margin: auto;
    float: none;
    margin-right: auto !important;
    margin-top: 15;
  }
</style>
