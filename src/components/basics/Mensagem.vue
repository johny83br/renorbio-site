<template lang="pug">
  .mensagem
    .icone
    .texto: slot
</template>

<script>
export default {
  name: "Mensagem",
};
</script>

<style lang="scss">
.mensagem {
  display: table;
  width: 100%;
  border: 1px solid #c2c2c2;
  border-radius: 7px;
  padding: 15px;
  margin: 0;

  > .icone {
    display: table-cell;
    vertical-align: middle;
    width: 2.3rem;
    font: normal normal normal 14px/1 "FontAwesome";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  > .texto {
    > p {
      margin-bottom: 5px;
    }
    > p:last-child {
      margin-bottom: 0;
    }
  }

  &.-info > .icone:before {
    content: "\f06a";
    font-size: 1.4rem;
  }
  &.-erro > .icone:before {
    content: "\f071";
    font-size: 1.4rem;
  }
  &.-warn > .icone:before {
    content: "\f071";
    font-size: 1.4rem;
  }
}
</style>
