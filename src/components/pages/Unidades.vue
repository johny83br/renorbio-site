<template lang="pug">
  pagina
    header(slot="breadcrumb")
      breadcrumb(:itens="this.breadcrumb")
    titulo(slot="titulo") Unidades
      .caixa-selecao-box
        .label-select Estado:
        .caixa-selecao
          select-input(name="area-concentracao" v-model="filter" :itens="optionsInput" :tab="20")
    .unidades(slot="principal")
      .iten-unidade(v-for="unidade in listaFiltrada")
        h2.unidade-estado {{unidade.key.name}} - {{unidade.key.uf}}
        a(target="_blank" v-for="nomes in unidade.dados" :href="nomes.nucleator.link").unidade-titulo {{nomes.nucleator.name.substring(5)}} #[i.fa.fa-external-link]
          ul
            li(v-for="instituicoes in nomes.nucleator.institutions")
              a(target="_blank" :href="instituicoes.link") {{instituicoes.name}} #[i.fa.fa-external-link]
</template>

<script>
import Breadcrumb from "@MODULES/Breadcrumb";
import Titulo from "@BASICS/Titulo";
import SelectInput from "@BASICS/SelectInput";
import Pagina from "@BASICS/Pagina";

import * as config from "../../scripts/config";

import { getUnidades } from "../../scripts/services/Unidades";
import { getPontosFocais } from "../../scripts/services/Estados";

export default {
  components: {
    Breadcrumb,
    Titulo,
    SelectInput,
    Pagina,
  },
  props: {
    tab: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      breadcrumb: [{ nome: "Renorbio" }, { nome: "Unidades" }],
      filter: "",
      optionsInput: {},
      listaFiltrada: [],
      estados: [],
      listaItens:
        // Dados padrão, serão re-processados
        [
          {
            name: "RN - UFRN",
            subitens: [
              {
                name: "SEDE - Lorem ipsum dolor sit amet consectetur",
                link: "",
              },
              {
                name: "SEDE - Lorem ipsum dolor sit amet consectetur",
                link: "http://www.google.com",
              },
              {
                name: "SEDE - Lorem ipsum dolor sit amet consectetur",
                link: "http://www.google.com",
              },
            ],
          },
          {
            name: "PB - UNIFACEX",
            subitens: [
              {
                name: "SEDE - Lorem ipsum dolor sit amet consectetur",
                link: "http://www.google.com",
              },
              {
                name: "SEDE - Lorem ipsum dolor sit amet consectetur",
                link: "http://www.google.com",
              },
              {
                name: "SEDE - Lorem ipsum dolor sit amet consectetur",
                link: "http://www.google.com",
              },
            ],
          },
        ],
    };
  },
  head: {
    title() {
      return {
        inner: `${config.SITE_TITLE} - Unidades`,
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
  watch: {
    filter(data) {
      const nameUf = data.name;
      if (nameUf !== this.optionsInput[0].name && nameUf !== "") {
        this.listaFiltrada = window._.orderBy(
          window._.filter(
            this.listaItens,
            obj => obj.key.uf.indexOf(nameUf) !== -1,
          ),
          ["name"],
          ["asc"],
        );
      } else {
        this.listaFiltrada = window._.orderBy(
          this.listaItens,
          ["key.uf"],
          ["asc"],
        );
      }
    },
  },
  created() {
    this.getUnidades();
  },
  methods: {
    async getUnidades() {
      const pontosFocais = await getPontosFocais();
      const unidades = await getUnidades();

      Object.entries(pontosFocais).forEach(pontoFocal => {
        this.estados.push({
          name: pontoFocal[1].name,
          uf: pontoFocal[1].uf,
        });
      });

      const unidadesTratadas = [];
      let aux = 0;

      Object.entries(unidades).forEach(v => {
        const estados = v[0];
        let estadoAux = "";
        for (let i = 0; i < this.estados.length; i++) {
          if (this.estados[i].uf === estados) {
            estadoAux = this.estados[i];
          }
        }
        this.optionsInput[aux] = { name: estados };
        unidadesTratadas.push({
          key: estadoAux,
          dados: unidades[estados],
        });
        aux++;
      });

      this.optionsInput = window._.orderBy(
        this.optionsInput,
        ["name"],
        ["asc"],
      );
      this.optionsInput.unshift({ name: "Mostrar todos" });
      this.listaItens = unidadesTratadas;
      this.listaFiltrada = window._.orderBy(
        this.listaItens,
        ["key.uf"],
        ["asc"],
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.label-select {
  padding: 6px 0;
}
.unidades {
  margin-bottom: 30px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: flex-start;

  .iten-unidade {
    border-radius: 5px;
    padding: 15px;
    margin: 5px;
    border: 1px solid $cor-cinza-2;
    display: flex;
    flex-flow: column nowrap;
    width: 450px;

    .unidade-estado {
      font-size: 18px;
      color: $cor-azul-1;
      font-weight: bold;
    }

    .unidade-titulo {
      font-size: 16px;
      color: $cor-preto;
      font-weight: bold;
    }

    a {
      i.fa {
        color: $cor-azul-1;
      }
      &:hover {
        text-decoration: none;
        color: $cor-azul-1;
      }
    }

    & > * {
      margin-top: 10px;
      color: $cor-preto;
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-left: 20px;
    margin-top: 10px;
    font-weight: normal;

    a {
      color: $cor-preto;
      font-size: 14px;
    }
  }
}
.caixa-selecao-box {
  margin-top: 35px;
  font-weight: normal;
  font-size: 14px;
  display: flex;
  .label-select {
    margin-right: 10px;
    padding: 6px 0;
  }
  .caixa-selecao {
    @media screen and (max-width: 425px) {
      width: 100%;
    }
  }
}
</style>
