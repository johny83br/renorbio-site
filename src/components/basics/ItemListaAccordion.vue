<template lang="pug">
    li.iten-lista
      a(@click.stop="emitToggleList" @click="toggleList").
        #[slot(name="principal")] #[i.fa(v-show="!manualIsOpened" :class="{'fa-angle-down': !dataIsOpened, 'fa-angle-up': dataIsOpened}")]
      ul(v-show="dataIsOpened || manualIsOpened") #[slot(name="sub")]
</template>

<script>
export default {
  name: "ItemListaDropdown",
  props: {
    uid: {
      type: Number,
    },
    index: {
      default: 0,
    },
    manualIsOpened: {
      default: false,
    },
    item: {},
  },
  data() {
    return {
      dataIsOpened: this.index === this.item,
    };
  },
  watch: {
    uid(newUid) {
      if (newUid !== window._uid) this.dataIsOpened = false;
    },
  },
  methods: {
    emitToggleList() {
      this.$emit("toggleList", window._uid);
    },
    toggleList() {
      this.dataIsOpened = !this.dataIsOpened;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  padding: 0;
  margin: 0;
  > a {
    color: $cor-azul-1;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }
  ul {
    padding: 0;
    a {
      &:hover {
        text-decoration: none;
      }
    }
  }
}
.iten-lista {
  margin-top: 20px;
}
</style>
