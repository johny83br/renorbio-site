<template lang="pug">

    .eventos-lista(v-if="eventos.length")
      .evento-item(v-for="evento of eventos")
        .eventos-img
          figure(:title="evento.titulo" :alt="evento.titulo")
            img(:src="evento.cover", :style="{width: largura + 'px', height: altura + 'px'}")
        .eventos-info
          subtitulo(:destino="'Evento'", :id="evento.id") {{evento.titulo}}
          .descricao(v-if="exibir")
            descricao(v-if="evento.local")
              a.local(:href="evento.local" target="_blank") {{evento.onde}}
            descricao(v-else) {{evento.onde}}
          .eventos-publicacao
            datapublic(v-if="evento.fim") {{evento.inicio}} a {{evento.fim}}
            datapublic(v-else) {{evento.inicio}}
            hora(v-if="evento.hora", :show="true") {{evento.hora}}
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
    eventos: { type: Array, required: true },
    altura: { type: Number },
    largura: { type: Number },
    show: { default: true },
  },
  data() {
    return {
      exibir: this.show,
    };
  },
};
</script>

<style lang="scss">
.evento-item {
  display: flex;
  align-items: flex-start;
  margin-top: 15px;
}

.eventos-img {
  margin-right: 15px;
  opacity: 0.8;
  margin-top: 4px;
}

.eventos-img:hover {
  opacity: 1;
}

.eventos-img img {
  object-fit: cover;
}

.eventos-publicacao {
  display: flex;
}

a.local::before {
  content: "\f041";
  font-family: FontAwesome;
  margin-right: 5px;
  text-decoration: none;
}

a.local {
  color: $cor-cinza;
  text-decoration: underline;
}

a.local:hover {
  color: $cor-azul-1;
}

@include media("<tablet") {
  .evento-item {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
  }

  .eventos-info {
    margin-top: 10px;
  }

  .eventos-img {
    align-self: center;
    margin: 0;
  }

  .eventos-img img {
    width: 100% !important;
    height: 180px !important;
  }
}
</style>
