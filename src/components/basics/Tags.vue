<template lang="pug">
  ul.tags(v-if="itens.length")
    li.item(v-for='item of itens')
      span {{ item.nome }}
</template>

<script>
export default {
  name: "Tags",
  props: ["itens"],
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
}

li.item {
  background-color: $cor-azul-2;
  margin: 0 5px;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
}

li.item a {
  color: $cor-cinza;
  text-decoration: none;
}

li.item a:hover {
  color: $cor-azul-1;
  text-decoration: underline;
}

ul::before {
  content: "\f02c";
  font-family: FontAwesome;
}

.tags {
  display: flex;
  align-items: center;
}

@include media("<tablet") {
  .tags {
    flex-wrap: wrap;
  }

  li.item {
    margin: 5px;
  }

  ul.tags {
    margin-top: 10px;
  }
}
</style>
