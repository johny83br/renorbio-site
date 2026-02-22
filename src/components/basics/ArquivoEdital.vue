<template lang="pug">
  .arquivo
    a: router-link(:to="{ name: 'Edital' }") Edital 2018.1
</template>

<style lang="scss">
.arquivo {
  margin-bottom: 20px;
}

.arquivo a {
  text-transform: uppercase;
  font-weight: $titulos-font-weight;
  color: $cor-azul-1;
}

.arquivo a:hover {
  text-decoration: underline;
}
</style>
