<template lang="pug">
  .container
    .row
      .col-xs-12.col-sm-8.col-md-6.dados
        p(v-if="onde") Onde:
          |
          |
          span(v-if="local") {{onde}}
            a(:href="local" target="_blank" title="Exibir a localização")
              i.fa.fa-map-marker(aria-hidden="true")
          span(v-else ) {{onde}}
        p Quando:
          |
          |
          span {{inicio}}
          |
          |
          span(v-if="fim") a {{fim}}
        p(v-if="horario") Horário:
          |
          |
          span {{horario}}
        p(v-if="site") Site:
          |
          |
          a(:href="site" target="_blank") {{site}}
        p(v-if="telefone") Telefone:
          |
          |
          span {{telefone}}
        p(v-if="email") E-mail:
          |
          |
          span {{email}}
</template>

<script>
export default {
  props: [
    "onde",
    "horario",
    "site",
    "inicio",
    "fim",
    "telefone",
    "email",
    "local",
  ],
};
</script>

<style lang="scss" scoped>
.dados {
  border: 2px solid $cor-azul-1;
  padding: 10px 15px;
}

.dados a {
  color: $cor-cinza;
  text-decoration: underline;
}

.dados a:hover {
  color: $cor-azul-1;
}

p {
  color: $cor-azul-1;
  margin: 5px;
  word-break: break-all;
}

span {
  color: $cor-cinza;
}

.fa-map-marker {
  margin-left: 10px;
}
</style>
