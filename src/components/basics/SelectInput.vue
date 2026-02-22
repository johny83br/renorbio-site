<template lang="pug">
  #select-input
    ul(v-click-outside="closeItens")
      li#input(ref="selectInput" @click="visible = !visible" @keyup.enter="visible = !visible" :tabindex="tab")
        input(:name="name" disabled :value="valor" :placeholder="optionDefault")
        span
          i.fa(:class="{'fa-angle-down': !visible, 'fa-angle-up': visible}")
      li#select-itens(v-show="visible")
        .iten(v-for="(iten, key, index) in itens" :key="index" @click="updateSelect(key)" @keyup.enter="updateSelect(iten.id)" :tabindex="tab") {{ iten.name }}
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    tab: {
      type: Number,
      default: 1,
    },
    itens: {
      default: () => ({
        opcao1: "valor 1",
        opcao2: "valor 2",
        opcao3: "valor 3",
        opcao4: "valor 4",
        opcao5: "valor 5",
        opcao6: "valor 6",
      }),
    },
    type: {},
    name: {
      type: String,
      default: "SelectItem",
    },
    optionDefault: {
      type: String,
      default: "Selecione um item",
    },
  },
  data() {
    return {
      visible: false,
      valor: "Selecione um item",
    };
  },
  mounted() {
    if (this.type === "docentes") this.$emit("input", { key: "all", name: "Mostrar todos" });
    else this.$emit("input", { key: 0, name: "Mostrar todas" });
  },
  methods: {
    closeItens() {
      this.visible = false;
    },
    updateSelect(iten) {
      this.visible = false;
      this.valor = this.itens[iten].name;
      this.$emit("input", this.itens[iten]);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  position: relative;
  min-width: 200px;
  display: flex;
  flex-flow: column;
  padding: 0;
  list-style: none;
  #input {
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: flex;
    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #288bb4;
      background-color: $cor-azul-2;
      width: calc(100% - 22px);
      padding: 5px 15px;
      border: 0;
      &::placeholder {
        color: #288bb4;
      }
    }
    > span {
      padding: 6.5px 15px;
      color: #288bb4;
      background-color: $cor-azul-2;
      padding-left: 0;
    }
  }
  #select-itens {
    margin-top: 31px;
    z-index: 99;
    position: absolute;
    width: 100%;
    cursor: pointer;
    background: $cor-azul-4;
    color: #288bb4;
    padding: 0 15px;
    .iten {
      padding: 5px 0px;
      border-bottom: 1px solid #8dcde1;
      &:hover {
        color: transparentize(#288bb4, 0.4);
      }
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
