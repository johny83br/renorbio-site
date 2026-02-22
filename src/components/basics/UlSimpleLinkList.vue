<template lang="pug">
  #ul-simple-link-list
    ul
      li(v-for="iten in itens")
        i.fa.icon-list
        a(:href="iten.link" target='_blank') {{iten.name}}
</template>

<script>
export default {
  props: {
    itens: {
      default: () => [
        { name: "Link name", link: "https://www.google.com.br/" },
        { name: "Link name", link: "link" },
        { name: "Link name", link: "link" },
        { name: "Link name", link: "link" },
        { name: "Link name", link: "link" },
        { name: "Link name", link: "link" },
        { name: "Link name", link: "link" },
        { name: "Link name", link: "link" },
      ],
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 30px 0;
  padding: 0;

  a {
    color: $cor-azul-1;
    font-weight: bolder;
    font-size: 15px;

    &:hover {
      text-decoration: none;
    }

    &:focus {
      text-decoration: none;
    }
  }
}

.icon-list {
  &::before {
    color: $cor-azul-1;
    font-size: 9px;
    content: "\f111";
    margin-right: 20px;
  }
}
li {
  margin-top: 15px;
  &:hover {
    > .icon-list::before {
      font-size: 15px;
      margin-right: 22.4px;
      content: "\f0da";
    }
  }
}
</style>
