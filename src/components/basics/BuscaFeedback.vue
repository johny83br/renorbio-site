<template lang="pug">
  .busca-feedback
    p Exibindo resultados para:
      |
      strong  {{feedback}}
</template>

<script>
export default {
  props: ["feedback"],
};
</script>

<style lang="scss">
.busca-feedback {
  margin: 10px 0 20px 0;
  p {
    font-style: italic;
    margin: 0;
  }
}
</style>
