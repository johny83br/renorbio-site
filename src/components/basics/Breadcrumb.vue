<template lang="pug">
  nav#breadcrumb(aria-label="breadcrumb" role="navigation")
    ol.breadcrumb
      li.breadcrumb-item: router-link(
        :to="{ name: 'Index' }"
        :tabindex="tab"
        alt="ir para a página inicial"
        title="Ir para a página inicial")
        i.fa.fa-home(aria-hidden="true")
      template(v-if="itens.length" v-for="item of itens")
        li.breadcrumb-item(v-if="item.rota"): router-link(
          :to="{ name: item.rota }"
          :tabindex="tab") {{ item.nome }}
        li.breadcrumb-item(v-else) {{ item.nome }}
</template>

<script>
export default {
  props: {
    tab: {
      type: Number,
      default: 17,
    },
    itens: {},
  },
};
</script>

<style lang="scss">
.breadcrumb {
  background: transparent;
}

.breadcrumb {
  padding: 0;
}

a.router-link-active,
li.breadcrumb-item a {
  color: $cor-cinza;
}

a.router-link-active:hover,
li.breadcrumb-item a:hover {
  color: $cor-azul-1;
}

#breadcrumb {
  margin: 30px 0;

  @include media("print") {
    display: none;
  }
}
</style>
