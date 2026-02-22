<template lang="pug">

    .noticias-lista(v-if="noticias.length")
      .noticia-item(v-for="noticia of noticias")
        figure.noticias-img(:title="noticia.titulo" :alt="noticia.titulo")
          img(:src="noticia.cover", :style="{width: largura + 'px', height: altura + 'px'}")
        .noticias-info
          subtitulo(:destino="'Noticia'", :id="noticia.id") {{noticia.titulo}}
          descricao {{noticia.resumo}}
          .noticias-publicacao
            datapublic {{noticia.data}}
            hora {{noticia.hora}}

</template>

<script>
import Datapublic from "@BASICS/Data";
import Descricao from "@BASICS/Descricao";
import Hora from "@BASICS/Hora";
import Subtitulo from "@BASICS/Subtitulo";

export default {
  components: {
    Datapublic,
    Descricao,
    Hora,
    Subtitulo,
  },
  props: {
    noticias: { type: Array, required: true },
    altura: { type: Number },
    largura: { type: Number },
  },
};
</script>

<style lang="scss">
.noticia-item {
  display: flex;
  margin-top: 30px;
  align-items: center;
}

.noticias-img {
  margin-right: 15px;
  opacity: 0.8;
}

.noticias-img:hover {
  opacity: 1;
}

.noticias-img img {
  object-fit: cover;
}

.noticias-publicacao {
  display: flex;
}

@include media("<tablet") {
  .noticia-item {
    flex-direction: column;
    margin-top: 25px;
    align-items: flex-start;
  }

  .noticias-info {
    margin-top: 10px;
  }

  .noticias-img {
    align-self: center;
    margin-right: 0;
  }

  .noticias-img img {
    width: 100% !important;
    height: 180px !important;
  }
}
</style>
