<template lang="pug">
  ul
    item-lista-accordion(@toggleList="toggleIsOpened" :uid="uid" v-for="(iten, index) in itens" :manualIsOpened="true" :index="index" :key="iten.link")
      span(slot="principal") {{iten.name}}
      li.iten-list(slot="sub" v-for="(subiten, indexSub) in iten.subitens" :key="indexSub")
        a(tabindex="0" @click="show(iten.name, subiten, subiten.name)", @keyup.enter="show(iten.name, subiten, subiten.name)") {{subiten.name}}
        modal-generico(v-if="modal === subiten.name" :titulo="'DADOS GERAIS'", :dados="dados")
      modal-generico(v-if="modal === docenteName" :titulo="'DADOS GERAIS'", :dados="dados")
</template>

<script>
import ModalGenerico from "@BASICS/ModalGenerico";
import ItemListaAccordion from "@BASICS/ItemListaAccordion";

import { getTeacher } from "../../scripts/services/Teachers";

import { EventBus } from "../../scripts/utils/EventBus";

export default {
  name: "Lista",
  components: { ItemListaAccordion, ModalGenerico },
  props: {
    itens: {},
  },
  data() {
    return {
      uid: 0,
      tamanhoItens: this.itens.length,
      modal: "",
      dados: "",
      docenteName: 0,
    };
  },
  beforeUpdate() {
    this.tamanhoItens = this.itens.length;
  },
  created() {
    EventBus.$on("closeModal", () => {
      this.closeModal();
    });
  },
  mounted() {
    if (this.$route.params.id) this.getDocente(this.$route.params.id);
  },
  methods: {
    toggleIsOpened(uid) {
      this.uid = uid;
    },
    replaceInvalidCharacter(element) {
      return element.replace(/[\uf0d8]/g, "-");
    },
    async getDocente(id) {
      try {
        const dictionary = [
          ["Nome", "", "string"],
          ["Instituição", "", "string"],
          ["E-mail", "", "email"],
          ["Área de concentração", "", "array"],
          ["Área de atuação", "", "string"],
          ["Serviços", "", "array"],
          ["Lattes", "", "link"],
          ["Laboratórios", "", "links", "Laboratorios"],
        ];
        const response = await getTeacher(id);
        Object.keys(response.data.registers).forEach(register => {
          Object.keys(response.data.registers[register].teachers).forEach(
            teacher => {
              dictionary[0][1] =
                response.data.registers[register].teachers[teacher].name;
              dictionary[1][1] = response.data.registers[register].nucleator;
              dictionary[2][1] =
                response.data.registers[register].teachers[teacher].email;
              dictionary[3][1] =
                response.data.registers[register].teachers[teacher].areas;
              dictionary[4][1] = this.replaceInvalidCharacter(
                response.data.registers[register].teachers[teacher]
                  .occupation_area,
              );
              dictionary[5][1] =
                response.data.registers[register].teachers[teacher].services;
              dictionary[6][1] =
                response.data.registers[register].teachers[teacher].lattes;
              dictionary[7][1] =
                response.data.registers[register].teachers[
                  teacher
                ].laboratories;
              this.docenteName =
                response.data.registers[register].teachers[teacher].name;
              this.modal =
                response.data.registers[register].teachers[teacher].name;
            },
          );
        });
        this.dados = dictionary;
      } catch (err) {
        // console.log(err);
      }
    },
    show(estadoNome, estado, docente) {
      this.modal = docente;

      const dictionary = [
        ["Nome", docente, "string"],
        ["Instituição", estadoNome, "string"],
        ["E-mail", estado.email, "email"],
        ["Área de concentração", estado.areas, "array"],
        [
          "Área de atuação",
          this.replaceInvalidCharacter(estado.occupation_area),
          "string",
        ],
        ["Serviços", estado.services, "array"],
        ["Lattes", estado.lattes, "link"],
        ["Laboratórios", estado.laboratories, "links", "Laboratorios"],
      ];
      this.dados = dictionary;
    },
    closeModal() {
      this.modal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  li {
    list-style: none;
  }
}
.iten-list {
  margin-top: 10px;
}

.iten-list a {
  color: $cor-cinza;
  font-weight: normal;
  font-size: 14px;
}

.iten-list a:hover {
  color: $cor-azul-1;
  text-decoration: underline;
}
</style>
