<template lang="pug">

    router-link(:to='{ name: destino , params: { id: id }}').subtitulo: slot

</template>

<script>
export default {
  props: ["destino", "id"],
  // props: {
  //   destino: { type: String, required: false }
  // }
};
</script>

<style lang="scss" scoped>
.subtitulo {
  font-weight: bold;
  margin-bottom: 10px;
  color: $cor-cinza;
  display: inline-block;
}

.subtitulo:hover {
  color: $cor-azul-1;
  cursor: pointer;
  text-decoration: none;
}
</style>
