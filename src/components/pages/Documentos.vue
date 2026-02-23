<template lang="pug">
  .container
    header
      breadcrumb(:itens="this.breadcrumb")
    titulo Documentos
    lista-categorias(v-if="!loading" :itens="documentos")
    .content-loading(v-else v-for="i in 4")
      .documentos.loading-effect
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import ListaCategorias from "@BASICS/ListaCategorias";

import { getCategorias } from "../../scripts/services/DocumentosService";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    ListaCategorias,
  },
  data() {
    return {
      breadcrumb: [{ nome: "Documentos" }],
      documentos: [],
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
  created() {
    this.getDocumentos();
  },
  methods: {
    async getDocumentos() {
      const documentosTratados = [];

      const categorias = await getCategorias();

      Object.entries(categorias).forEach(v => {
        const i = v[0];
        const documentoTratado = {
          name: categorias[i].name,
          id: categorias[i].id,
        };
        documentosTratados.push(documentoTratado);
      });

      this.documentos = documentosTratados;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 20px;
}
.label-select {
  padding: 6px 0;
}
</style>
