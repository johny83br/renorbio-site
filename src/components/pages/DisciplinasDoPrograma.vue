<template lang="pug">
  .container
    header
      breadcrumb(:itens="this.breadcrumb")
    titulo Disciplinas do programa
    .row.select
      .col-xs-12.col-sm-3.col-md-3.col-lg-2
        .label-select Area de concentração:
      .col-xs-12.col-sm-5.col-md-4.col-lg-3
        select-input(name="area-concentracao" v-model="filter" :itens="areas" :tab="20")
    lista-accordion(:item="item" :itens="listaFiltrada")
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import ListaAccordion from "@BASICS/ListaAccordion";
import SelectInput from "@BASICS/SelectInput";

import { getAreas, getDisciplinas } from "../../scripts/services/Disciplinas";

import * as config from "../../scripts/config";

export default {
  components: {
    Breadcrumb,
    Titulo,
    ListaAccordion,
    SelectInput,
  },
  props: {
    tab: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      breadcrumb: [{ nome: "Disciplinas do programa" }],
      filter: "",
      areas: [
        {
          key: "all",
          name: "Mostrar todas",
        },
      ],
      optionsInput: {
        todos: "Mostrar todas",
        opcao2: "Bionegócios e Marcos Legais",
        opcao3: "Biotecnologia Industrial",
        opcao4: "Biotecnologia em Agropecuária",
        opcao5: "Biotecnologia em Recursos Naturais",
        opcao6: "Biotecnologia em Recursos Naturais",
        opcao7: "Biotecnologia em Saúde",
        opcao8: "N.I.",
        opcao9: "Núcleo Comum",
      },
      listaItens: [],
      listaFiltrada: [],
      item: "",
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
  watch: {
    filter(data) {
      if (data.name !== this.optionsInput.todos && data.name !== "") {
        this.listaFiltrada = window._.filter(
          this.listaItens,
          obj => obj.name === data.name,
        );
      } else {
        this.listaFiltrada = this.listaItens;
      }
    },
  },
  created() {
    this.getAreas();
    this.getDisciplinas("all");
    this.item = this.$route.params.item ? this.$route.params.item : 0;
  },
  methods: {
    async getAreas() {
      const areas = await getAreas();

      Object.entries(areas).forEach(v => {
        const i = v[0];
        const areaTratada = {
          key: areas[i].id,
          name: areas[i].name,
        };
        this.areas.push(areaTratada);
      });
    },
    async getDisciplinas(id) {
      const disciplinas = await getDisciplinas(id);

      Object.entries(disciplinas).forEach(v => {
        const i = v[0];
        const disciplinaTratada = {
          name: disciplinas[i].area.name,
          subitens: disciplinas[i].area.disciplines,
        };
        this.listaItens.push(disciplinaTratada);
      });

      Object.entries(this.listaItens).forEach(v => {
        const i = v[0];
        this.listaItens[i].subitens = this.listaItens[i].subitens.sort((a, b) =>
          a.localeCompare(b),
        );
      });
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
