<template lang="pug">
  h2.titulo: slot
</template>

<style lang="scss" scoped>
.titulo {
  font-size: $titulos-font-size;
  font-weight: $titulos-font-weight;
  color: $cor-cinza;
  margin-bottom: 35px;
}

@include media("<=tablet") {
  .titulo {
    margin-bottom: 30px;
  }
}
</style>
