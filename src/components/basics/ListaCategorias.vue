<template lang="pug">
  #listaCategorias
    ul
      li(v-for="item in itens") #[i.fa.fa-folder] #[router-link(:to='{name: "Documento" , params: { id: item.id, nome: item.name }}') {{ item.name }}]
</template>

<script>
export default {
  props: ["itens"],
  // props: {
  //   itens: {
  //     default: () => [
  //       {id: 1, name: 'Nome Categoria 1'},
  //       {id: 2, name: 'Nome Categoria 2'},
  //       {id: 3, name: 'Nome Categoria 3'},
  //       {id: 4, name: 'Nome Categoria 4'},
  //       {id: 5, name: 'Nome Categoria 5'},
  //       {id: 6, name: 'Nome Categoria 6'}
  //     ]
  //   }
  // }
};
</script>

<style lang="scss" scoped>
ul {
  font-size: 18px;
  font-weight: bolder;
  color: $cor-azul-1;
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    margin-top: 20px;

    i.fa.fa-folder {
      margin-right: 8px;
      font-size: 22px;
    }
  }

  a {
    color: $cor-azul-1;
  }
}
</style>
